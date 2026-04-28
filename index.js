

// WebSocket support
var targetUrl = `ws://${location.host}/ws`;
var websocket;
window.addEventListener("load", onLoad);


function onLoad() {
  //initializeSocket();
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

var valid = document.querySelector("#button-valider");
var identite = document.querySelector("#text-identite");
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
var ch1fft = document.getElementById("button-ch1fft");
var textv1max= document.getElementById("text-v1");
var v1moy= document.getElementById("text-v1moy");
var trigch1= document.getElementById("button-trigch1");
var trigch2= document.getElementById("button-trigch2");
var autoset1= document.getElementById("button-autoset1");
var pause = document.querySelector("#button-pause");
var debut = document.querySelector("#button-debut");
var save = document.querySelector("#button-save");
var simul= document.querySelector("#button-simul");
var kp = document.querySelector("#slider-Kp");
var ki = document.querySelector("#slider-Ki");
var kd = document.querySelector("#slider-Kd");
var tau1 = document.querySelector("#slider-tau");
var gs1 = document.querySelector("#slider-gs");
var mesureProcess= document.querySelector("#text-mesure");
var bf = document.querySelector("#button-bf");
var bo = document.querySelector("#button-bo");
var perturbplus = document.querySelector("#button-perturbplus");
var perturbmoins = document.querySelector("#button-perturbmoins");
var value = document.querySelector("#text-consigne");

var afficheConsigne= document.querySelector("#text-consigne");

var consigne=input.value;
var process_variable=0.0;
var gains =gs1.value;
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
var scalegene1y=1;
var scalegene2y=1;
var scalex= 1;
var posch1=0.0;
var posch2=0.0;
var ch1moy =0.0;
var ch2moy =0.0;
var mouvement = 0.0;
var posx=0.0;
var posy=0.0;
var stage =0;
var Erreur_precedente = 0.0;
var integral=0.0;
var flagsat = true;
var flagdebut = true;
var flagch1gnd  = true;
var flagch2gnd  = true;
var flagch1dc = true;
var flagch2dc = true;
var flagch1fft = true;
var flagautoset1 = true;
var flagtrigch1 = true;
var flagtrigch2 = true;
var flagpause = true;
var flagsimul = true;
var flagbo = true;
var flagperturbplus = true;
var flagperturbmoins = true;
var messages = "mes warnings ";
var now = new Date();

//var dataCh2=[];
var setPoints=[];
var outputregul=[];
var mesuressimul=[];

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
  fftSize: 32768,
  smoothingTimeConstant: 0.8,
});
var analyser2 = new AnalyserNode(audioCtx, {
  fftSize: 2048,
  smoothingTimeConstant: 0.8,
});
var analyserfft = new AnalyserNode(audioCtx, {
  fftSize: 2048,  
  smoothingTimeConstant: 0.8,
});

var analyserfft2 = new AnalyserNode(audioCtx, {
  fftSize: 2048,  
  smoothingTimeConstant: 0.8,
});
analyserfft.maxDecibels = -10;
analyserfft.minDecibels = -40;
analyserfft.smoothingTimeConstant = 0.85;
analyserfft2.maxDecibels = -10;
analyserfft2.minDecibels = -40;
analyserfft2.smoothingTimeConstant = 0.85;
osc.connect(gain).connect(analyser).connect(audioCtx.destination);
osc2.connect(gain2).connect(analyser2).connect(audioCtx.destination);
osc.connect(gain).connect(analyserfft);
osc2.connect(gain2).connect(analyserfft2);
var bufferLength = analyser.frequencyBinCount;
console.log("179 bufferlenght",bufferLength);
var bufferLength2 = analyser2.frequencyBinCount;
var bufferLengthFft = analyserfft.frequencyBinCount;
var bufferLengthFft2 = analyserfft2.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
var dataArray2 = new Uint8Array(bufferLength2);
var dataCh1 = Array.from(dataArray);
var dataCh2 = Array.from(dataArray2);
var dataFft1 = new Uint8Array(bufferLengthFft);
var dataFft2 = new Uint8Array(bufferLengthFft2);
var tampon1=[];
var tampon2=[];
analyser.getByteTimeDomainData(dataArray);
analyser2.getByteTimeDomainData(dataArray2);
analyserfft.getByteFrequencyData(dataFft1);
analyserfft2.getByteFrequencyData(dataFft2);

//LISTENERS

/*amp.addEventListener("click", () => {  
  amplitudech1=amp.value;
  gain.gain.value=amplitudech1/100;
  console.log("69 amplitudech1",amplitudech1)
});
*/
window.addEventListener("mousemove", (e) => {  
     //console.log(e.clientX , e.clientY ); 
     mouvement=mouvement+Math.sqrt((posx-e.clientX)**2+(posy-e.clientY)**2);
     posx=e.clientX;
     posy = e.clientY;
     //console.log("mouvement",mouvement);
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
  //window.alert("save");
  downloadTextFile();
  saveImage();
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

simul.addEventListener("click", () => {
  flagsimul=!flagsimul;
  if (flagsimul!=true){
  simul.style.color="blue";
  simul.style.background = "linear-gradient(to right, #5b86e3ff 0%, #7a45b6ff  51%, #5b86e3ff   100%)";
  console.log("214 flagsimul",flagsimul);
  }
  else{
  simul.style.color="rgb(0 191 255)";
  simul.style.background ="white";
  };   
});

pause.addEventListener("click", () => {
  flagpause=!flagpause;
  if (flagpause!=true){
  pause.style.color="blue";
  pause.style.background = "linear-gradient(to right, #5b86e3ff 0%, #7a45b6ff  51%, #5b86e3ff   100%)";
  }
  else{
  pause.style.color="rgb(0 191 255)";
  pause.style.background ="white";
  };   
});

trigch1.addEventListener("click", () => {
  console.log("205 flagtrigch1",flagtrigch1); 
  flagtrigch1 =! flagtrigch1;
  if(flagtrigch1 !=true){
    trigch1.style.color="rgb(218 165 32)";
    trigch1.style.background = "linear-gradient(to right, #e3e15bff 0%, #f3f3d6ff  51%, #e3e15bff   100%)";
  }
  else{  
  trigch1.style.color="rgb(218 165 32)";
  trigch1.style.background ="white";;  
  };
  flagtrigch2 =! flagtrigch1;
  console.log("215 flagtrigch1",flagtrigch1);
});

trigch2.addEventListener("click", () => { 
  flagtrigch2=!flagtrigch2;
  if (flagtrigch2!=true){
    trigch2.style.color="lightblue";
    trigch2.style.color="blue";   
  }
  else{  
  trigch2.style.color="blue";
  trigch2.style.color="lightblue";  
  };
  flagtrigch1 =! flagtrigch2;
  console.log("229 flagtrigch2",flagtrigch2);
});

autoset1.addEventListener("click", () => { 
  flagautoset1=!flagautoset1;
  console.log("234 flagautoset1",flagautoset1);
});


ch1fft.addEventListener("click", () => { 
  flagch1fft=!flagch1fft;
  //console.log("175 flagch1fft",flagch1fft);
});



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

ch1gnd.addEventListener("click", () => {  
  flagch1gnd = !flagch1gnd;  
});

ch2gnd.addEventListener("click", () => { 
  flagch2gnd = !flagch2gnd;
});

ch1dc.addEventListener("click", () => { 
  flagch1dc = !flagch1dc;  
  if (flagch1dc!=true){
    ch1dc.style.color="rgb(218 165 32)";
    ch1dc.style.background ="white";
    ch1ac.style.background = "linear-gradient(to right, #e3e15bff 0%, #f3f3d6ff  51%, #e3e15bff   100%)";  
    ch1moy=eval(dataCh1.join('+'))/(dataCh1.length);
    v1moy.value=ch1moy;
    console.log("213 ch1moy ",ch1moy);
  }
  else{  
    ch1dc.style.color="rgb(218 165 32)";
    ch1dc.style.background ="linear-gradient(to right, #e3e15bff 0%, #f3f3d6ff  51%, #e3e15bff   100%)";
    ch1ac.style.background = "white";
  };
  
});

ch2dc.addEventListener("click", () => {

  flagch2dc = !flagch2dc;
  if (flagch2dc!=true){
    ch2dc.style.color="lightblue";
    ch2ac.style.color="blue";
    
  ch2moy=eval(dataCh2.join('+'))/(dataCh2.length);
  }
  else{
  
  ch2dc.style.color="blue";
  ch2ac.style.color="lightblue";
  ch2moy=0;
  };
});

ch1ac.addEventListener("click", () => { 
  flagch1dc = !flagch1dc;
  if (flagch1dc == true){
    ch1dc.style.color="rgb(218 165 32)";
    ch1dc.style.background = "linear-gradient(to right, #e3e15bff 0%, #f3f3d6ff  51%, #e3e15bff   100%)";
     
  }
  else{
    ch1ac.style.background = "linear-gradient(to right, #e3e15bff 0%, #f3f3d6ff  51%, #e3e15bff   100%)";
    ch1dc.style.color="rgb(218 165 32)";
    ch1dc.style.background = "white";
    //ch1ac.style.color="goldenrod";
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
    playButton1.innerText = "ON";
  } else if (playButton1.dataset.playing === "false") {
    gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.2);
    playButton1.dataset.playing = "true";
    playButton1.innerText = "ON";
  } else if (playButton1.dataset.playing === "true") {
    gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    playButton1.dataset.playing = "false";
    playButton1.innerText = "OFF";
  }
});

playButton2.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  if (playButton2.dataset.playing === "init") {
    osc2.start(audioCtx.currentTime);
    playButton2.dataset.playing = "true";
    playButton2.innerText = "ON";
  } else if (playButton2.dataset.playing === "false") {
    gain2.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.2);
    playButton2.dataset.playing = "true";
    playButton2.innerText = "ON";
  } else if (playButton2.dataset.playing === "true") {
    gain2.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    playButton2.dataset.playing = "false";
    playButton2.innerText = "OFF";
  }
});


v1max.addEventListener("click", () => {
  amplitudech1=v1max.value;
  gain.gain.value=amplitudech1;
  console.log("283 amplitudech1",amplitudech1)
  textv1max.value =10*gain.gain.value;
});

v2max.addEventListener("click", () => {
  amplitudech2=v2max.value;
  gain2.gain.value=amplitudech2/100;
  console.log("289 amplitudech2",amplitudech2)
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
})


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

bo.addEventListener("click", () => {  
  flagbo=true;
  drawSchema(); 
});


input.addEventListener("input", (event) => {
    if(stage >=1){
      value.value = input.value;
      //console.log("138 value inputvalue",value.textContent,input.value);
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
  //flagperturbmoins=true;
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
  //flagperturbplus=true;
  drawSchema();
  };
});


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
  ctxboucle.fillStyle = '#F0EEE9';
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
  ctxboucle.fillText("W", w/100, 2*h/5+h/16);
  
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
  ctxboucle.fillText("Actionneur", w/8+w/7+w/15+h/100, 2*h/5+3*h/16);
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
  ctxboucle.fillText("P I D", w/8+h/16, 2*h/5+3*h/16);
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





// to play 1 second we need array of 44100 numbers
const sampleRate = 44100;
analyser.getByteTimeDomainData(dataArray);
analyser2.getByteTimeDomainData(dataArray2);

//textv1max.value =10*gain.gain.value;
var echellex =(1/scalex).toString();

function compute(time) {
 // console.log("587 audioCtx.currentTime",audioCtx.currentTime);
    consigne=input.value;
    analyser.getByteTimeDomainData(dataArray);
    analyser2.getByteTimeDomainData(dataArray2);
    analyserfft.getByteFrequencyData(dataFft1);
    //console.log("429 datafft1",dataFft1);
    dataCh1 = Array.from(dataArray);
    dataCh2 = Array.from(dataArray2);
    const maxfft = Math.max(...dataFft1);
    //console.log("445 max fft",maxfft);
    //console.log("446 index of max fft",dataFft1.indexOf(maxfft));    
    v1moy.value=eval(dataCh1.join('+'))/(dataCh1.length)*1;  
    if(flagch1dc != true){
      ch1moy=eval(dataCh1.join('+'))/(dataCh1.length);
    }
    else{
      ch1moy=0;
    };    
    var top1=[];
    var deltaT1=0.0;
    var cons =[];
    var delta= 1/10;

    if(flagperturbplus!=true){            
        gains=gs1.value*1.1;
      }
    else{
        gains=gs1.value;
      };
    if(flagperturbmoins!=true){ 
        gains=gs1.value*0.9;
      };

    if(flagpause == true){
    for (let i=0; i < dataCh1.length-1; i++){      
      if( dataCh1[i] < v1moy.value && dataCh1[i+1] > v1moy.value){       
        top1.push(i);
        cons.push(input.value); 
        setPoints.push(input.value); 
        //processing();
        
        if(flagbo==true){
        process_variable = ( process_variable*10*tau1.value/(10*tau1.value+delta) +gains*consigne*delta/(10*tau1.value+delta) );        
        outputregul.push(0);
        mesuressimul.push(parseFloat(process_variable));
        }
        else{
                      //Calcul erreur
            var error = consigne - process_variable;
           // console.log("409 error ",error,consigne);
            // terme Proportionel 
            var P_out = kp.value * error;
           // console.log("411 P_out ",P_out);
            // terme Integral 
            integral += error * delta;
            var I_out = ki.value * integral;            
            // terme Derive 
            var derivative = (error - Erreur_precedente) / delta;
            D_out = kd.value * derivative;            
            // Calcul sortie totale: output
            var sortie = P_out + I_out + D_out;           
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
            process_variable = ( process_variable*10*tau1.value/(10*tau1.value+delta) +gains*sortie*delta/(10*tau1.value+delta) );          
            outputregul.push(sortie);
            mesuressimul.push(parseFloat(process_variable));                             
          };
        
        //console.log("606 top1.length ",top1.length,process_variable);
        if( setPoints.length > (WIDTH-1)/scalex){
          const sp= setPoints.shift();
          const ms= mesuressimul.shift(); 
          const op=outputregul.shift();         
        };        
        //regulation        
      };
    
    };
    if(flagtrigch1!=true){      
      tampon1=dataCh1.slice(top1[1],top1[scalex*2]);
      //tampon2=mesuressimul.slice(top1[1],top1[2]);
      //tampon1=dataCh1.slice(top1[0],top1[2]);
      //console.log("479 dataCh1.lenght",dataCh1.length);

      //console.log("630 tampon1.lenght freq ",3*16348/tampon1.length,"Hz");

      //echellex =(tampon1.length/(3*16348)).toString(); 
      echellex =(scalex*tampon1.length/(30*16348)).toFixed(3);       
      echellex=echellex.concat(" s/Div");
    }
    else{
      tampon1=dataCh1;
      tampon2=mesuressimul;     
    }; 
  };   
  mesureProcess.value=process_variable.toFixed(0); 
  afficheConsigne.value=input.value;   
};

function drawGrid(lineWidth, cellWidth, cellHeight, color) {
  // Set line properties
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Get size
  let width = WIDTH;
  let height = HEIGHT;

  // Draw vertical lines
  for (let x = 0; x <= width; x += cellWidth) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  };

  // Draw horizontal lines
  for (let y = 0; y <= height; y += cellHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  };

  ctx.beginPath();
  ctx.lineWidth=2; 
  ctx.moveTo(0, height/2);
  ctx.lineTo(width, height/2);
  ctx.stroke();
  
    // Draw vertical lines
  for (let x = 0; x <= width; x += cellWidth/5) {
    ctx.beginPath();
    ctx.strokeStyle ="lightblue";
    ctx.lineWidth=0.2    
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  };
  
      // Draw horizontal lines
  for (let y = 0;y <= height; y += cellHeight/5) {
    ctx.beginPath();
    ctx.strokeStyle ="lightblue";
    ctx.lineWidth=0.2    
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  };
  
  ctx.fillStyle = "#000099";
  ctx.font = "15px Arial";
  ctx.fillText("Mesure", 10, 50);
  ctx.fillStyle = "#990000";
  ctx.font = "15px Arial";
  ctx.fillText("Consigne", 10, 70);
  
  
};

function clock(time) {  
  compute();
  // Dessin Axes
  ctx.fillStyle = "rgb(0 0 0)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawGrid(1, WIDTH/10, HEIGHT/10, "white");
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(218 165 32)";
  const sliceWidth = (WIDTH * scalex) / bufferLength;
  //valeur interval déplacements en axe x
  let x = 0;
  let x2 = 0;
  let x3 = 0;
  let xfft = 0;
  let xc = 0;
  let xm = 0;
  let xop = 0;

  //Courbe gene1

  // ctx.beginPath();  
  // for (let i = 0; i < bufferLength; i++) {
  //   const v = dataArray[i] / 128.0;
  //   const y = (v * HEIGHT)*v1max.value / 2;   

  //   if (i === 0) {
  //     ctx.moveTo(x, posch1+(HEIGHT/2-y)*scalegene1y);
  //   } else {
  //     ctx.lineTo(x,posch1+ (HEIGHT/2-y)*scalegene1y);
  //   }

  //   x += sliceWidth;
  // };
  // ctx.lineTo(WIDTH, HEIGHT / 2);
  // ctx.stroke();

  //Courbe gene2

  ctx.beginPath();
  ctx.strokeStyle = "rgb(0 0 255)";  
  ctx.fillText(echellex, WIDTH-WIDTH/7, HEIGHT/2+HEIGHT/20);
  for (let i = 0; i < bufferLength2; i++) {    
    const v = dataArray2[i] / 128.0;
    const y = (v * HEIGHT)*v2max.value / 2;   

    if (i === 0) {
      ctx.moveTo(x2, posch2+(HEIGHT/2-y)*scalech2y);
    } else {
      ctx.lineTo(x2,posch2+ (HEIGHT/2-y)*scalech2y);
    }

    x2 += sliceWidth*bufferLength/bufferLength2;
  };
  ctx.lineTo(WIDTH, HEIGHT / 2);
  ctx.stroke();

// Dessin Courbe Consigne

  ctx.beginPath();   
  ctx.moveTo(0, HEIGHT/2);  
  for(let i=1 ; i < setPoints.length; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle ="rgb(255, 0,0)"; 
    const v = setPoints[i] / 128.0;
    const y = (v * HEIGHT) / 2;   

      if (i === 0) {
        ctx.moveTo(xc, posch1+(HEIGHT/2-y)*scalech1y);
      } 
      else {
        ctx.lineTo(xc,posch1+ (HEIGHT/2-y)*scalech1y);
      };

      //xc += sliceWidth*setPoints.length/scalex;
      xc += (WIDTH ) / (scalex*setPoints.length);
      //xc += sliceWidth*bufferLength/(setPoints.length*scalex);
    ctx.stroke();
  }; 
  ctx.stroke(); 
  //dessin mesure regul
  ctx.beginPath();   
  ctx.moveTo(0, HEIGHT/2);
  for(let i=1 ; i < tampon2.length; i++){
  //for(let i=1 ; i < bufferLength; i++){
    ctx.lineWidth = 1;
    ctx.strokeStyle ="rgba(15, 234, 241, 1)"; 
    const v = tampon2[i]/128 ;
    const y = (v * HEIGHT) / 2;   

      if (i === 0) {
        ctx.moveTo(xm, posch1+(HEIGHT/2-y)*scalech1y);
      } 
      else {
        ctx.lineTo(xm,posch1+ (HEIGHT/2-y)*scalech1y);
      };

      //xm += (scalex*WIDTH ) / (setPoints.length);
      //xm += (scalex*WIDTH ) / tampon2.length;
      xm += (WIDTH ) /( scalex*tampon2.length);
    ctx.stroke();
  }; 
//dessin ch1 scope

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(0, HEIGHT/2);  
  if(flagch1gnd != true){    
    ctx.beginPath();
    ctx.strokeStyle ="#26d80fff";          
    ctx.moveTo(0,posch1+HEIGHT/2 );
    ctx.lineTo(WIDTH,posch1+HEIGHT/2);
    ctx.stroke();      
  }
  else{     
    ctx.beginPath();   
    for(var i=1 ; i < tampon1.length/scalex; i++){          
      ctx.strokeStyle ="#26d80fff";

      const v = tampon1[i] / 128.0;
      const y = (v * HEIGHT) / 2;   

      if (i === 0) {
        ctx.moveTo(x3,2*ch1moy+ posch1+(HEIGHT/2-y)*scalech1y);
      } 
      else {
        ctx.lineTo(x3,2*ch1moy+posch1+ (HEIGHT/2-y)*scalech1y);
      };

      x3 += sliceWidth*bufferLength*scalex/(1*tampon1.length);
    };
    ctx.stroke();  
  };
//Dessin sortie regulateur

if(flagbo != true){     
    ctx.beginPath();   
    for(var i=1 ; i < outputregul.length/scalex; i++){          
      ctx.strokeStyle ="#29f333ff";

      const v = outputregul[i] / 128.0;
      const y = (v * HEIGHT) / 2;       

      if (i === 0) {
        ctx.moveTo(xop, posch1+(HEIGHT/2-y)*scalech1y);
      } 
      else {
        ctx.lineTo(xop,+posch1+ (HEIGHT/2-y)*scalech1y);
      };

      xop += (WIDTH ) /( scalex*tampon2.length);
    };
    ctx.stroke();  
  };


  if(flagch1fft != true){    
    const barWidth = (WIDTH / bufferLengthFft) * 5 - 1;
    let barHeight;    
    for (let i = 0; i < bufferLengthFft; i++) {
      barHeight = dataFft1[i];
      ctx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
      ctx.fillRect(xfft, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
      xfft += 3*barWidth;
    };
    ctx.stroke();
  };
  ctx.stroke();
      window.requestAnimationFrame(clock);

};

window.requestAnimationFrame(clock);

