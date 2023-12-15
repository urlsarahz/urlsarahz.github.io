


// DRAWING

// function on() {
//     document.getElementById("overlay").style.display = "block";
//  }
// function off() { 
//     document.getElementById("overlay").style.display = "none";
// }


var canvas = document.getElementById("drawCloud");
  var ctx = canvas.getContext("2d");
  const settings = document.getElementById('settings');
  var size = 10;
  var opacity = 0.3;
  var blur = 3;
  var color = "rgb(255, 255, 255)";
  
  //var sidebar = document.getElementById("info noscroll");
  canvas.width = window.innerWidth-1065;
  canvas.height = window.innerHeight-250;
  // canvas.width = window.innerWidth - canvas.offsetLeft;
  // canvas.height = window.innerHeight - canvas.offsetTop;

  var offscreenCanvas = document.createElement('canvas');
  var oc = offscreenCanvas.getContext("2d");
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;

  var freezeCanvas = document.createElement('canvas');
  var fc = freezeCanvas.getContext("2d");
  freezeCanvas.width = canvas.width;
  freezeCanvas.height = canvas.height;

settings.addEventListener('click', e => {
    if (e.target.id === 'clear') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      oc.clearRect(0, 0, canvas.width, canvas.height);
      fc.clearRect(0, 0, canvas.width, canvas.height);
    }
});
 
settings.addEventListener("change", e =>{
    if(e.target.id === 'size') {
      size = e.target.value;
    }
    if(e.target.id === 'opacity') {
      opacity = (e.target.value)/100;
    }  
});


canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mousemove', sketch);

var mouse = {x:0,y:0}; 
let paint = false;
let startX;
let startY;

function startPainting(e) {
    paint = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    oc.clearRect(0, 0, canvas.width, canvas.height);
}

function stopPainting() {
    paint = false;
    oc.stroke();
    oc.beginPath();

    fc.clearRect(0, 0, canvas.width, canvas.height);
    fc.drawImage(canvas, 0, 0);
}

function sketch(e) {
    if (!paint) return;
    
    oc.lineWidth = size;
    oc.lineJoin = 'round';
    oc.lineCap = 'round';
    oc.strokeStyle = color;
    
    oc.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    oc.stroke();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(freezeCanvas, 0, 0);
    ctx.globalAlpha = opacity;
    ctx.filter = "blur(2px)";
    ctx.drawImage(offscreenCanvas, 0, 0);
  }

// save to disk
  function formCloud() {
    let canvas = document.getElementById('drawCloud');
    const blob = new Blob([canvas], {type:image/png});
    const tmp = URL.createObjectURL(blob);
    console.log(tmp);
    
    
    // var canvas = document.getElementById("drawCloud");
    // var newCloud = canvas.toDataURL("image/png");
    // document.write('<img src="'+newCloud+'"/>');



    // let newCloud;

    // const getCloud = () => new Promise((resolve, reject) => {
    //   const canvas = document.getElementById("drawCloud");
    //   canvas.toBlob(resolve, "image/png", 1);
    // });

    // const savee = async () => {
    //   newCloud = await getCloud();
    //   const blob = new Blob([newCloud], {
    //     type: newCloud.type, //png
    //   });
    //   const blobURL = URL.createObjectURL(blob);
    //   newCloud = blob;
    //   post(blob);
    // };

    // function post() { 
    //   $.ajax({
    //     url:"./clouds",
    //     success: function(ok) {
    //       newCloud = URL.createObjectURL(newCloud);
    //       let indexx;
    //       $.get("./clouds", function (clouds) { //push newCloud
    //         indexx = clouds.length - 1;
    //         sky.storage.push(clouds[clouds.length - 1]);
    //       });

    //     }
    //   })
    // }
    // savee();
  }