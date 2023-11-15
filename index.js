// function on() {
//     document.getElementById("overlay").style.display = "block";
//  }
// function off() { 
//     document.getElementById("overlay").style.display = "none";
// }


var canvas = document.getElementById("formCloud");
  var ctx = canvas.getContext("2d");
  const settings = document.getElementById('settings');
  var size = 10;
  var opacity = 0.4;
  var blur = 3

  canvas.width = window.innerWidth - canvas.offsetLeft;
  canvas.height = window.innerHeight - canvas.offsetTop;

  var offscreenCanvas = document.createElement('canvas');
  var oc = offscreenCanvas.getContext("2d");
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;

  var freezeCanvas = document.createElement('canvas');
  var fc = freezeCanvas.getContext("2d");
  freezeCanvas.width = canvas.width;
  freezeCanvas.height = canvas.height;

// function preventDefault(e) {
//     e.preventDefault();
// }
// function disableScroll() {
//     document.body.addEventListener('touchmove', preventDefault, { passive: false });
// }
// function enableScroll() {
//     document.body.removeEventListener('touchmove', preventDefault);
// }

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

// canvas.addEventListener('touchstart', startPainting);
// canvas.addEventListener('touchend', stopPainting);
// canvas.addEventListener('touchmove', sketch);

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

// document.addEventListener('touchmove', function(e) {
//     event.preventDefault();
//     var touch = event.touches[0];
// });

function sketch(e) {
    if (!paint) return;
    
    oc.lineWidth = size;
    oc.lineJoin = 'round';
    oc.lineCap = 'round';
    
    // ctx.strokeStyle = 'rgba(' + draw.drawColor + ', ' + (draw.drawOpacity / 100) + ')';
    // ctx.filter = 'blur(' + draw.drawBlur + 'px)';
    // ctx.shadowColor = 'rgb(' + draw.drawColor + ', 0.5), rgb(' + draw.drawColor + ', 0.4), rgb(' + draw.drawColor + ', 0.4)';
    // ctx.shadowColor = 'rgba(255,255,255,1)';
    // ctx.shadowBlur = draw.drawBlur;
    
    
    // ctx.moveTo(coord.x, coord.y);
    // getPosition(event);
    oc.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    oc.stroke();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.drawImage(freezeCanvas, 0, 0);
    ctx.globalAlpha = opacity;
    ctx.filter = "blur(2px)";
    ctx.drawImage(offscreenCanvas, 0, 0);
  }



// VERSION TWOO !!!!!!!!!!!!!1!!!!

// var canvas = document.getElementById("formCloud");
// var ctx = canvas.getContext("2d");

// var sketch = document.getElementById("sketch");
// canvas.width = 300;
// canvas.height = 150;

// var mouse = {x:0, y:0};

// canvas.addEventListener("mousemove", function(e) {
//     mouse.x = e.pageX - this.offsetLeft;
//     mouse.y = e.pageY - this.offsetTop;
// }, false);

// ctx.lineJoin = "round";
// ctx.lineCap = "round";

// settings.addEventListener('click', e => {
//     if (e.target.id === 'clear') {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     } 
// });

// settings.addEventListener('change', e => {
   
//     if(e.target.id === 'size') {
//         size = e.target.value;
//     }
//   if(e.target.id === 'opacity') {
//         opacity = (e.target.value)/100;
//     }  
// });

// ctx.strokeStyle = 'rgba(' + [255, 255, 255, opacity] + ')';

// canvas.addEventListener('mousedown', function(e) {
//     ctx.beginPath();
//     ctx.moveTo(mouse.x, mouse.y);
 
//     canvas.addEventListener('mousemove', onPaint, false);
// }, false);
 
// canvas.addEventListener('mouseup', function() {
//     canvas.removeEventListener('mousemove', onPaint, false);
// }, false);
 
// var onPaint = function() {
//     ctx.lineTo(mouse.x, mouse.y);
//     ctx.stroke();
//     ctx.lineWidth = size;
//     ctx.strokeStyle = 'rgba(' + [255, 255, 255, opacity] + ')'
// };








// VERSION ONEEEEEEE 1!!!!!!11!!!!!

// const canvas = document.getElementById('drawingBoard');
// const tollbar = document.getElementById('toolbar');
// const ctx = canvas.getContext("2d");

// const canvasOffsetX = canvas.offsetLeft;
// const canvasOffsetY = canvas.offsetTop;

// canvas.width = window.innerWidth - canvasOffsetX;
// canvas.height = window.innerHeight - canvasOffsetY;

// let isPainting = false;
// let size = 5;
// let startX; //"let" b/c value changes
// let startY;

// toolbar.addEventListener("click", e => {
//     if (e.target.id === "clear") {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
// });

// toolbar.addEventListener("change", e => {
//     if(e.target.id === "size") {
//         size = e.target.value;
//     }
//     if(e.target.id === "opacity") {
//         opacity = e.target.value;
//     }
// });

// const draw = (e) => {
//     if(!isPainting) {
//         return;
//     }
//     ctx.size = size;
//     ctx.lineCap = "round";
//     ctx.lineTo(e.clinetX - canvasOffsetX, e.clientY);
//     ctx.stroke();
// }

// canvas.addEventListener("mousedown", (e) => {
//     isPainting = true;
//     startX = e.clientX;
//     startY = e.clientY;
// });

// canvas.addEventListener("mouseup", e => {
//     isPainting = false;
//     ctx.stroke();
//     ctx.beginPath();
// });

// canvas.addEventListener("mousemove", draw);