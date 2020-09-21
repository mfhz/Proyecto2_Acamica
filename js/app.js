let caja = document.querySelector('.caja');
let padreImg = document.querySelector('.box-zoom-img');
let imagen = document.querySelectorAll('.zoom-img');
let contenedor, contenedor2, contenedor3, contenedor4, contenedor5;
let text;
let cerrar, fav, descarga;
const btnSwitch = document.querySelector('#switch');
const menuNav = document.querySelector('#checkbox');
const boxtrending = document.querySelector('.box-zoom-img');
const boxFavoritos = document.querySelector('.card-favoritos');
const boxGif = document.querySelector('.card-gifos');
const  span = document.querySelector('#checkbox');
let x = window.matchMedia("(min-width: 1440px)");

// Al cargar el documento mostrar el localStorage
document.addEventListener('DOMContentLoaded', leerLocalStorage);
document.addEventListener('DOMContentLoaded', leerLocalStorage1);

// Media query 1440
// function myFunction(x) {
//     // console.log(x);
//     // console.log(x.matches);
//     if (x.matches) {
//         // console.log('entra acá 1440');
//     } else {
//         // console.log('entra 375');
//         // document.body.style.backgroundColor = "pink";
//         menuNav.style.overflow = 'hidden';
//         document.body.classList.toggle('navbar');
//     }
    
// }

// Bloqueando scroll al entrar en el menu  hamburguesa.
menuNav.addEventListener('click', () => {
    // console.log('click');
    menuNav.style.overflow = 'hidden';
    document.body.classList.toggle('navbar');    
    // myFunction(x);
    // x.addListener(myFunction);    
})





// Modo Oscuro
btnSwitch.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('CLICK');
    document.body.classList.toggle('dark');
    // document.body.classList.toggle('navbar');
    // document.body.classList.add('navbar');
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





// Imprimiendo Gifs si se encuentra en la busqueda principal del proyecto
const line = document.querySelector('#line');
const sectionGifs = document.querySelector('.interactive-search')
const caja1 = document.querySelector('#box-search');
const btn =document.querySelector('#btnSearch');
const impresionError = document.querySelector('#error');
const titulo = document.querySelector('#titleError');
const tituloN = document.querySelector('#titleNoError');
const btnMore = document.querySelector('#btnMore');
const api_key = 'aSfyIm4TLkXUqhZxWhGqVaDndjyX8PBd';
const btnFavorites = document.querySelector('#btnFavorites');
const btnGifGra = document.querySelector('#btnGifos');
const num = 0;
let totalGifs = [];
let gifParcial = [];
btn.addEventListener('click', obtenerUsuario);

function obtenerApi(user) {
    const url = `https://api.giphy.com/v1/gifs/search?q=${user}&api_key=${api_key}&limit=25`;

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

                totalGifs = data.data;
                // console.log(totalGifs);
                let posicionStart = 0;
                let positionEnd = 8;
                gifParcial = totalGifs.slice(posicionStart , positionEnd);
                // console.log(gifParcial);

                gifParcial.forEach(function(el) {                
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
                
                btnMore.addEventListener('click', (ev)=> {                    
                    // console.log('click');
                    // console.log(posicionStart);
                    // console.log(positionEnd);
                    console.log(totalGifs.length);
                    // if (positionEnd + 8 <= totalGifs.length) {
                        if (posicionStart + 8  <= totalGifs.length || positionEnd + 8 <= totalGifs.length) {
                        console.log('entra');
                        // console.log(posicionStart + 8);
                        console.log(positionEnd + 8);
                        gifParcial = totalGifs.slice(posicionStart + 8, positionEnd + 8 );
                        positionEnd += 8;
                        posicionStart += 8;

                        gifParcial.forEach(function(el) {                
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
                            caja1.appendChild(boxGif);
                        });   
                    } else {
                        console.log(totalGifs);
                    }

                })

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



function obtenerTrending() {
    const url = `https://api.giphy.com/v1/gifs/trending?&api_key=${api_key}&limit=20`;
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
                const imageBox = document.createElement('div');
                boxtrending.appendChild(imageBox);
                const image = document.createElement('img');
                image.src = el.images.downsized.url;
                image.classList.add('zoom-img');
                imageBox.appendChild(image);
                // imageBox.appendChild(imagen)
                // boxtrending.insertAdjacentElement('afterbegin', image);
            })
        })
        .catch((err) => {
            console.log(`${err}`);
        })
    
}


//Ventana Modal
boxtrending.addEventListener('click', ventanaModal);

function ventanaModal(e) {
    // console.log(e);
    e.preventDefault();

    // console.log(e.target.classList);
    if (e.target.classList.contains('zoom-img')) {
        const test = e.target.parentElement;
        // console.log(test);
        leerDatos(test);
        // re.style.pointerEvents = "none";
    }

    


}


function leerDatos(curso) {
    // console.log(curso)
    const infoImg = {
        imagen: curso.querySelector('.zoom-img').src
    };
    // console.log(infoImg);
    insertarImg(infoImg);
    
}

function insertarImg(infImg) {
    // console.log(infImg);
    // console.log(infImg.imagen);
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    // console.log(re.parentNode);
    caja.style.height = '5000' + "px";
    caja.classList.remove('caja');
    caja.classList.add('caja-off');
    contenedor = document.createElement('div');
    caja.appendChild(contenedor);
    contenedor.classList.add('zoom');
    cerrar = document.createElement('img');
    cerrar.setAttribute('src', './images/close.svg');
    cerrar.setAttribute('class', 'close');
    contenedor.appendChild(cerrar);

    let copyImgGif = document.createElement('div');
    copyImgGif.innerHTML = `
        <img src="${infImg.imagen}" class="zoom-img">
    `
    contenedor.appendChild(copyImgGif);




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
    fav.setAttribute('src', './images/icon-fav-hover.svg');
    fav.setAttribute('class', 'img-fav');
    contenedor2.appendChild(fav);
    contenedor4 = document.createElement('div');
    contenedor4.classList.add('box-img-download');
    contenedor2.appendChild(contenedor4);
    descarga = document.createElement('img');
    descarga.setAttribute('src', './images/icon-download.svg');
    descarga.setAttribute('class', 'img-download');
    contenedor4.appendChild(descarga);   


    //Cerrar ventana modal
    cerrar.addEventListener('click', function(ev){
        // console.log(contenedor);
        ev.preventDefault();
        // console.log('cerrar');
        // console.log(this.parentNode.parentNode);
        // // console.log(this.parentNode);
        // console.log(re);
        // console.log(re.parentNode);
        document.getElementsByTagName("html")[0].style.overflow = "unset";
        caja.classList.remove('caja-off');
        caja.classList.add('caja');
        // re.style.pointerEvents = 'auto';
        // padreImg.appendChild(re);
        // console.log(re);
        // console.log(re.parentNode);                    
        this.parentNode.remove();
        // contenedor.classList.add('error');

        location.reload();
        
    })


    // Al presionar como favorito Guardar en LS y recargar web    

    fav.addEventListener('click', imprimirFav);

    function imprimirFav(e) {
        // console.log(e);
        fav.style.background = 'url(./images/icon-fav-active.svg)';
        let element = document.createElement('div');
        element.style.height = '120px'
        let elementImg = document.createElement('img');
        // console.log(copyImgGif.firstElementChild); 
        elementImg.src = copyImgGif.firstElementChild.getAttribute('src');
        element.appendChild(elementImg);
        boxFavoritos.appendChild(element);

        // console.log(elementImg);
        guardarCursoLocalStorage(infImg);        
    }


}


//Almacena un favorito en LocalStorage
function guardarCursoLocalStorage(ls) {
    console.log(ls);
    let favoritos;
    // Toma el valor de una arreglo con datos de LS o vacio
    favoritos = obtenerCursosLocalStorage();
    // console.log(favoritos);

    // El git favorito seleccionado se agrega al arreglo (LS)
    // console.log(typeof(favoritos));
    // console.log(favoritos);
    favoritos.push(ls);

    localStorage.setItem('fav', JSON.stringify(favoritos));
}

//Obtiene Gifs del LS
function obtenerCursosLocalStorage() {
    let favoritosLS;

    //Comprobamos si hay algo en localStorage
    if (localStorage.getItem('fav') === null) {
        favoritosLS = [];
    } else {
        favoritosLS = JSON.parse(localStorage.getItem('fav'));
    }
    return favoritosLS;
}


// Imprime los gif seleccionados del local storage en el pagina de favoritos
function leerLocalStorage() {
    let favoritosLS;

    favoritosLS = obtenerCursosLocalStorage();
    // console.log(favoritosLS);

    //Si no hay gifs favortios se implementa vista default
    if (favoritosLS.length != 0) {  
        btnFavorites.classList.remove('error');      
        boxFavoritos.classList.add('card-favoritos');
        boxFavoritos.classList.remove('card-Sinfavoritos');
        favoritosLS.forEach(function(infoFav){
            // console.log(infoFav.imagen);
            // Construir el template
            const box = document.createElement('div');
            box.innerHTML = `
                <img src="${infoFav.imagen}">        
            `;
            boxFavoritos.appendChild(box);
        })
    } else {
        // console.log('Esta Vaciooo'); 
        const errorBox = document.createElement('div');
        const errorImg = document.createElement('img');
        const errorText = document.createElement('p');

        btnFavorites.classList.add('error');


        errorImg.setAttribute('src', './images/icon-fav-sin-contenido.svg');
        errorText.innerText = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"';
        
        
        boxFavoritos.appendChild(errorBox);
        errorBox.appendChild(errorImg);
        errorBox.appendChild(errorText);
        boxFavoritos.classList.remove('card-favoritos');
        boxFavoritos.classList.add('card-Sinfavoritos');
    }

}


// Pagina mis Gifos
// const boxGifos = document.querySelector('.card-gifos');
// const btnGifos = document.querySelector('#btnGifos');






//Obtiene Gifs del LS
function obtenerCursosLocalStorage1() {
    let gifosLS;

    //Comprobamos si hay algo en localStorage
    if (localStorage.getItem('gifos') === null) {
        gifosLS = [];
    } else {
        gifosLS = JSON.parse(localStorage.getItem('gifos'));
    }
    return gifosLS;
}

// Imprime los gif seleccionados del local storage en el pagina de favoritos
function leerLocalStorage1() {
    let gifosLS;

    gifosLS = obtenerCursosLocalStorage1();
    // console.log(favoritosLS);

    //Si no hay Gifos grabados se implementa vista default
    if (gifosLS.length != 0) {  
        // console.log('ENTRA');
        btnGifGra.classList.remove('error');      
        boxGif.classList.add('card-gifos');
        boxGif.classList.remove('card-Sinfavoritos');
        gifosLS.forEach(function(infoGif){
            // console.log(infoFav.imagen);
            // Construir el template
            const box = document.createElement('div');
            box.setAttribute('class', 'containerGif');
            box.innerHTML = `
                <img src="${infoGif.imagen}">        
            `;
            boxGif.appendChild(box);
        })
    } else {
        // console.log('Esta Vaciooo'); 
        const errorBox = document.createElement('div');
        const errorImg = document.createElement('img');
        const errorText = document.createElement('p');

        btnGifGra.classList.add('error');


        errorImg.setAttribute('src', './images/icon-mis-gifos-sin-contenido.svg');
        errorImg.style.margin = '0';
        errorText.innerText = '¡Anímate a crear tu primer GIFO!';
        
        
        boxGif.appendChild(errorBox);
        errorBox.appendChild(errorImg);
        errorBox.appendChild(errorText);
        boxGif.classList.remove('card-favoritos');
        boxGif.classList.add('card-Sinfavoritos');
    }

}




