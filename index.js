


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
  canvas.style.width ='100%'
  canvas.style.height ='70%'
  canvas.width = canvas.offsetWidth;
  canvas.height =canvas.offsetHeight;

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
      function dataURLtoBlob(dataURL) {
        let array, binary, i, len;
        binary = atob(dataURL.split(',')[1]);
        array = [];
        i = 0;
        len = binary.length;
        while (i < len) {
          array.push(binary.charCodeAt(i));
          i++;
        }
        return new Blob([new Uint8Array(array)], {
          type: 'image/png'
        });
      };

    const canvas = document.getElementById('drawCloud');
    const file = dataURLtoBlob(canvas.toDataURL());
      
    const fd = new FormData;
    fd.append('image', file);

    $.ajax({
        type: 'POST',
        url: '/clouds',
        data: fd,
        processData: false,
        contentType: false
   });
  }

  