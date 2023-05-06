var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    things = [],
    thingsCount = 124,
    mouse = {
      x: -100,
      y: -100
    },
    minDist = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object image
var image = new Image();
image.src = './asset/leaf.png';
// image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Love_heart_uidaodjsdsew.gif/1200px-Love_heart_uidaodjsdsew.gif';
// image.src = 'https://static.wixstatic.com/media/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png/v1/fill/w_320,h_272,fp_0.50_0.50/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png';

for (var i = 0; i < thingsCount; i++) {
  let opacity = Math.random() + 0.4;
  let thingWidth = (Math.floor(Math.random() * 20) + 20) * (opacity + 0.4);
  let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
  let speed = Math.random() * 1 + 0.5;
  things.push({
    width: thingWidth,
    height: thingHeight,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - thingHeight,
    speed: speed,
    vY: speed,
    vX: 0,
    d: Math.random() * 1.2 - 0.6, // wind or something like that
    stepSize: (Math.random()) / 20,
    step: 0,
    angle: Math.random() * 180 - 90,
    rad: Math.random(),
    opacity: opacity,
    _ratate: Math.random() // ratate 正負
  });
}

function drawThings() {
  things.map((thing) => {
    ctx.beginPath();
    thing.rad = (thing.angle * Math.PI) / 180;
    ctx.save();
    var cx = thing.x + thing.width / 2;
    var cy = thing.y + thing.height / 2;
    ctx.globalAlpha = thing.opacity;
    ctx.setTransform(
      Math.cos(thing.rad),
      Math.sin(thing.rad),
      -Math.sin(thing.rad),
      Math.cos(thing.rad),
      cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
      cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
    );
    ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
    ctx.restore();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawThings();
}

function update() {
  things.map((thing) => {
    var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
    
    if (dist < minDist) {
      var force = minDist / (dist * dist),
          xcomp = (mouse.x - thing.x) / dist,
          ycomp = (mouse.y - thing.y) / dist,
          deltaV = force * 2; // deplay when hover mouse

      thing.vX -= deltaV * xcomp;
      thing.vY -= deltaV * ycomp;
      
      if (thing.d * xcomp > 0) {
        thing.d = 0 - thing.d;
      }
    } else {
      thing.vX *= .98;

      if (thing.vY < thing.speed) {
        thing.vY = thing.speed
      }

      thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
    }
    
    thing.y += thing.vY;
    thing.x += thing.vX + thing.d;
    
    var _angle = Math.random() + 0.2;
    // stuff.angle += _angle;
    if (thing._ratate == 0) {
      thing.angle += _angle;
    } else {
      thing.angle -= _angle;
    }
    
    if (thing.y > canvas.height) {
      reset(thing);
    }

    if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
      reset(thing);
    }
  });
}

function reset(thing) {
  thing.opacity = Math.random() + 0.4;
  thing.width = (Math.floor(Math.random() * 20) + 20) * (thing.opacity + 0.4);
  thing.height = image.naturalHeight / image.naturalWidth * thing.width;
  thing.x = Math.floor(Math.random() * canvas.width);
  thing.y = 0 - thing.height;
  thing.speed = Math.random() * 1 + 0.5
  thing.vY = thing.speed;
  thing.vX = 0;
  // thing.angle = 0;
  // thing.size = 0;
  thing._ratate = Math.random();
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();

var letter1 = document.getElementsByClassName("lt1")[0];
var letter2 = document.getElementsByClassName("lt2")[0];
var letter3 = document.getElementsByClassName("lt3")[0];
var letter4 = document.getElementsByClassName("lt4")[0];
var letter5 = document.getElementsByClassName("lt5")[0];

var lt1hidden = false;
var lt2hidden = false;
var lt3hidden = false;
var lt4hidden = false;
var lt5hidden = false;

function lt1Disappearing(){
  letter1.style.animation = 'rollOut 1s';
  async function delay(){
    await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve();
      },1000)
    })
  letter1.style.display = 'none';
  }
  delay();
}
function lt2Disappearing(){
  if(lt1hidden == true){
    letter2.style.animation = 'fadeOutDown 1s';
    async function delay(){
      await new Promise((resolve)=>{
        setTimeout(()=>{
          resolve();
        },1000)
      })
    letter2.style.display = 'none';
    }
    delay();
  }
}
function lt3Disappearing(){
  if(lt2hidden == true){
    letter3.style.animation = 'rotateOutUpLeft 1s';
    async function delay(){
      await new Promise((resolve)=>{
        setTimeout(()=>{
          resolve();
        },1000)
      })
    letter3.style.display = 'none';
    }
    delay();
  }
}
function lt4Disappearing(){
  if(lt3hidden == true){
    letter4.style.animation = 'fadeOut 1s';
    async function delay(){
      await new Promise((resolve)=>{
        setTimeout(()=>{
          resolve();
        },1000)
      })
    letter4.style.display = 'none';
    }
    delay();
  }
}
function lt5Disappearing(){
  if(lt4hidden == true){
    letter5.style.animation = 'rotateOutUpLeft 2s';
    async function delay(){
      await new Promise((resolve)=>{
        setTimeout(()=>{
          resolve();
        },2000)
      })
      letter5.style.display = 'none';

      await new Promise((resolve)=>{
        setTimeout(()=>{
          resolve();
        },1000)
      })

      canvas.style.animation = 'fadeOut 1s';
      await new Promise((resolve)=>{
        setTimeout(()=>{
          resolve();
        },1000)
      })
        window.location.replace("index2.html")

    }
    delay();
  }

}


letter1.onclick = function(){
  lt1hidden = true;
  lt1Disappearing();
}
letter2.onclick = function(){
  lt2hidden = true;
  lt2Disappearing();
}
letter3.onclick = function(){
  lt3hidden = true;
  lt3Disappearing();
}
letter4.onclick = function(){
  lt4hidden = true;
  lt4Disappearing();
}
letter5.onclick = function(){
  lt5hidden = true;
  lt5Disappearing();  
}



  var audio = document.getElementById("audio");
  audio.play();
