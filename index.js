

/*
if(x == y){
    alert('x et y contiennent la même valeur');
*/
// WebSocket support
var targetUrl = `ws://${location.host}/ws`;
var websocket;
window.addEventListener("load", onLoad);
var interval;
var t;
var setPoints=[];
var mesures=[];
var dt=[];
var mesuressimul=[];
var dtsimul=[];
var outputregul=[];
var lastTime ;
const canvasdim = document.getElementById("canvas");
var nmax = canvasdim.width;

var contexteAudio = new (window.AudioContext || window.webkitAudioContext)();
var analyseur = contexteAudio.createAnalyser();
analyseur.fftSize = 256;


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
  alert("Connection lost");
  setTimeout(initializeSocket, 2000);
};
function onMessage(event) {  
  console.log("WebSocket message received:", event);
  console.log(event.data.indexOf("ARRET"));
  if(event.data.indexOf("TENSION")==0){
  t=event.data.slice(event.data.indexOf("TCPU")+5);
  console.log(t);  
    if (lastTime != null) {
    const delta =  new Date().getTime() - lastTime;
    //duree_x += delta;
    //dt.push(duree_x);
    if(flagpause==true){
    dt.push(delta);
    mesures.push(parseFloat(t));
    process_variable=parseFloat(t);
    mesure.value=t;
    setPoints.push(consigne);
    };
  };
    if(dt.length > nmax-1){
  const tmp=dt.shift();
  const mes=mesures.shift();
  //VERIFIER QUE MESURES ET DT SONT VIDEs !!!!et a faire a la fin du on message
  }; 
  lastTime =  new Date().getTime(); 
  };  
};

function sendMessage(message) {
  websocket.send(message);
  /*print("lign318 send message = ",message);*/
  //console.log("lign265 send message = ",message);  
};
var ch1moy =0.0;
var ch2moy =0.0;
var posch2=0.0;
var posch1=0.0;
var posx = 0.0;
var posy = 0.0;
var mouvement = 0.0;
var process_variable=0.0;
var duree=0.0;
var duree_x=0.0;
var stage =0;
var Erreur_precedente = 0.0;
var integral=0.0;
var flagmarche = false;
var flagbo = true;
var flagsimul = true;
var flagpause = true;
var flagdebut = true;
var flagsat = true;
var flagperturbplus = true;
var flagperturbmoins = true;
var flagch1gnd  = true;
var flagch2gnd  = true;
var flagch1dc = true;
var flagch2dc = true;
var messages = "mes warnings ";
var now = new Date();
var bf = document.querySelector("#button-bf");
var bo = document.querySelector("#button-bo");
var value = document.querySelector("#text-consigne");
var input = document.querySelector("#slider-consigne");
var consigne = input.value;
var mesure = document.querySelector("#text-mesure");
var tau1 = document.querySelector("#slider-tau");
var gs1 = document.querySelector("#slider-gs");
var text = document.querySelector("#textData");
var pause = document.querySelector("#button-pause");
var debut = document.querySelector("#button-debut");
var save = document.querySelector("#button-save");
var valid = document.querySelector("#button-valider");
var simulation = document.querySelector("#button-simul");
var acquisition = document.querySelector("#button-acquisition");
var identite = document.querySelector("#text-identite");
var kp = document.querySelector("#slider-Kp");
var ki = document.querySelector("#slider-Ki");
var kd = document.querySelector("#slider-Kd");
var ch1axexplus = document.querySelector("#button-ch1plus");
var ch1axexmoins = document.querySelector("#button-ch1moins");
var ch2axexplus = document.querySelector("#button-ch2plus");
var ch2axexmoins = document.querySelector("#button-ch2moins");
var axeyplus = document.querySelector("#button-yplus");
var axeymoins = document.querySelector("#button-ymoins");
var myCanvas = document.getElementById("canvas");
var ctx2 = myCanvas.getContext("2d");
var perturbplus = document.querySelector("#button-perturbplus");
var perturbmoins = document.querySelector("#button-perturbmoins");
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
var ch1fft= document.querySelector("#button-ch1fft");
var ch2fft= document.querySelector("#button-ch2fft");

var sortie=0.0;
var scalech1y= 1;
var scalech2y= 1;
var scalex= 1;


/* ######################surveillance Consigne###############*/

input.addEventListener("input", (event) => {
    if(stage >=1){
      value.value = input.value;
      console.log("138 value inputvalue",value.textContent,input.value);
      if(stage==1){
      stage=2;      
      };
    }
    else{
      text2="  Stage 0 : ";
      const instant = new Date().getTime();
      text1=instant.toString();      
      text2=text2.concat(text1);
      messages=messages.concat(text2);
      textData.value=messages;      
      alert(" Valider Identité!");
      input.value=0;
      
    }; 
});
value.addEventListener("input", (event) => {
 input.value=value.value;
});
value.value = input.value;

/* ######################FINsurveillance Consigne###############*/

/* ######################surveillance click###############*/

bf.addEventListener("click", () => {
  if(stage<2){
    const instant = new Date().getTime();
    text1=instant.toString();
    text2="Respecter Procédure Appentissage";
    text2=text2.concat(text1);
    messages=messages.concat(text2);
    textData.value=messages;      
    window.alert("Respecter Procédure Appentissage");
  }
  else{
    flagbo=false;   
    drawSchema();
    //compute();
  };   
});

pause.addEventListener("click", () => {
  flagpause=!flagpause;
  if (flagpause!=true){
  pause.style.color="green";
  pause.style.background = "linear-gradient(to right, #DCE35B 0%, #45B649  51%, #DCE35B  100%)";
  }
  else{
  pause.style.color="red";
  };   
});

debut.addEventListener("click", () => {  
  flagdebut=!flagdebut; 
  flagpause=!flagpause;
    if (flagdebut!=true){
  debut.style.color="green";
  debut.style.background = "linear-gradient(to right, #DCE35B 0%, #45B649  51%, #DCE35B  100%)";
  }
  else{
  debut.style.color="red";
  };   
});

bo.addEventListener("click", () => {  
  flagbo=true
  drawSchema(); 
});

valid.addEventListener("click", () => {
    if (stage==0){
      stage=1;
      const instant = new Date().getTime();
      text1=instant.toString();
      text2=identite.value;
      text2=text2.concat(" : ",text1);
      messages=messages.concat(text2);
      textData.value=messages;  
      alert("Bravo! Modifier la consigne a 50"); 
    };
});

save.addEventListener("click", () => {  
  text2=mouvement.toString();
  messages=messages.concat(text2);
  textData.value=messages;
  window.alert("save");
  downloadTextFile();
  saveImage();
});

simulation.addEventListener("click", () => {  
  flagsimul=!flagsimul;
  if (flagsimul==true){
      simulation.style.color="blue";
      /*simulation.style.background = "linear-gradient(to right, #0000FF 0%, #45B649  51%, #0000FF  100%)";*/
  }
  else{
      simulation.style.color="lightblue";
  };  
});

acquisition.addEventListener("click", () => {  
  flagmarche=!flagmarche;
      //window.alert("yo");
  if (flagmarche==true){
      acquisition.style.color="blue";
      acquisition.style.background = "linear-gradient(to right, #DCE35B 0%, #45B649  51%, #DCE35B  100%)";
  }
  else{
      acquisition.style.color="lightblue";
  };  
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

axeyplus.addEventListener("click", () => {
  scalex=scalex/2;
});

axeymoins.addEventListener("click", () => { 
  scalex=scalex*2;  
});

myCanvas.addEventListener("mousemove", (e) => {  
     //console.log(e.clientX , e.clientY ); 
     //mouvement=mouvement+Math.sqrt((posx-e.clientX)**2+(posy-e.clientY)**2);
    /* posx=e.clientX;
     posy = e.clientY;
     console.log("mouvement mycanvas",posx,posy);
     */
     if(isdrawing === true){
            drawLine(x, y,e.clientX, e.clientY);
            x = e.clientX;
            y = e.clientY;
         }
});


myCanvas.addEventListener("mousedown", (e) => {
         x = e.clientX;
         y = e.clientY;
         isdrawing = true;
});
      

myCanvas.addEventListener("mouseup" ,(e) => {
         if( isdrawing === true){
            drawLine(x, y, e.clientX, e.clientY);
            x = 0;
            y = 0;
            isdrawing = false;
         }
});



perturbplus.addEventListener("click", () => {
  if(stage<2){
    const instant = new Date().getTime();
    text1=instant.toString();
    text2="Respecter Procédure Appentissage";
    text2=text2.concat(text1);
    messages=messages.concat(text2);
    textData.value=messages;      
    window.alert("Respecter Procédure Appentissage");
  }
  else{
  flagperturbplus=!flagperturbplus;
  flagperturbmoins=true;
  /*console.log("flagperturb",flagperturbplus);
  alert("273 perturb");*/
  drawSchema();
  };
});

perturbmoins.addEventListener("click", () => {
  if(stage<2){
    const instant = new Date().getTime();
    text1=instant.toString();
    text2="Respecter Procédure Appentissage";
    text2=text2.concat(text1);
    messages=messages.concat(text2);
    textData.value=messages;      
    window.alert("Respecter Procédure Appentissage");
  }
  else{
  flagperturbmoins=!flagperturbmoins;
  flagperturbplus=true;
  drawSchema();
  };
});

/*
myCanvas.addEventListener('click', function(event) {
    console.log("clik mycanvas",event.clientX,event.clientY);
    ctx2.beginPath();
    ctx2.strokeStyle = "rgb(2,7,159)";
    ctx2.lineWidth=3;
    ctx2.moveTo(event.clientX,0);
    ctx2.lineTo(event.clientX,event.clientY);
    ctx2.stroke();
    alert("click",event.clientX,event.clientY);
   // Handle click event
}, false);

*/

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
ch1fft.addEventListener("click", () => { 
      if (!audioCtx) {
        init();
      }

      // Create an empty two second stereo buffer at the
      // sample rate of the AudioContext
      const frameCount = audioCtx.sampleRate * 2.0;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      console.log("486 buffer",bufferLength);
      const dataArray = new Uint8Array(bufferLength);

      const buffer = new AudioBuffer({
        numberOfChannels: channels,
        length: frameCount,
        sampleRate: audioCtx.sampleRate,
      });

      // Fill the buffer with white noise;
      // just random values between -1.0 and 1.0
      for (let channel = 0; channel < channels; channel++) {
        // This gives us the actual array that contains the data
        const nowBuffering = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
          // Math.random() is in [0; 1.0]
          // audio needs to be in [-1.0; 1.0]
          nowBuffering[i] = Math.random() * 2 - 1;
          //nowBuffering[i] = outputregul[i];
        }
      }

      // Get an AudioBufferSourceNode.
      // This is the AudioNode to use when we want to play an AudioBuffer
      const source = audioCtx.createBufferSource();
      // Set the buffer in the AudioBufferSourceNode
      source.buffer = buffer;
      // Connect the AudioBufferSourceNode to the
      // destination so we can hear the sound
      source.connect(audioCtx.destination);
      // start the source playing
      source.start();

      source.onended = () => {
        console.log("White noise finished.");
      };
  console.log("516 fftch1");
  alert("517 fft");
});


let audioCtx;
// Stereo
let channels = 2;
function init() {
   audioCtx = new AudioContext();
};


/* ######################FIN surveillance click###############*/

const depart = new Date().toLocaleString("en-GB", { timeZone: "UTC" })/*.getTime();*/
var x = 0;
var y = 0;
var isdrawing = false;
function drawLine(x1, y1, x2, y2){
alert("372 drawline");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
};


/* ######################Ouverture fichier###############*/
/*
var openFile = function(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function() {
    var text = reader.result;
    var node = document.getElementById('output');
    node.innerText = text;
    console.log(reader.result.substring(0, 200));
  };
  reader.readAsText(input.files[0]);
};
*/
/* ######################FIN Ouverture fichier###############*/


/* ######################surveillance mouse###############*/

window.addEventListener("mousemove", (e) => {  
     //console.log(e.clientX , e.clientY ); 
     mouvement=mouvement+Math.sqrt((posx-e.clientX)**2+(posy-e.clientY)**2);
     posx=e.clientX;
     posy = e.clientY;
     //console.log("mouvement",mouvement);
});

/* ######################FIN surveillance mouse###############*/


/* ######################surveillance stage###############*/


/* ######################FIN surveillance stage###############*/




/* ######################Debut save fichier###############*/
function downloadTextFile() {
            var text = document.getElementById("textData").value;
            text=text.concat(" Souris : ",mouvement.toString());
            text=(identite.value).concat(" : ",text);
            var blob = new Blob([text], { type: 'text/plain' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            nom=(identite.value).concat(".txt");
            //link.download = 'maSauvegarde.txt';
            link.download = nom;            
            link.click();
        };
function saveImage(){        
// Convert our canvas to a data URL
    let canvasUrl = canvas.toDataURL();
    // Create an anchor, and set the href value to our data URL
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;

    // This is the name of our downloaded file
    createEl.download = "save_image";

    // Click the download button, causing a download, and then remove it
    createEl.click();
    createEl.remove();
};

        

/* ######################FIN save fichiers ###############*/

/* ######################Dessin schema###############*/
function drawSchema(){
  const canvasboucle = document.getElementById("canvas-boucle");
  const ctxboucle = canvasboucle.getContext("2d");
  let w = canvasboucle.width;
  let h = canvasboucle.height;
  ctxboucle.beginPath();
  ctxboucle.fillStyle = '#fff';
  ctxboucle.fillRect(0, 0, canvasboucle.width, canvasboucle.height);
  //ctxboucle.save();
  ctxboucle.beginPath();
  ctxboucle.strokeStyle ="rgb(255, 0,0)";
  ctxboucle.strokeRect(w/8, 2*h/5, w/7, h/4);
  ctxboucle.arc(w/14,2*h/5+h/8, h/8, 0,2* Math.PI , true); // Cercle extérieur  
  ctxboucle.moveTo(0,2*h/5+h/8);
  ctxboucle.lineTo(w/14-h/8,2*h/5+h/8);
  ctxboucle.stroke();
  ctxboucle.moveTo(w/14+h/8,2*h/5+h/8);
  ctxboucle.lineTo(w/8,2*h/5+h/8);
  ctxboucle.stroke();
  ctxboucle.moveTo(w/14,2*h/5+h/4);
  ctxboucle.lineTo(w/14,2*h/5+h/2);
  ctxboucle.lineTo(w/8+w/7-w/20,2*h/5+h/2);
  ctxboucle.stroke();
  ctxboucle.font = "15px Arial";
  ctxboucle.fillStyle = "#FF0000";
  ctxboucle.fillText("W", w/60, 2*h/5+h/16);
  
  ctxboucle.beginPath();
  ctxboucle.strokeStyle ="rgb(0, 0,255)";
  ctxboucle.strokeRect(w/8+w/7+w/15, 2*h/5, w/7, h/4);
  ctxboucle.strokeRect(w/8+2*w/7+2*w/15, 2*h/5, w/7, h/4);
  ctxboucle.strokeRect(w/8+3*w/7+3*w/15, 2*h/5, w/7, h/4);
  ctxboucle.moveTo(w/8+w/7+w/15,2*h/5+h/8);
  ctxboucle.lineTo(w/8+w/7,2*h/5+h/8);
  ctxboucle.stroke(); 
  ctxboucle.moveTo(w/8+3*w/7+2*w/15,2*h/5+h/8);
  ctxboucle.lineTo(w/8+3*w/7+3*w/15,2*h/5+h/8);
  ctxboucle.stroke();  
  ctxboucle.moveTo(w/8+2*w/7+2*w/15,2*h/5+h/8);
  ctxboucle.lineTo(w/8+2*w/7+w/14,2*h/5+h/8);
  ctxboucle.stroke();
  ctxboucle.moveTo(w/8+4*w/7+3*w/15,2*h/5+h/8);
  ctxboucle.lineTo(w,2*h/5+h/8);
  ctxboucle.stroke();
  ctxboucle.moveTo(w-w/20,2*h/5+h/8);
  ctxboucle.lineTo(w-w/20,2*h/5+h/2);
  ctxboucle.lineTo(w/8+w/7,2*h/5+h/2);
  ctxboucle.stroke(); 
  ctxboucle.fillStyle = "#000099";
  ctxboucle.font = "15px Arial";
  ctxboucle.fillText("Actionneur", w/8+w/7+w/15+h/16, 2*h/5+3*h/16);
  ctxboucle.fillText("System",w/8+2*w/7+2*w/15+h/16, 2*h/5+3*h/16);
  ctxboucle.fillText("Capteur", w/8+3*w/7+3*w/15+h/16, 2*h/5+3*h/16);
  ctxboucle.fillStyle = "#DAA520";
  ctxboucle.fillText("CH1", w/8+w/7+w/48, 2*h/5-h/16);
  ctxboucle.fillText("YR", w/8+w/7+w/48, 2*h/5+h/16);
  ctxboucle.fillStyle = "#0000FF";  
  ctxboucle.fillText("CH2", w-w/18, 2*h/5-h/16);
  ctxboucle.fillText("M", w-w/20, 2*h/5+h/16);
  
  ctxboucle.beginPath();
  ctxboucle.strokeStyle ="rgb(0, 255,0)";
  ctxboucle.arc(w/2, h/5, h/8, 0,2* Math.PI , true);
  ctxboucle.stroke();  
  ctxboucle.moveTo(w/2,h/5+h/8);
  ctxboucle.lineTo(w/2,h/6+2*h/8);
  ctxboucle.stroke(); 
  ctxboucle.moveTo(w/2,h/5-h/8);
  ctxboucle.lineTo(w/2,0);
  ctxboucle.stroke(); 
  if(flagbo==true){
    ctxboucle.beginPath();
    ctxboucle.strokeStyle ="rgb(255, 0,0)";
    ctxboucle.moveTo(w/8+w/7-w/20,2*h/5+h/3);
    ctxboucle.lineTo(w/8+w/7,2*h/5+h/2);    
  }
  else{
    ctxboucle.strokeStyle ="rgb(255, 0,0)";
    ctxboucle.moveTo(w/8+w/7-w/20,2*h/5+h/3);
    ctxboucle.moveTo(w/8+w/7-w/20,2*h/5+h/2);
    ctxboucle.lineTo(w/8+w/7,2*h/5+h/2);
  };
  ctxboucle.stroke();
  ctxboucle.fillStyle = "#FF0000";
  ctxboucle.font = "25px Arial";
  ctxboucle.fillText("+", w/14-3*h/32, 2*h/5+h/8);
  ctxboucle.fillText("-", w/14+h/32, 2*h/5+2*h/8-h/32);  
  ctxboucle.fillText("P  I  D", w/8+h/16, 2*h/5+3*h/16);
  if(flagperturbplus!=true){
  ctxboucle.fillStyle = "#009900";
  ctxboucle.fillText("+", w/2-h/16, h/5+h/32);
  };
  if(flagperturbmoins!=true){
  ctxboucle.fillStyle = "#009900";
  ctxboucle.font = "30px Arial";
  ctxboucle.fillText("-", w/2-h/16, h/5+h/32);
  };
  
  };
/* ######################FIN Dessin schema###############*/

drawSchema();

/* ######################debut simulation###############*/

function processing(){

   if (lastTime != null) {
      const tau = document.querySelector("#slider-tau");
      const gs = document.querySelector("#slider-gs");
      var gain=gs.value;
      if(flagperturbplus!=true){
            console.log("451 flagperturb",flagperturbplus);
            gain=gs.value*1.1
      };
      if(flagperturbmoins!=true){ 
            gain=gs.value*0.9;
      };
      const delta= 1;
      if(flagpause == true){
          if(flagbo == true ){
              duree+= duree+delta;
              dtsimul.push(duree_x);
              process_variable = ( process_variable*10*tau.value/(10*tau.value+delta) +gain*consigne*delta/(10*tau.value+delta) );
              mesuressimul.push(parseFloat(process_variable));
              outputregul.push(0);
              setPoints.push(consigne);
              mesure.value=parseInt(process_variable);
          }
          else{
                      //Calcul erreur
            var error = consigne - process_variable;
            console.log("409 error ",error,consigne);
            // terme Proportionel 
            var P_out = kp.value * error;
            console.log("411 P_out ",P_out);
            // terme Integral 
            integral += error * delta;
            var I_out = ki.value * integral;            
            // terme Derive 
            var derivative = (error - Erreur_precedente) / delta;
            D_out = kd.value * derivative;            
            // Calcul sortie totale: output
            var sortie = P_out + I_out + D_out;
           console.log("419 sortie ",sortie);
            if (flagsat == true){
                if (sortie > 100 ){
                sortie=100;
                };                   
                if (sortie < 0 ){
                 sortie = 0 ;
                };
            };                   
            // Update Erreur_précedente
            Erreur_precedente = error;
            process_variable = ( process_variable*10*tau.value/(10*tau.value+delta) +gain*sortie*delta/(10*tau.value+delta) );
            dtsimul.push(duree_x);
            outputregul.push(sortie);
            mesuressimul.push(parseFloat(process_variable));
            setPoints.push(consigne);
            mesure.value=parseInt(process_variable);
            console.log("438 outputregul",outputregul);          
          };
      };
   };
/*   
   if(flagdebut==true){
    if(dtsimul.length > nmax-1){
      const tmp=dtsimul.shift();
      const mes=mesuressimul.shift();
  //VERIFIER QUE MESURES ET DT SONT VIDEs !!!!et a faire a la fin du on message  
   }; 
   
   };
*/   
   
    if(flagdebut==true){   
       if(dtsimul.length > nmax-1){
          const tmp=dtsimul.shift();
          const mes=mesuressimul.shift();
          const out=outputregul.shift();
          const sp= setPoints.shift();
      //VERIFIER QUE MESURES ET DT SONT VIDEs !!!!et a faire a la fin du on message  
       }; 
    };   
   
  lastTime =  new Date().getTime();    
};

/* ######################FIN  simulation###############*/

/* ######################DEBUT Regulation###############*/


/*
nTe=(time.time()-start_time)
Sortie_regul.push(sortie)
        process_variable = ( process_variable*10*tau.value/(10*tau.value+delta) +gs.value*sortie*delta/(10*tau.value+delta) ); 
*/





/* ######################FIN Regulation###############*/




function drawGrid(lineWidth, cellWidth, cellHeight, color) {
  // Set line properties
  ctx2.strokeStyle = color;
  ctx2.lineWidth = lineWidth;

  // Get size
  let width = myCanvas.width;
  let height = myCanvas.height;

  // Draw vertical lines
  for (let x = 0; x <= width; x += cellWidth) {
    ctx2.beginPath();
    ctx2.moveTo(x, 0);
    ctx2.lineTo(x, height);
    ctx2.stroke();
  };

  // Draw horizontal lines
  for (let y = 0; y <= height; y += cellHeight) {
    ctx2.beginPath();
    ctx2.moveTo(0, y);
    ctx2.lineTo(width, y);
    ctx2.stroke();
  };

  ctx2.beginPath();
  ctx2.lineWidth=2; 
  ctx2.moveTo(0, height/2);
  ctx2.lineTo(width, height/2);
  ctx2.stroke();
  
    // Draw vertical lines
  for (let x = 0; x <= width; x += cellWidth/5) {
    ctx2.beginPath();
    ctx2.strokeStyle ="lightblue";
    ctx2.lineWidth=0.2    
    ctx2.moveTo(x, 0);
    ctx2.lineTo(x, height);
    ctx2.stroke();
  };
  
      // Draw horizontal lines
  for (let y = 0;y <= height; y += cellHeight/5) {
    ctx2.beginPath();
    ctx2.strokeStyle ="lightblue";
    ctx2.lineWidth=0.2    
    ctx2.moveTo(0, y);
    ctx2.lineTo(width, y);
    ctx2.stroke();
  };
  
  ctx2.fillStyle = "#000099";
  ctx2.font = "15px Arial";
  ctx2.fillText("Mesure", 10, 50);
  ctx2.fillStyle = "#990000";
  ctx2.font = "15px Arial";
  ctx2.fillText("Consigne", 10, 70);
  
  
};





function clock(time) {
  consigne=input.value;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
    
      //Dessiner un fond blanc
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();  
 
// Dessin Axes

  var bw = canvas.width; // Box width 
  var bh = canvas.height; // Box height  

  drawGrid(1, bw/10, bh/10, "lightskyblue");
  ctx.fillStyle = "#87CEFA";
  var login=identite.value;
  login=login.concat(" le: ",depart);
  ctx.fillText(login, bw/10, bh/20);
  ctx.fillText(new Date().toLocaleString("en-GB", { timeZone: "UTC" }), 2*bw/3, bh/20);
  

// Dessin Courbe Consigne 
/* 
  ctx.beginPath();   
  ctx.moveTo(0, bh/2);
  for(var i=1 ; i < bw-1; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle ="rgb(255, 0,0)";
    
    //ctx.lineTo(0+2*i*scalex,bh/2 -consigne*scalech1y);
    //ctx.moveTo(0+2*i*scalex,bh/2 -consigne*scalech1y);
    
    ctx.lineTo(0+scalex*i,bh/2 -scalech1y*(setPoints[i]));
    ctx.moveTo(0+scalex*i,bh/2 -scalech1y*(setPoints[i]));
    ctx.stroke();
  };
  ctx.stroke();
  */
  ctx.fillStyle = "#DAA520";
  var echelle =(4/scalech1y).toString();
  echelle=echelle.concat("V/div");
  ctx.fillText(echelle, 2*bw/13, bh-bh/20);
  var echelle2 =(1/scalex).toString();
  echelle2=echelle2.concat("S/div"); 
  ctx.fillStyle = "#87CEFA";
  ctx.fillText(echelle2, bw-bw/9, bh/2+bh/20);
  var echelle3=(4/scalech2y).toString();
  ctx.fillStyle = "#0000FF";
  echelle3=echelle3.concat("V/div");
  ctx.fillText(echelle3, bw/25, bh-bh/20);
  
  if (flagmarche==true){
    sendMessage("MESURE?");  
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(0, bh/2);    
    for(var i=1 ; i < bw-1; i++){
        ctx.strokeStyle ="rgb(0, 0, 255)";
        ctx.lineTo(0+2*i,posch2+bh/2 -mesures[i]);
        ctx.moveTo(0+2*i,posch2+bh/2 -mesures[i]);      
    };
    ctx.stroke();
  }; 
  
  if(flagsimul!=true){
    processing();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(0, bh/2);
    if(flagdebut!=true){
        for(var i=1 ; i < dtsimul.length-1; i++){
          ctx.strokeStyle ="#DAA520";
          ctx.lineTo(0+scalex*i*bw/dtsimul.length,posch1+bh/2 -scalech1y*(mesuressimul[i]));
          ctx.moveTo(0+scalex*i*bw/dtsimul.length,posch1+bh/2 -scalech1y*(mesuressimul[i]));          
        };
    ctx.stroke();    
    }
    else{
        if(flagch2gnd != true){
          ctx.beginPath();
          ctx.strokeStyle ="rgb(0, 0, 255)";          
          ctx.moveTo(0,posch2+bh/2 );
          ctx.lineTo(bw,posch2+bh/2);
          ctx.stroke();  
        
        }
        else{
        ctx.beginPath();
        
        for(var i=1 ; i < bw-1; i++){         
          ctx.strokeStyle ="rgb(0, 0, 255)";
          ctx.lineTo(0+scalex*i,ch2moy+posch2+bh/2 -scalech2y*(mesuressimul[i]));
          ctx.moveTo(0+scalex*i,ch2moy+posch2+bh/2 -scalech2y*(mesuressimul[i]));
        };  
    };
    ctx.stroke();
    if(flagch1gnd != true){
          ctx.beginPath();
          ctx.strokeStyle ="#DAA520";          
          ctx.moveTo(0,posch1+bh/2 );
          ctx.lineTo(bw,posch1+bh/2);
          ctx.stroke();  
        
        }
     else{    
        ctx.beginPath();
        for(var i=1 ; i < bw-1; i++){
          ctx.strokeStyle ="#DAA520";
          ctx.lineTo(0+scalex*i,ch1moy+posch1+bh/2 -scalech1y*(outputregul[i]));
          ctx.moveTo(0+scalex*i,ch1moy+posch1+bh/2 -scalech1y*(outputregul[i]));
          ctx.stroke();
        };
     };   
    ctx.stroke(); 
    
    // Dessin Courbe Consigne 
 
  ctx.beginPath();   
  ctx.moveTo(0, bh/2);
  for(var i=1 ; i < bw-1; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle ="rgb(255, 0,0)";
    /*
    ctx.lineTo(0+2*i*scalex,bh/2 -consigne*scalech1y);
    ctx.moveTo(0+2*i*scalex,bh/2 -consigne*scalech1y);
    */
    ctx.lineTo(0+scalex*i,bh/2 -scalech1y*(setPoints[i]));
    ctx.moveTo(0+scalex*i,bh/2 -scalech1y*(setPoints[i]));
    ctx.stroke();
  };
  ctx.stroke();  

    
    };
  

  
// Dessin Courbe Mesure    
  
//  if( flagmarche==true){ 
    
//   };
    
};
  window.requestAnimationFrame(clock);
};

window.requestAnimationFrame(clock);
