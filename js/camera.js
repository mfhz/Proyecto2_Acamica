const btnStart = document.querySelector('#btnStart');
const btnGif = document.querySelector('#btnGif');
const filling = document.querySelector('.item1');
const textColor = document.querySelector('.colorP1');
const repeat = document.querySelector('.container-photo');
const api_key1 = 'aSfyIm4TLkXUqhZxWhGqVaDndjyX8PBd';

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
          },
          gif: true  
      };

     navigator.mediaDevices.getUserMedia(constraintObj)
     .then(function(camera) {  
         console.log('ENTRA');
        const textRepeat = document.createElement('p');
        let vidSave = document.createElement('img'); 
        let video = document.createElement('video');
        const filling2 = document.querySelector('.item2');
        const textColor2 = document.querySelector('.colorP2')

        if ("srcObject" in video) {
            video.srcObject = camera;
        } else {
            //old version
            video.src = window.URL.createObjectURL(camera);
        }
        
        video.onloadedmetadata = function(ev) {
            video.play();
        };

        containerVideo.appendChild(video);
        title.style.display = 'none';
        textP.style.display = 'none';
        btnStart.style.display = 'none';
        btnRecord.style.display = 'inline-block';
        filling2.style.background = '#572EE5';
        textColor2.style.color = '#FFFFFF'; 
        btnRecord.classList.add('btnStyle');
          
        btnRecord.addEventListener('click', (ev)=>{
            recorder = RecordRTC(camera, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function() {
                    console.log('Inicia grabacion');
                },
                // onGifPreview: function(gifURL) {
                //     video.src = gifURL;
                // }
            });


            // recorderUser.record().saveAs({'video': 'vid.webn'});

            recorder.startRecording();

            recorder.camera = camera;

            btnRecord.style.display = 'none';
            btnStopRecord.style.display = 'inline-block';
            btnStopRecord.classList.add('btnStyle');
        })

        function stopRecordingCallback() {
            console.log('Gif recording stopped: ' + bytesToSize(recorder.getBlob().size));
            let blob = recorder.getBlob();
            // let blobUser = recorderUser.getBlob();
            video.src = URL.createObjectURL(blob);
            
            // invokeSaveAsDialog(blob);
            console.log('ACA');
            console.log(recorder.getBlob());
            console.log(video.src);
            vidSave.setAttribute('src', video.src);
            // vidSave.setAttribute('controls', "");
            vidSave.setAttribute('width', "488");
            vidSave.setAttribute('height', "300");
            // containerVideo.removeChild(video);
            video.style.display = 'none';
            containerVideo.appendChild(vidSave);
            btnStopRecord.style.display = 'none';
            btnGif.style.display = 'inline-block';
            btnGif.classList.add('btnStyle');
            textRepeat.innerText = 'REPETIR CAPTURA'
            textRepeat.classList.add('text-repeat');
            repeat.appendChild(textRepeat);
            recorder.reset();
            recorder.destroy();
            recorder.camera.stop();
            recorder = null;
            

            btnGif.addEventListener('click' , ev => {
                uploadGif();
                // var id = uploadGif();
                // console.log(id);
                // console.log(id.status);
                // console.log(id.meta);
            });            
            
            function uploadGif() {
                let upload = new FormData();
                upload.append("file", blob, "usergif.gif");
                console.log(upload.get('file'))
                const params = {
                    method: "POST",
                    body: upload
                };
    
                fetch(`https://upload.giphy.com/v1/gifs?api_key=${api_key1}`, params)
                
                // console.log(data.meta);
                // console.log("Subido!!!");
                // console.log(data.meta);
                // return data;
    
                .then((success) => {
                        // console.log('Success');
                        // console.log(success);
                        if (success.ok) {
                            return success.json();
                        } else {
                            throw new Error(('success') + ' no comunica con la API');
                        }
                                            
                })
                .then((data) => {  
                    // console.log('ACA');                  
                    console.log(data.data.id);
                    // console.log(data.status);
                    miGifo(data.data.id);
                })
                .catch((err) => {
                         console.log(`Error: ${err}`);
                })
            }
        }

        btnStopRecord.addEventListener('click', ev => {
            recorder.stopRecording(stopRecordingCallback);
        });
        textRepeat.addEventListener('click', ev => {
            // containerVideo.removeChild(vidSave);
             vidSave.style.display = 'none';
             textRepeat.style.display = 'none';
             item1();
        })
     })
     .catch(function(err) {           
          console.log(err.name, err.message); 
     });
}



function miGifo(gif) {
    // alert(gif);
    infoImg = {
        imagen: `https://media1.giphy.com/media/${gif}/giphy.gif`
    };
    // console.log(infoImg);
    // vid.setAttribute('src', `https://media1.giphy.com/media/${vid}/giphy.gif`);
    guardarGifLocalStorage(infoImg);

}


//Almacena el gifo grabado en LocalStorage
function guardarGifLocalStorage(ls) {
    // console.log(ls);
    let gifos;
    // Toma el valor de una arreglo con datos de LS o vacio
    gifos = obtenerCursosLocalStorage();
    // console.log(favoritos);

    // El git favorito seleccionado se agrega al arreglo (LS)
    // console.log(typeof(favoritos));
    // console.log(favoritos);
    gifos.push(ls);

    localStorage.setItem('gifos', JSON.stringify(gifos));
}

//Obtiene Gifs del LS
function obtenerCursosLocalStorage() {
    let gifosLS;

    //Comprobamos si hay algo en localStorage
    if (localStorage.getItem('gifos') === null) {
        gifosLS = [];
    } else {
        gifosLS = JSON.parse(localStorage.getItem('gifos'));
    }
    return gifosLS;
}




