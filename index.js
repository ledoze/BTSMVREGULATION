

// WebSocket support
var targetUrl = `ws://${location.host}/ws`;
var websocket;
window.addEventListener("load", onLoad);


function onLoad() {
  initializeSocket();
  var dim=document.documentElement.clientWidth; 
  console.log(dim);
};
function initializeSocket() {
  console.log("Opening WebSocket connection MicroPython Server...");
  websocket = new WebSocket(targetUrl);
  websocket.onopen = onOpen;
  websocket.onclose = onClose;
  websocket.onmessage = onMessage;
};
function onOpen(event) {
  console.log("Starting connection to WebSocket server.."); 
  sendMessage("Starting connection from WebSocket client..");
  sendMessage("MODE?");
  sendMessage("PARAM?");
};
function onClose(event) {
  console.log("Closing connection to server..");  
  //alert("Connection lost");
  setTimeout(initializeSocket, 2000);
};
function onMessage(event) {  
  console.log("WebSocket message received:", event);
  console.log(event.data.indexOf("ARRET"));
 if(event.data.indexOf("TENSION")==0){
  t=event.data.slice(event.data.indexOf("TCPU")+5);
  console.log(t);    
  lastTime =  new Date().getTime(); 
  };  
};
function sendMessage(message) {
  websocket.send(message);
  /*print("lign318 send message = ",message);*/
  //console.log("lign265 send message = ",message);  
};

var input = document.querySelector("#slider-consigne");
var consigne = input.value;
var mesure = document.querySelector("#text-mesure");
//var freq = document.querySelector("#slider-freq");
//var amp = document.querySelector("#slider-amp");
var text = document.querySelector("#textData");
var ch1axexplus = document.querySelector("#button-ch1plus");
var ch1axexmoins = document.querySelector("#button-ch1moins");
var ch2axexplus = document.querySelector("#button-ch2plus");
var ch2axexmoins = document.querySelector("#button-ch2moins");
var axeyplus = document.querySelector("#button-yplus");
var axeymoins = document.querySelector("#button-ymoins");
var ch1fft= document.querySelector("#button-ch1fft");
var ch2fft= document.querySelector("#button-ch2fft");
var ch1axexplus = document.querySelector("#button-ch1plus");
var ch1axexmoins = document.querySelector("#button-ch1moins");
var ch2axexplus = document.querySelector("#button-ch2plus");
var ch2axexmoins = document.querySelector("#button-ch2moins");
var ch1posplus = document.querySelector("#button-ch1posplus");
var ch1posmoins = document.querySelector("#button-ch1posmoins");
var ch2posplus = document.querySelector("#button-ch2posplus");
var ch2posmoins = document.querySelector("#button-ch2posmoins");
var ch1gnd = document.querySelector("#button-ch1gnd");
var ch2gnd = document.querySelector("#button-ch2gnd");
var ch1dc = document.querySelector("#button-ch1dc");
var ch1ac = document.querySelector("#button-ch1ac");
var ch2dc = document.querySelector("#button-ch2dc");
var ch2ac = document.querySelector("#button-ch2ac");
var xplus = document.querySelector("#button-xplus");
var xmoins = document.querySelector("#button-xmoins");
var v1sin = document.querySelector("#button-v1sin");
var v1square = document.querySelector("#button-v1square");
var v1dc = document.querySelector("#button-v1dc");
var v2sin = document.querySelector("#button-v2sin");
var v2square = document.querySelector("#button-v2square");
var v2triangle = document.querySelector("#button-v2triangle");
var v2sawtooth = document.querySelector("#button-v2sawtooth");
var v2dc = document.querySelector("#button-v2dc");

var v1max = document.querySelector("#slider-ampch1");
var v2max = document.querySelector("#slider-ampch2");
var v2plus = document.querySelector("#button-v2plus");

var v2moins = document.querySelector("#button-v2moins");
var f1 = document.querySelector("#slider-freqch1");
var f2 = document.querySelector("#slider-freqch2");

var f2plus = document.querySelector("#button-f2plus");
var f2moins = document.querySelector("#button-f2moins");
var typeGene1 = document.getElementById("type-select1");
var typeGene2 = document.getElementById("type-select2");
var playButton1 = document.getElementById("play-button1");
var playButton2 = document.getElementById("play-button2");

var consigne=input.value;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
var amplitudech1=v1max.value;
var amplitudech2=v2max.value;
var frequence=f1.value;
var frequence2=f2.value;
var scalech1y= 1;
var scalech2y= 1;
var scalex= 1;
var posch1=0.0;
var posch2=0.0;

var setPoints=[];

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var osc = new OscillatorNode(audioCtx, {
  type: typeGene1.value,
  frequency: frequence,
});

var osc2 = new OscillatorNode(audioCtx, {
  type: typeGene2.value,
  frequency: frequence2,
});
// Rather than creating a new oscillator for every start and stop
// which you would do in an audio application, we are just going
// to mute/un-mute for demo purposes - this means we need a gain node
var gain = new GainNode(audioCtx);
var gain2 = new GainNode(audioCtx);
var analyser = new AnalyserNode(audioCtx, {
  fftSize: 1024,
  smoothingTimeConstant: 0.8,
});
var analyser2 = new AnalyserNode(audioCtx, {
  fftSize: 1024,
  smoothingTimeConstant: 0.8,
});
osc.connect(gain).connect(analyser).connect(audioCtx.destination);
osc2.connect(gain2).connect(analyser2).connect(audioCtx.destination);
var bufferLength = analyser.frequencyBinCount;
var bufferLength2 = analyser2.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
var dataArray2 = new Uint8Array(bufferLength2);
analyser.getByteTimeDomainData(dataArray);
analyser2.getByteTimeDomainData(dataArray2);

//LISTENERS

/*amp.addEventListener("click", () => {  
  amplitudech1=amp.value;
  gain.gain.value=amplitudech1/100;
  console.log("69 amplitudech1",amplitudech1)
});
*/




typeGene1.addEventListener("change", () => {
  console.log("152 osc type",osc.type);
  osc.type = typeGene1.value;
  console.log("154 osc type",osc.type);
});

typeGene2.addEventListener("change", () => { 
  console.log("152 osc2 type",osc2.type);
  osc2.type = typeGene2.value;
  console.log("154 osc2 type",osc2.type);
});

f1.addEventListener("click", () => {  
  frequence=f1.value;;
  osc.frequency.value=frequence;
  console.log("78 frequence",frequence)
});

f2.addEventListener("click", () => {  
  frequence2=f2.value;;
  osc2.frequency.value=frequence2;
  console.log("78 frequence2",frequence2)
});



ch1axexplus.addEventListener("click", () => {  
  scalech1y=scalech1y*2;  
});

ch1axexmoins.addEventListener("click", () => { 
  scalech1y=scalech1y/2;
});

ch2axexplus.addEventListener("click", () => {  
  scalech2y=scalech2y*2;
});

ch2axexmoins.addEventListener("click", () => { 
  scalech2y=scalech2y/2;
});
f1.valueAsNumber
ch1posplus.addEventListener("click", () => {
  posch1-=10;
});

ch1posmoins.addEventListener("click", () => {
  posch1+=10;
});



ch2posplus.addEventListener("click", () => {
  posch2-=10;
});

ch2posmoins.addEventListener("click", () => {
  posch2+=10;
});

ch1gnd.addEventListener("click", () => { 
  flagch1gnd = !flagch1gnd;
});

ch2gnd.addEventListener("click", () => { 
  flagch2gnd = !flagch2gnd;
});

ch1dc.addEventListener("click", () => { 
  flagch1dc = !flagch1dc;
  
  if (flagch1dc!=true){
    ch1dc.style.color="yellow";
    ch1ac.style.color="goldenrod";
    
  ch1moy=eval(outputregul.join('+'))/(outputregul.length);
  }
  else{
  
  ch1dc.style.color="goldenrod";
  ch1ac.style.color="yellow";
  ch1moy=0;
  };
  
});

ch2dc.addEventListener("click", () => {

  flagch2dc = !flagch2dc;
  if (flagch2dc!=true){
    ch2dc.style.color="lightblue";
    ch2ac.style.color="blue";
    
  ch2moy=eval(mesuressimul.join('+'))/(mesuressimul.length);
  }
  else{
  
  ch2dc.style.color="blue";
  ch2ac.style.color="lightblue";
  ch2moy=0;
  };
});

ch1ac.addEventListener("click", () => { 
  flagch1dc = !flagch1dc;
  if (flagch1dc!=true){
    ch1ac.style.color="yellow";
    ch1dc.style.color="goldenrod";
  }
  else{
  
    ch1dc.style.color="yellow";
    ch1ac.style.color="goldenrod";
    ch1moy=0;
  };
});

ch2ac.addEventListener("click", () => { 
  flagch2dc = !flagch2dc;
  if (flagch2dc!=true){
    ch2ac.style.color="lightblue";
    ch2dc.style.color="blue";
    
/*  ch2moy=eval(mesuressimul.join('+'))/(mesuressimul.length); */
  }
  else{
  
    ch2dc.style.color="lightblue";
    ch2ac.style.color="blue";
    ch2moy=0;
  };
})

xplus.addEventListener("click", () => {
  scalex*=2;
  console.log("219 scalex",scalex);
});

xmoins.addEventListener("click", () => {
  scalex*=1/2;
  console.log("224 scalex",scalex);
});

//surveillance GENE
playButton1.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (playButton1.dataset.playing === "init") {
    osc.start(audioCtx.currentTime);
    playButton1.dataset.playing = "true";
    playButton1.innerText = "OFF";
  } else if (playButton1.dataset.playing === "false") {
    gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.2);
    playButton1.dataset.playing = "true";
    playButton1.innerText = "OFF";
  } else if (playButton1.dataset.playing === "true") {
    gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    playButton1.dataset.playing = "false";
    playButton1.innerText = "ON";
  }
});

playButton2.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (playButton2.dataset.playing === "init") {
    osc2.start(audioCtx.currentTime);
    playButton2.dataset.playing = "true";
    playButton2.innerText = "OFF";
  } else if (playButton2.dataset.playing === "false") {
    gain2.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.2);
    playButton2.dataset.playing = "true";
    playButton2.innerText = "OFF";
  } else if (playButton2.dataset.playing === "true") {
    gain2.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    playButton2.dataset.playing = "false";
    playButton2.innerText = "ON";
  }
});


v1max.addEventListener("click", () => {
  amplitudech1=v1max.value;
  gain.gain.value=amplitudech1/100;
  console.log("283 amplitudech1",amplitudech1)
});

v2max.addEventListener("click", () => {
  amplitudech2=v2max.value;
  gain2.gain.value=amplitudech2/100;
  console.log("289 amplitudech2",amplitudech2)
});

// to play 1 second we need array of 44100 numbers
const sampleRate = 44100;


// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// var analyseur = audioCtx.createAnalyser();
// var analyseur2 = audioCtx.createAnalyser();
// var oscillator = audioCtx.createOscillator();
// var oscillator2 = audioCtx.createOscillator();
// var gain =audioCtx.createGain();
// var gain2 =audioCtx.createGain();



analyser.getByteTimeDomainData(dataArray);
analyser2.getByteTimeDomainData(dataArray2);

console.log("374 analyser",analyser);
console.log("375 analyser2",analyser2);


function compute(time) {
    consigne=input.value;
    
    if(setPoints.length >WIDTH-1){
        const sp= setPoints.shift();
    };
    setPoints.push(consigne);
    analyser.getByteTimeDomainData(dataArray);
    for (let i = 0; i < tableauDonnees.length; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        tableauDonnees[i] = amplitudech1=v1max.value*Math.sin(i * Math.PI * 8 / f1.value);
        monArray[i] = amplitudech1*Math.sin(i * Math.PI * 8 /f1.value);
    }
};







function clock(time) {
  consigne=input.value;
  //compute();
  //console.log("447 dataarray",dataArray);
    analyser.getByteTimeDomainData(dataArray);
    analyser2.getByteTimeDomainData(dataArray2);

  ctx.fillStyle = "rgb(200 200 200)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(218 165 32)";
/*
  const sliceWidth = (WIDTH * 1.0) / tailleMemoireTampon;
  let x = 0;

  ctx.beginPath();
  for (let i = 0; i < tailleMemoireTampon; i++) {
    const v = tableauDonnees[i] / 128.0;
    const y = (v * HEIGHT) / 2;

    if (i === 0) {
      ctx.moveTo(x, HEIGHT/2-y);
    } else {
      ctx.lineTo(x, HEIGHT/2-y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(WIDTH, HEIGHT / 2);
  ctx.stroke();
*/
const sliceWidth = (WIDTH * scalex) / bufferLength;
let x = 0;
let x2 = 0;

ctx.beginPath();  
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * HEIGHT)*v1max.value / 2;   

    if (i === 0) {
      ctx.moveTo(x, posch1+(HEIGHT/2-y)*scalech1y);
    } else {
      ctx.lineTo(x,posch1+ (HEIGHT/2-y)*scalech1y);
    }

    x += sliceWidth;
  }

ctx.lineTo(WIDTH, HEIGHT / 2);
ctx.stroke();


ctx.beginPath();
ctx.strokeStyle = "rgb(125 125 32)";
  for (let i = 0; i < bufferLength2; i++) {    
    const v = dataArray2[i] / 128.0;
    const y = (v * HEIGHT)*v2max.value / 2;   

    if (i === 0) {
      ctx.moveTo(x2, posch2+(HEIGHT/2-y)*scalech2y);
    } else {
      ctx.lineTo(x2,posch2+ (HEIGHT/2-y)*scalech2y);
    }

    x2 += sliceWidth;
  }

ctx.lineTo(WIDTH, HEIGHT / 2);
ctx.stroke();


// Dessin Courbe Consigne 

 /*if(setPoints.length >WIDTH-1){
        const sp= setPoints.shift();
    };
 */   
  ctx.beginPath();   
  ctx.moveTo(0, HEIGHT/2);
  for(var i=1 ; i < bufferLength; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle ="rgb(255, 0,0)";
    /*
    ctx.lineTo(0+2*i*scalex,HEIGHT/2 -consigne*scalech1y);
    ctx.moveTo(0+2*i*scalex,HEIGHT/2 -consigne*scalech1y);
    */
    ctx.lineTo(0+scalex*i,posch1+HEIGHT/2 -scalech1y*(setPoints[i]));
    ctx.moveTo(0+scalex*i,posch1+HEIGHT/2 -scalech1y*(setPoints[i]));
   
    ctx.stroke();
  };
  ctx.stroke();  


      window.requestAnimationFrame(clock);

};

window.requestAnimationFrame(clock);

