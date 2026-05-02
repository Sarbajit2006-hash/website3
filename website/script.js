// PARTICLE BACKGROUND
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<100;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    vx:Math.random()*1,
    vy:Math.random()*1
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.vx;
    p.y+=p.vy;

    ctx.fillStyle="cyan";
    ctx.fillRect(p.x,p.y,2,2);
  });
  requestAnimationFrame(animate);
}
animate();
/

// CHART AUTO UPDATE
let chart = new Chart(document.getElementById("chart"), {
  type:'line',
  data:{
    labels:["1","2","3","4","5"],
    datasets:[{data:[10,20,30,25,40]}]
  }
});

setInterval(()=>{
  chart.data.datasets[0].data.push(Math.random()*50);
  chart.data.datasets[0].data.shift();
  chart.update();
},2000);


// ALERT SYSTEM
setInterval(()=>{
  let alert = document.createElement("div");
  alert.innerText = "⚠️ AI detected anomaly";
  document.getElementById("alertBox").appendChild(alert);

  setTimeout(()=>alert.remove(),3000);
},3000);


// JARVIS VOICE AI
function startAI(){
  let status = document.getElementById("aiStatus");
  status.innerText = "Listening...";

  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.start();

  recognition.onresult = function(e){
    let text = e.results[0][0].transcript;
    status.innerText = "You said: " + text;

    let reply = "System operational";

    if(text.includes("traffic")) reply="Traffic is high";
    if(text.includes("weather")) reply="Rain expected";

    let speech = new SpeechSynthesisUtterance(reply);
    speechSynthesis.speak(speech);
  };
}
// 3D CITY
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("bg")});

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe:true});

for(let i=0;i<50;i++){
  let cube = new THREE.Mesh(geometry, material);
  cube.position.x = Math.random()*20-10;
  cube.position.y = Math.random()*20-10;
  cube.position.z = Math.random()*20-10;
  scene.add(cube);
}

camera.position.z = 5;

function animate3D(){
  requestAnimationFrame(animate3D);
  scene.rotation.y += 0.002;
  renderer.render(scene,camera);
}
animate3D();
status.innerText = "Analyzing city data...";
setTimeout(()=>{
  status.innerText = "Running prediction models...";
},1000);

setTimeout(()=>{
  status.innerText = "AI Response Ready";
},2000);
setInterval(()=>{
  document.getElementById("traffic").innerText =
    Math.floor(Math.random()*100) + "% Congestion";

  document.getElementById("pollution").innerText =
    Math.floor(Math.random()*200) + " AQI";
},2000);
window.onload = () => {
    document.getElementById("loader").style.display = "none";
};