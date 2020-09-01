const btnStart = document.querySelector('#btnStart');
const btnGif = document.querySelector('#btnGif');
const filling = document.querySelector('.item1');
const textColor = document.querySelector('.colorP1');
const repeat = document.querySelector('.container-photo');
const api_key = 'aSfyIm4TLkXUqhZxWhGqVaDndjyX8PBd';

btnGif.style.display = 'none';

btnStart.addEventListener('click', item1);

function item1() {     
     btnGif.style.display = 'none';
     const textP = document.querySelector('#textP');
     const title = document.querySelector('#title');
     filling.style.background = '#572EE5';
     textColor.style.color = '#FFFFFF';
     title.innerText = '¿Nos das acceso \n a tu cámara?';
     textP.innerText = 'El acceso a tu camara será válido sólo \n  por el tiempo en el que estés creando el GIFO.';
     btnStart.style.display = 'none';
     accederCamara();
}



function accederCamara() {
     filling.style.background = '#FFFFFF';
     textColor.style.color = '#572EE5';
     const containerVideo = document.querySelector('.box-photo');  
     const btnRecord = document.querySelector('#btnRecord');
     const btnStopRecord = document.querySelector('#btnStopRecord');
     

     let constraintObj = { 
          audio: false, 
          video: { 
              facingMode: "user", 
          //     width: { min: 640, ideal: 1280, max: 1920 },
              width: 488,
              height: 300 
          //     height: { min: 480, ideal: 720, max: 1080 } 
          } 
      }; 
      // width: 1280, height: 720  -- preference only
      // facingMode: {exact: "user"}
      // facingMode: "environment"
      
      //handle older browsers that might implement getUserMedia in some way
     

     if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {};
          navigator.mediaDevices.getUserMedia = function(constraintObj) {
              let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
              if (!getUserMedia) {
                  return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
              }
              return new Promise(function(resolve, reject) {
                  getUserMedia.call(navigator, constraintObj, resolve, reject);
              });
          }
     }else{
          navigator.mediaDevices.enumerateDevices()
          .then(devices => {
              devices.forEach(device=>{
                  console.log(device.kind.toUpperCase(), device.label);
                  //, device.deviceId
              })
          })
          .catch(err=>{
              console.log(err.name, err.message);
          })
     }

     navigator.mediaDevices.getUserMedia(constraintObj)
     .then(function(mediaStreamObj) {          
          //connect the media stream to the first video element
          let video = document.createElement('video');
          const filling2 = document.querySelector('.item2');
          const textColor2 = document.querySelector('.colorP2')
          // video.setAttribute('controls', "");
          containerVideo.appendChild(video);
          title.style.display = 'none';
          textP.style.display = 'none';
          btnStart.style.display = 'none';
          btnRecord.style.display = 'inline-block';
          filling2.style.background = '#572EE5';
          textColor2.style.color = '#FFFFFF'; 
          btnRecord.classList.add('btnStyle');

          if ("srcObject" in video) {
              video.srcObject = mediaStreamObj;
          } else {
              //old version
              video.src = window.URL.createObjectURL(mediaStreamObj);
          }
          
          video.onloadedmetadata = function(ev) {
              //show in the video element what is being captured by the webcam
              video.play();
          };
          
          //add listeners for saving video/audio
          // let start = document.getElementById('btnRecord');
          // let stop = document.getElementById('btnStopRecord');

          const textRepeat = document.createElement('p');

          let vidSave = document.createElement('video');
          let mediaRecorder = new MediaRecorder(mediaStreamObj);
          let chunks = [];

          
          btnRecord.addEventListener('click', (ev)=>{
               btnRecord.style.display = 'none';
               btnStopRecord.style.display = 'inline-block';
               btnStopRecord.classList.add('btnStyle');
               mediaRecorder.start();
               console.log(mediaRecorder.state);
          })
          btnStopRecord.addEventListener('click', (ev)=>{
              mediaRecorder.stop();
              console.log(mediaRecorder.state);
          });
          mediaRecorder.ondataavailable = function(ev) {
              chunks.push(ev.data);
          }
          mediaRecorder.onstop = (ev)=>{
              let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
              chunks = [];
              let videoURL = window.URL.createObjectURL(blob);
              vidSave.src = videoURL;
              vidSave.setAttribute('controls', "");
              vidSave.setAttribute('width', "488");
              video.style.display = 'none';
              containerVideo.appendChild(vidSave);
              btnStopRecord.style.display = 'none';
              btnGif.style.display = 'inline-block';
              btnGif.classList.add('btnStyle');
              textRepeat.innerText = 'REPETIR CAPTURA'
              textRepeat.classList.add('text-repeat');
              repeat.appendChild(textRepeat);

              textRepeat.addEventListener('click', ev => {
                   vidSave.style.display = 'none';
                   textRepeat.style.display = 'none';
                   item1();
              })

              btnGif.addEventListener('click' , ev => {                   
               //     let form = new FormData();
               //     console.log(videoURL.srcObject);
               //     form.append('file', mediaStreamObj.getBlob());
               //     console.log(form.get('file'));

                   let upload = new FormData();
                   upload.append("file", blob, "usergif.gif");
                   console.log(upload.get("file"));

                   fetch("https://upload.giphy.com/v1/gifs?file=" + upload + "&api_key=" + api_key, { method: "POST" })
                   .then((success) => {
                         if (success.ok) {
                              return success.json();
                         } else {
                              throw new Error(('success') + ' no comunica con la API');
                         }                         
                   })
                   .then((data) => {                        
                        console.log(data.data);
                        console.log(data.meta);
                   })
                   .catch((err) => {
                        console.log(`Error: ${err}`);
                   })
              })
          }
     })
     .catch(function(err) {           
          console.log(err.name, err.message); 
     });
}