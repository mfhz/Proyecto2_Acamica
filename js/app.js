let caja = document.querySelector('.caja');
let padreImg = document.querySelector('.box-zoom-img');
let imagen = document.querySelectorAll('.zoom-img');
let contenedor, contenedor2, contenedor3, contenedor4, contenedor5;
let text;
let cerrar, fav, descarga;
const btnSwitch = document.querySelector('#switch');
const menuNav = document.querySelector('.menu');



//Ventana Modal
imagen.forEach(re => {
    re.addEventListener('click', function(ev, index) {
        // console.log('click')
        // var altovent = window.screen.height;
        // console.log(altovent);
        console.log(re[0]);
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        // console.log(re.parentNode);
        caja.style.height = '2000' + "px";
        caja.classList.remove('caja');
        caja.classList.add('caja-off');
        contenedor = document.createElement('div');
        caja.appendChild(contenedor);
        contenedor.classList.add('zoom');
        cerrar = document.createElement('img');
        cerrar.setAttribute('src', './images/close.svg');
        cerrar.setAttribute('class', 'close');
        contenedor.appendChild(cerrar);
        contenedor.appendChild(re);
        contenedor5 = document.createElement('div');
        contenedor5.classList.add('container');
        contenedor.appendChild(contenedor5);
        contenedor3 = document.createElement('div');
        contenedor3.classList.add('container-text');
        contenedor5.appendChild(contenedor3)
        text = document.createElement('p')
        contenedor3.appendChild(text);
        text = document.createElement('h3')
        contenedor3.appendChild(text);
        contenedor2 = document.createElement('div');
        contenedor2.classList.add('container-img');
        contenedor5.appendChild(contenedor2);
        fav = document.createElement('img');
        fav.setAttribute('src', './images/icon-fav-active.svg');
        fav.setAttribute('class', 'img-fav');
        contenedor2.appendChild(fav);
        contenedor4 = document.createElement('div');
        contenedor4.classList.add('box-img-download');
        contenedor2.appendChild(contenedor4);
        descarga = document.createElement('img');
        descarga.setAttribute('src', './images/icon-download.svg');
        descarga.setAttribute('class', 'img-download');
        contenedor4.appendChild(descarga);



        re.style.pointerEvents = "none";
        

        
        
        
        

        cerrar.addEventListener('click', function(ev){
            ev.preventDefault();
            // console.log('cerrar');
            // console.log(this.parentNode.parentNode);
            // // console.log(this.parentNode);
            // console.log(re);
            // console.log(re.parentNode);
            document.getElementsByTagName("html")[0].style.overflow = "auto";
            caja.classList.remove('caja-off');
            caja.classList.add('caja');
            re.style.pointerEvents = 'auto';
            padreImg.appendChild(re);
            // console.log(re);
            // console.log(re.parentNode);                    
            this.parentNode.remove();
        })
        
    })    
})



// Modo Oscuro
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // document.body.style.background = 'red';
    btnSwitch.classList.toggle('active');

    //Guardar el modo en LocalStorage
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');        
    }
})

/// Se obtiene el modo actual desde localStorage
if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    btnSwitch.classList.add('active');
} else {
    document.body.classList.remove('dark');    
    btnSwitch.classList.remove('active');
}



// Bloqueando scroll al entrar en el menu  hamburguesa.
menuNav.addEventListener('click', () => {
    // menuNav.style.overflow = 'hidden';
    document.body.classList.toggle('navbar');

})


















// Imprimiendo Gifs si se encuentra en la busqueda principal del proyecto
const line = document.querySelector('#line');
const sectionGifs = document.querySelector('.interactive-search')
const caja1 = document.querySelector('#box-search');
const btn =document.querySelector('#btnSearch');
const impresionError = document.querySelector('#error');
const titulo = document.querySelector('#titleError');
const tituloN = document.querySelector('#titleNoError');
const btnMore = document.querySelector('#btnMore');
btn.addEventListener('click', obtenerUsuario);
const api_key = 'aSfyIm4TLkXUqhZxWhGqVaDndjyX8PBd';
const num = 0;
function obtenerApi(user) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${user}&api_key=${api_key}&limit=25`;

    fetch(url)
        .then((success) => {
            // console.log(success);
            if (success.ok) {
                return success.json();
            } else {
                throw new Error(('success') + ' no comunica con la API');
            }
            

        })
        .then((data) => {
            // console.log(data.data);
            // console.log(data.data[0].images.downsized.url);
            // console.log(data.meta);
            line.classList.remove('error');
            sectionGifs.classList.remove('error');
            impresionError.classList.add('error');
            if (data.data.length === 0) {
                // console.log('ERROR')
                throw new Error(' (data) No existe valor ingresado por el usuario');
            } else {                
                caja1.classList.add('box-search');                

                // console.log(caja.children.length);                
                if (caja1.children.length > 0) {
                    // console.log(caja.childNodes);
                    for (let i = 0; i < 25; i++) {
                        // console.log('SI');
                        caja1.removeChild(caja1.firstChild);
                                                
                    }
                    // console.log(caja.childNodes);                        
                }

                tituloN.classList.remove('error');
                tituloN.innerText = user;

                
                data.data.forEach(function(el) {                
                    // console.log(el.images.downsized.url);          
                    
                    // console.log(titulo);
                    
                    const image = document.createElement('img');
                    // const title = document.createElement('h2');
                    const boxGif = document.createElement('div');

                    image.src = el.images.downsized.url;
                    image.classList.add('imgGif');
                    
                    // title.textContent = el.title;
                    
                    boxGif.appendChild(image);
                    // boxGif.appendChild(title);
                    caja1.insertAdjacentElement('afterbegin', boxGif);
                });               
            }

        })
        .catch((err) => {
            // console.log(`${err}`);
            // console.log(caja.childNodes);

            // console.log(impresionError.childNodes);

            // console.log(user);
            tituloN.classList.add('error');
            if (user != '') {
                impresionError.classList.remove('error');

                console.log(caja.childNodes.length);
                if (caja1.childNodes.length === 0) {
                    // console.log('si está vacio');
                    // console.log(user);
                    // console.log(impresionError.children);
                    
                    
                    // console.log(impresionError.children.length);
                    if (impresionError.children.length === 1 || impresionError.children.length === 2 ) {
                        
                        const errorBox = document.createElement('div');
                        const errorImg = document.createElement('img');
                        const errorText = document.createElement('p');

                        btnMore.classList.add('error');
    
                        
                        
                        titulo.innerText = user;
                        errorImg.setAttribute('src', './images/icon-busqueda-sin-resultado.svg')
                        errorText.innerText = 'Intenta con otra búsqueda.';
                        
                        
                        
                        impresionError.appendChild(titulo);
                        impresionError.appendChild(errorImg);
                        impresionError.appendChild(errorText);
            
            
                        // image.src = el.images.downsized.url;
                        // image.classList.add('imgGif');
                    } else {
                        titulo.innerText = user;
                        impresionError.insertAdjacentElement('afterbegin', titulo);
                    }
    
    
                } else {
                    console.log('no entra')
                    for (let i = 0; i < 25; i++) {
                        // console.log('SI');
                        caja1.removeChild(caja1.firstChild);
                                                
                    }
                    titulo.innerText = user;
                    impresionError.insertAdjacentElement('afterbegin', titulo);
                }
            } else {
                // console.log('esta vacio completamente')
                line.classList.add('error');
                sectionGifs.classList.add('error');
            }

        })
}

function obtenerUsuario() {
    // console.log('click imagen')
    const info = document.querySelector('#busqueda').value;
    // console.log(info);
    obtenerApi(info);
}









// Mostrar Trending en pantalla principal
document.addEventListener('DOMContentLoaded', obtenerTrending);
const boxtrending = document.querySelector('.box-zoom-img');


function obtenerTrending() {
    const url = `http://api.giphy.com/v1/gifs/trending?&api_key=${api_key}&limit=20`;
    fetch(url)
        .then((success) => {
            // console.log(success);
            if (success.ok) {
                return success.json();
            } else {
                throw new Error(('success') + ' no comunica con la API');
            }

        })
        .then((data) => {
            // console.log(data.data);

            data.data.forEach((el) => {
                // console.log(el);                    
                    const image = document.createElement('img');
                    image.src = el.images.downsized.url;
                    image.classList.add('zoom-img');
                    // boxtrending.insertAdjacentElement('afterbegin', image);
                    boxtrending.appendChild(image);
            })
        })
        .catch((err) => {
            console.log(`${err}`);
        })
    
}