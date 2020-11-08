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
const api_key = 'aSfyIm4TLkXUqhZxWhGqVaDndjyX8PBd';
let downloadArrayTrending = [];
let downloadArraySearch= [];

// Mostrar Trending en pantalla principal
obtenerTrending();
// location.reload();
// // Al cargar el documento mostrar el localStorage
// document.addEventListener('DOMContentLoaded', leerLocalStorage);
document.addEventListener('DOMContentLoaded', leerLocalStorage1);







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
const btn = document.querySelector('#btnSearch');
const impresionError = document.querySelector('#error');
const titulo = document.querySelector('#titleError');
const tituloN = document.querySelector('#titleNoError');
const btnMore = document.querySelector('#btnMore');
const btnFavorites = document.querySelector('#btnFavorites');
const btnGifGra = document.querySelector('#btnGifos');
const num = 0;
let totalGifs = [];
let gifParcial = [];
const info = document.querySelector('#busqueda');

info.addEventListener('keyup', eventoClick);

function obtenerApi(user) {
    const url = `https://api.giphy.com/v1/gifs/search?q=${user}&api_key=${api_key}&limit=25`;
    // leerLocalStorage();
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
            let arraySearch = [];
            line.classList.remove('error');
            sectionGifs.classList.remove('error');
            impresionError.classList.add('error');
            if (data.data.length === 0) {
                // console.log('ERROR')
                throw new Error(' (data) No existe valor ingresado por el usuario');
            } else { 
                // console.log(data.data);
                data.data.forEach(element => {
                    // console.log(element.id);
                    arraySearch.push(element.id);
                });
                downloadArraySearch = data.data;
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
                    boxGif.classList.add('trending');

                    image.src = el.images.downsized.url;
                    image.classList.add('imgGif');
                    image.setAttribute('data-user', el.username);
                    image.setAttribute('data-title', el.title);
                    image.setAttribute('data-id', el.id);
                    
                    // title.textContent = el.title;
                    
                    boxGif.appendChild(image);
                    // boxGif.appendChild(title);
                    caja1.insertAdjacentElement('afterbegin', boxGif);                    

                    if (x.matches) {
                        const searchHov = document.createElement('div');
                        // const textHover = document.createElement('div');
                        searchHov.classList.add('searchHov');
                        // textHover.classList.add('text-hover');                    
                        boxGif.appendChild(searchHov);
                        
                        const box1 = document.createElement('div');
                        const img1 = document.createElement('img');
                        const box2 = document.createElement('div');
                        const img2 = document.createElement('img');
                        const box3 = document.createElement('div');
                        const img3 = document.createElement('img');
            
                        img1.setAttribute('src', '../images/icon-fav-hover.svg');
                        img1.classList.add('boxImg');
                        box1.appendChild(img1);                
                        box1.classList.add('containImg');
                        boxGif.appendChild(box1);


                        img2.setAttribute('src', '../images/icon-download.svg');
                        img2.classList.add('boxImg');
                        box2.appendChild(img2);
                        box2.classList.add('containImg');
                        box2.classList.add('containImg2');
                        boxGif.appendChild(box2);
            
            
                        img3.setAttribute('src', '../images/icon-max.svg');
                        img3.classList.add('boxImg');
                        img3.classList.add('boxImg3');
                        box3.appendChild(img3);
                        box3.classList.add('containImg');
                        box3.classList.add('containImg3');
                        boxGif.appendChild(box3);
            
                        const title = document.createElement('h3');
                        const text = document.createElement('p');
                        text.classList.add('text-gif');
                        title.classList.add('title-gif')
                        title.innerHTML = el.title;
                        text.innerHTML = el.username;
                        boxGif.appendChild(text);
                        boxGif.appendChild(title)

                        // Al presionar como favorito Guardar en LS 
                        img1.onclick = imprimirFav;
                        function imprimirFav(e) {
                            // e.preventDefault();
                            const validar = e.target
                            // console.log(validar)
                            // console.log(!validar.classList.contains('containImgActive'))
                            // console.log(!validar.classList.contains('imgActive'))
                            // console.log(validar.getAttribute('class'));
                            if (!validar.classList.contains('imgActive')) {                    
                                // console.log('entra');
                                // img1.setAttribute('src', '');
                                img1.classList.add('imgActive');
                                // img1.setAttribute('src', '../images/icon-fav-active.svg');
                                let element = document.createElement('div');
                                element.style.height = '200px'
                                let elementImg = document.createElement('img');
                                elementImg.src = image.getAttribute('src');
                                element.appendChild(elementImg);
                                // console.log(element);
                                boxFavoritos.appendChild(element);                    
                                // console.log(elementImg);
            
                                searchHov.classList.add('searchHovActive');
                                box1.classList.add('containImgActive');
                                box1.classList.add('hov-ls');
                                box2.classList.add('containImgActive');
                                box2.classList.add('containImg2Active');
                                box3.classList.add('containImgActive');
                                box3.classList.add('containImg3Active');
                                text.classList.add('text-gifActive');
                                title.classList.add('title-gifActive');
            
                                searchHov.classList.remove('searchHov');
                                box1.classList.remove('containImg');
                                box2.classList.remove('containImg');
                                box2.classList.remove('containImg2');
                                box3.classList.remove('containImg');
                                box3.classList.remove('containImg3');
                                text.classList.remove('text-gif');
                                title.classList.remove('title-gif');
                                // console.log(e.target.parentElement.parentElement);
                                box1.classList.add('hov-ls');
                                img1.classList.add('hovImg-ls');
                                if (e.target.classList.contains('hov-ls')) {
                                    const test = e.target.parentElement;
                                    const infImg = {
                                        imagen: test.querySelector('.imgGif').src,
                                        id: test.querySelector('.imgGif').getAttribute('data-id')
                                    };
                                    guardarGifLocalStorage(infImg);  
                                } else if (e.target.classList.contains('hovImg-ls')) {
                                    const test = e.target.parentElement.parentElement;
                                    // console.log(test);
                                    // console.log(test.querySelector('.imgGif'));
                                    const infImg = {
                                        imagen: test.querySelector('.imgGif').src,
                                        id: test.querySelector('.imgGif').getAttribute('data-id')
                                    };
                                    guardarGifLocalStorage(infImg);  
                                }                     
                            } else {    
                                img1.classList.remove('imgActive');
                                searchHov.classList.remove('searchHovActive');
                                box1.classList.remove('containImgActive');
                                box1.classList.remove('hov-ls');
                                box2.classList.remove('containImgActive');
                                box2.classList.remove('containImg2Active');
                                box3.classList.remove('containImgActive');
                                box3.classList.remove('containImg3Active');
                                text.classList.remove('text-gifActive');
                                title.classList.remove('title-gifActive');
                
                                searchHov.classList.add('searchHov');
                                box1.classList.add('containImg');
                                box2.classList.add('containImg');
                                box2.classList.add('containImg2');
                                box3.classList.add('containImg');
                                box3.classList.add('containImg3');
                                text.classList.add('text-gif');
                                title.classList.add('title-gif');
            
                                box1.classList.remove('hov-ls');
                                img1.classList.remove('hovImg-ls');
                                // console.log(validar.parentElement.parentElement);
                                const sinHov = validar.parentElement.parentElement.children[0];
                                // console.log(sinHov.getAttribute('data-id'));
                                actualizarSearchEnFavLocalStorage(sinHov.getAttribute('data-id'));                               
                            }                
                        }

                        img2.onclick = downloadGifSearch;
    
                        
                    }
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
                            boxGif.classList.add('trending');
        
                            image.src = el.images.downsized.url;
                            
                            image.classList.add('imgGif');
                            image.setAttribute('data-user', el.username);
                            image.setAttribute('data-title', el.title);
                            image.setAttribute('data-id', el.id);
                            
                            // title.textContent = el.title;
                            
                            boxGif.appendChild(image);
                            // boxGif.appendChild(title);
                            caja1.appendChild(boxGif);

                            if (x.matches) {
                                const searchHov = document.createElement('div');
                                // const textHover = document.createElement('div');
                                searchHov.classList.add('searchHov');
                                // textHover.classList.add('text-hover');                    
                                boxGif.appendChild(searchHov);
                                
                                const box1 = document.createElement('div');
                                const img1 = document.createElement('img');
                                const box2 = document.createElement('div');
                                const img2 = document.createElement('img');
                                const box3 = document.createElement('div');
                                const img3 = document.createElement('img');
                    
                                img1.setAttribute('src', '../images/icon-fav-hover.svg');
                                img1.classList.add('boxImg');
                                box1.appendChild(img1);                
                                box1.classList.add('containImg');
                                boxGif.appendChild(box1);
        
        
                                img2.setAttribute('src', '../images/icon-download.svg');
                                img2.classList.add('boxImg');
                                box2.appendChild(img2);
                                box2.classList.add('containImg');
                                box2.classList.add('containImg2');
                                boxGif.appendChild(box2);
                    
                    
                                img3.setAttribute('src', '../images/icon-max.svg');
                                img3.classList.add('boxImg');
                                img3.classList.add('boxImg3');
                                box3.appendChild(img3);
                                box3.classList.add('containImg');
                                box3.classList.add('containImg3');
                                boxGif.appendChild(box3);
                    
                                const title = document.createElement('h3');
                                const text = document.createElement('p');
                                text.classList.add('text-gif');
                                title.classList.add('title-gif')
                                title.innerHTML = el.title;
                                text.innerHTML = el.username;
                                boxGif.appendChild(text);
                                boxGif.appendChild(title)
        
                                // Al presionar como favorito Guardar en LS 
                                img1.onclick = imprimirFav;
                                function imprimirFav(e) {
                                    // e.preventDefault();
                                    const validar = e.target
                                    // console.log(validar)
                                    // console.log(!validar.classList.contains('containImgActive'))
                                    // console.log(!validar.classList.contains('imgActive'))
                                    // console.log(validar.getAttribute('class'));
                                    if (!validar.classList.contains('imgActive')) {                    
                                        // console.log('entra');
                                        // img1.setAttribute('src', '');
                                        img1.classList.add('imgActive');
                                        // img1.setAttribute('src', '../images/icon-fav-active.svg');
                                        let element = document.createElement('div');
                                        element.style.height = '200px'
                                        let elementImg = document.createElement('img');
                                        elementImg.src = image.getAttribute('src');
                                        element.appendChild(elementImg);
                                        // console.log(element);
                                        boxFavoritos.appendChild(element);                    
                                        // console.log(elementImg);
                    
                                        searchHov.classList.add('searchHovActive');
                                        box1.classList.add('containImgActive');
                                        box1.classList.add('hov-ls');
                                        box2.classList.add('containImgActive');
                                        box2.classList.add('containImg2Active');
                                        box3.classList.add('containImgActive');
                                        box3.classList.add('containImg3Active');
                                        text.classList.add('text-gifActive');
                                        title.classList.add('title-gifActive');
                    
                                        searchHov.classList.remove('searchHov');
                                        box1.classList.remove('containImg');
                                        box2.classList.remove('containImg');
                                        box2.classList.remove('containImg2');
                                        box3.classList.remove('containImg');
                                        box3.classList.remove('containImg3');
                                        text.classList.remove('text-gif');
                                        title.classList.remove('title-gif');
                                        // console.log(e.target.parentElement.parentElement);
                                        box1.classList.add('hov-ls');
                                        img1.classList.add('hovImg-ls');
                                        if (e.target.classList.contains('hov-ls')) {
                                            const test = e.target.parentElement;
                                            const infImg = {
                                                imagen: test.querySelector('.imgGif').src,
                                                id: test.querySelector('.imgGif').getAttribute('data-id')
                                            };
                                            guardarGifLocalStorage(infImg);  
                                        } else if (e.target.classList.contains('hovImg-ls')) {
                                            const test = e.target.parentElement.parentElement;
                                            // console.log(test);
                                            // console.log(test.querySelector('.imgGif'));
                                            const infImg = {
                                                imagen: test.querySelector('.imgGif').src,
                                                id: test.querySelector('.imgGif').getAttribute('data-id')
                                            };
                                            guardarGifLocalStorage(infImg);  
                                        }                     
                                    } else {    
                                        img1.classList.remove('imgActive');
                                        searchHov.classList.remove('searchHovActive');
                                        box1.classList.remove('containImgActive');
                                        box1.classList.remove('hov-ls');
                                        box2.classList.remove('containImgActive');
                                        box2.classList.remove('containImg2Active');
                                        box3.classList.remove('containImgActive');
                                        box3.classList.remove('containImg3Active');
                                        text.classList.remove('text-gifActive');
                                        title.classList.remove('title-gifActive');
                        
                                        searchHov.classList.add('searchHov');
                                        box1.classList.add('containImg');
                                        box2.classList.add('containImg');
                                        box2.classList.add('containImg2');
                                        box3.classList.add('containImg');
                                        box3.classList.add('containImg3');
                                        text.classList.add('text-gif');
                                        title.classList.add('title-gif');
                    
                                        box1.classList.remove('hov-ls');
                                        img1.classList.remove('hovImg-ls');
                                        // console.log(validar.parentElement.parentElement);
                                        const sinHov = validar.parentElement.parentElement.children[0];
                                        // console.log(sinHov.getAttribute('data-id'));
                                        actualizarSearchEnFavLocalStorage(sinHov.getAttribute('data-id'));                               
                                    }                
                                }

                                img2.onclick = downloadGifSearch;
            
                                
                            }
                            leerLocalStorage();
                        });   
                    } else {
                        console.log(totalGifs);
                    }

                })
                
                
            }
            searchLS(arraySearch);
            leerLocalStorage();

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

function searchLS(e) {
    // let test;
    // test = obtenerLS();
    // console.log(text);
    // test.push(e);
    localStorage.setItem('search', JSON.stringify(e));
}

//Obtiene Gifs del LS
function obtenerSearchLS() {
    let test1;
    if (localStorage.getItem('search') === null) {
        test1 = [];
    } else {
        test1 = JSON.parse(localStorage.getItem('search'));
    }
    return test1;
}

function actualizarSearchEnFavLocalStorage(ls) {
    // console.log(ls);
    let favoritos;    
    favoritos = obtenerGifLocalStorage();
    // console.log(favoritos);
    for (let i = favoritos.length; i--;) {
        // console.log(favoritos[i].id);
        if (favoritos[i].id === ls) {
            favoritos.splice(i, 1);
        }
        
    }
    // console.log(favoritos);
    // Se actualiza el LS de favoritos si el gif no es favorito
    localStorage.setItem('fav', JSON.stringify(favoritos));
    // location.reload(); // No olvidar activar
}

function eventoClick() {
    
    // console.log(info.value);
    // console.log(info);
    const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${info.value}`;

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
        // console.log(data.data.length);
        // console.log(data.data[0].name);
        const boxInp = document.querySelector('.inp-search');
        const boxInpContainer = document.querySelector('.inp-search-container');
        const boxComplete = document.createElement('div');
        const imgBoxSearch = document.createElement('div');
        const imgSearch = document.createElement('img');
        
        if (!info.value == "") {
            // console.log('No vacio');   
            btn.addEventListener('click', cleanSearch);
            boxInp.classList.remove('inp-search-inactive');
            boxInp.classList.add('inp-search-active');            
            boxComplete.classList.add('list-search');
            
            // boxInp.removeChild(boxInp.lastElementChild);
            if (document.querySelector('.list-search')) {
                // console.log('existe')
                boxInp.removeChild(document.querySelector('.list-search'));
            }    
            boxInp.appendChild(boxComplete);

            for (let i = 0; i < data.data.length - 1; i++) {
                const boxList = document.createElement('li');                
                boxList.innerText = data.data[i].name;
                // boxList.classList.add('items-search');
                boxComplete.appendChild(boxList);


                boxList.addEventListener('click', searchClick);
            
            }

            function cleanSearch() {
                info.value = "";
                boxInp.classList.remove('inp-search-active');
                boxInp.classList.add('inp-search-inactive');
                document.querySelector('#search-img').setAttribute('src', './images/icon-search.svg');
                // boxInp.removeChild(document.querySelector('.list-search'));
                if (document.querySelector('body').classList.contains('dark')) {
                    document.querySelector('#search-img').style.content = 'url(./images/icon-search-modo-noct.svg)';
                }
            }
            
            
        } else {
            console.log('Si vacio');
            boxInp.classList.remove('inp-search-active');
            boxInp.classList.add('inp-search-inactive');
            boxInp.removeChild(document.querySelector('.list-search'));
            // imgBoxSearch.setAttribute('id', 'btnSearch');
            // boxInp.appendChild(imgBoxSearch);
            // imgSearch.setAttribute('src', './images/icon-search.svg')
            // imgBoxSearch.appendChild(imgSearch);
        }
    })
    .catch((err) => {
        console.log(`${err}`);
    })
    

}

function searchClick(e) {
    // console.log(e);
    // console.log(info);
    info.value = e.path[0].firstChild.data;
    if (document.querySelector('.inp-search').classList.contains('inp-search-active') && !document.querySelector('body').classList.contains('dark')) {
        // console.log('CLARO');
        document.querySelector('.inp-search').classList.remove('inp-search-active');
        document.querySelector('.inp-search').classList.add('inp-search-inactive');
        // document.querySelector('.inp-search').removeChild(document.querySelector('.list-search'));
        document.querySelector('#search-img').setAttribute('src', './images/close.svg');
    } else {
        // console.log('OSCURO');
        document.querySelector('.inp-search').classList.remove('inp-search-active');
        document.querySelector('.inp-search').classList.add('inp-search-inactive');
        // document.querySelector('.inp-search').removeChild(document.querySelector('.list-search'));
        document.querySelector('#search-img').setAttribute('src', './images/close.svg');
        document.querySelector('#search-img').style.content = 'url(./images/close-modo-noct.svg)';
    }
    obtenerApi(e.path[0].firstChild.data);
}

//Imprimir Trending

async function obtenerTrending() {
    const url = `https://api.giphy.com/v1/gifs/trending?&api_key=${api_key}&limit=20`;
    const response = await fetch(url);
    let trending = await response.json();
    // console.log(trending.data);
    let arrayGif = [];
    downloadArrayTrending = trending.data;
    await trending.data.forEach((el) => {
        // console.log(el);                                    
        // console.log(el.username);                                    
        // console.log(el.title);                                    
        // console.log(el.id);                                    
        const imageBox = document.createElement('div');
        imageBox.classList.add('trending');
        boxtrending.appendChild(imageBox);
        const image = document.createElement('img');
        image.src = el.images.downsized.url;
        image.classList.add('zoom-img');
        image.setAttribute('data-user', el.username);
        image.setAttribute('data-title', el.title);
        image.setAttribute('data-id', el.id);
        imageBox.appendChild(image);
        arrayGif.push(el.id);
        // console.log(arrayGif);
        // testLS(el.id);
        // Hover a los Gifs-Trending
        if (x.matches) {
            const hover = document.createElement('div');
            const textHover = document.createElement('div');
            hover.classList.add('hover');
            textHover.classList.add('text-hover');                    
            imageBox.appendChild(hover);
            // imageBox.appendChild(textHover);

            

            const box1 = document.createElement('div');
            const img1 = document.createElement('img');
            const box2 = document.createElement('div');
            const img2 = document.createElement('img');
            const box3 = document.createElement('div');
            const img3 = document.createElement('img');

            img1.setAttribute('src', '../images/icon-fav-hover.svg');
            img1.classList.add('boxImg');
            box1.appendChild(img1);                
            box1.classList.add('containImg');
            imageBox.appendChild(box1);


            
            img2.setAttribute('src', '../images/icon-download.svg');
            img2.classList.add('boxImg');
            box2.appendChild(img2);
            box2.classList.add('containImg');
            box2.classList.add('containImg2');
            imageBox.appendChild(box2);


            img3.setAttribute('src', '../images/icon-max.svg');
            img3.classList.add('boxImg');
            img3.classList.add('boxImg3');
            box3.appendChild(img3);
            box3.classList.add('containImg');
            box3.classList.add('containImg3');
            imageBox.appendChild(box3);

            const title = document.createElement('h3');
            const text = document.createElement('p');
            text.classList.add('text-gif');
            title.classList.add('title-gif')
            title.innerHTML = el.title;
            text.innerHTML = el.username;
            imageBox.appendChild(text);
            imageBox.appendChild(title);


            // Al presionar como favorito Guardar en LS 
            img1.onclick = imprimirFav;
            function imprimirFav(e) {
                // e.preventDefault();
                const validar = e.target
                // console.log(validar)
                // console.log(!validar.classList.contains('containImgActive'))
                // console.log(!validar.classList.contains('imgActive'))
                // console.log(validar.getAttribute('class'));
                if (!validar.classList.contains('imgActive')) {                    
                    // console.log('entra');
                    // img1.setAttribute('src', '');
                    img1.classList.add('imgActive');
                    // img1.setAttribute('src', '../images/icon-fav-active.svg');
                    let element = document.createElement('div');
                    element.style.height = '200px'
                    let elementImg = document.createElement('img');
                    elementImg.src = image.getAttribute('src');
                    element.appendChild(elementImg);
                    // console.log(element);
                    boxFavoritos.appendChild(element);                    
                    // console.log(elementImg);

                    hover.classList.add('hoverActive');
                    box1.classList.add('containImgActive');
                    box1.classList.add('hov-ls');
                    box2.classList.add('containImgActive');
                    box2.classList.add('containImg2Active');
                    box3.classList.add('containImgActive');
                    box3.classList.add('containImg3Active');
                    text.classList.add('text-gifActive');
                    title.classList.add('title-gifActive');

                    hover.classList.remove('hover');
                    box1.classList.remove('containImg');
                    box2.classList.remove('containImg');
                    box2.classList.remove('containImg2');
                    box3.classList.remove('containImg');
                    box3.classList.remove('containImg3');
                    text.classList.remove('text-gif');
                    title.classList.remove('title-gif');
                    // console.log(e.target.parentElement.parentElement);
                    box1.classList.add('hov-ls');
                    img1.classList.add('hovImg-ls');
                    if (e.target.classList.contains('hov-ls')) {
                        const test = e.target.parentElement;
                        const infImg = {
                            imagen: test.querySelector('.zoom-img').src,
                            id: test.querySelector('.zoom-img').getAttribute('data-id')
                        };
                        guardarGifLocalStorage(infImg);  
                    } else if (e.target.classList.contains('hovImg-ls')) {
                        const test = e.target.parentElement.parentElement;
                        const infImg = {
                            imagen: test.querySelector('.zoom-img').src,
                            id: test.querySelector('.zoom-img').getAttribute('data-id')
                        };
                        guardarGifLocalStorage(infImg);  
                    }                     
                } else {    
                    img1.classList.remove('imgActive');
                    hover.classList.remove('hoverActive');
                    box1.classList.remove('containImgActive');
                    box1.classList.remove('hov-ls');
                    box2.classList.remove('containImgActive');
                    box2.classList.remove('containImg2Active');
                    box3.classList.remove('containImgActive');
                    box3.classList.remove('containImg3Active');
                    text.classList.remove('text-gifActive');
                    title.classList.remove('title-gifActive');
    
                    hover.classList.add('hover');
                    box1.classList.add('containImg');
                    box2.classList.add('containImg');
                    box2.classList.add('containImg2');
                    box3.classList.add('containImg');
                    box3.classList.add('containImg3');
                    text.classList.add('text-gif');
                    title.classList.add('title-gif');

                    box1.classList.remove('hov-ls');
                    img1.classList.remove('hovImg-ls');
                    // console.log(validar.parentElement.parentElement);
                    const sinHov = validar.parentElement.parentElement.children[0];
                    // console.log(sinHov.getAttribute('data-id'));
                    actualizarGifLocalStorage(sinHov.getAttribute('data-id'));

                    
                }                
            }

            img2.onclick = downloadGifTrending;
        }

    })
    leerLocalStorage();
    testLS(arrayGif);
}

function actualizarGifLocalStorage(ls) {
    console.log(ls);
    let favoritos;    
    favoritos = obtenerGifLocalStorage();
    // console.log(favoritos);
    for (let i = favoritos.length; i--;) {
        // console.log(favoritos[i].id);
        if (favoritos[i].id === ls) {
            favoritos.splice(i, 1);
        }
        
    }
    // console.log(favoritos);
    // Se actualiza el LS de favoritos si el gif no es favorito
    localStorage.setItem('fav', JSON.stringify(favoritos));
    location.reload(); // No olvidar activar
}

function testLS(e) {
    // let test;
    // test = obtenerLS();
    // console.log(text);
    // test.push(e);
    localStorage.setItem('trending', JSON.stringify(e));
}

//Obtiene Gifs del LS
function obtenerLS() {
    let test1;
    if (localStorage.getItem('trending') === null) {
        test1 = [];
    } else {
        test1 = JSON.parse(localStorage.getItem('trending'));
    }
    return test1;
}

// Función para descargar GIFS en la seccion de Trending
function downloadGifTrending(url) {
    let btnDownload = url.target.parentElement.parentElement.children[0].getAttribute('data-id');
    let btnDownloadM = url.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0];
    console.log(btnDownloadM);
    downloadArrayTrending.map(async function (download) {
        // console.log(gif);
        if (download.id === btnDownload) {
            let descargar = await fetch(download.images.downsized.url)
                .then((success) => {
                    // console.log(success);
                    success.blob()
                        .then((data) => {
                            // console.log(data);
                            let tagDownload = document.createElement("a");
                            tagDownload.href = URL.createObjectURL(data);
                            tagDownload.download = 'Mi-Gif';
                            tagDownload.click();
                    });
                });
        }
    });
}

// Función para descargar GIFS en la seccion de Trending-Mobile
function downloadGifTrendingMobile(url) {
    let btnDownload = url.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].getAttribute('src');
    console.log(btnDownload);
    downloadArrayTrending.map(async function (download) {
        // console.log(gif);
        if (download.images.downsized.url === btnDownload) {
            validator = true;
            let descargar = await fetch(download.images.downsized.url)
                .then((success) => {
                    // console.log(success);
                    success.blob()
                        .then((data) => {
                            // console.log(data);
                            let tagDownload = document.createElement("a");
                            tagDownload.href = URL.createObjectURL(data);
                            tagDownload.download = 'Mi-Gif';
                            tagDownload.click();
                    });
                });
        }
    });
}

// Función para descargar GIFS en la seccion de Busqueda
function downloadGifSearch(url) {
    let btnDownload = url.target.parentElement.parentElement.children[0].getAttribute('data-id');
    downloadArraySearch.map(async function (download) {
        // console.log(gif);
        if (download.id === btnDownload) {
            let descargar = await fetch(download.images.downsized.url)
                .then((success) => {
                    // console.log(success);
                    success.blob()
                        .then((data) => {
                            // console.log(data);
                            let tagDownload = document.createElement("a");
                            tagDownload.href = URL.createObjectURL(data);
                            tagDownload.download = 'Mi-Gif';
                            tagDownload.click();
                    });
                });
        }
    });
}
// // Función para descargar GIFS en la seccion de Busqueda-Mobile
// function downloadGifSearchMobile(url) {
//     let btnDownload = url.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].getAttribute('src');
//     console.log(btnDownload);
//     downloadArraySearch.map(async function (download) {
//         // console.log(gif);
//         if (download.images.downsized.url === btnDownload) {
//             let descargar = await fetch(download.images.downsized.url)
//                 .then((success) => {
//                     // console.log(success);
//                     success.blob()
//                         .then((data) => {
//                             // console.log(data);
//                             let tagDownload = document.createElement("a");
//                             tagDownload.href = URL.createObjectURL(data);
//                             tagDownload.download = 'Mi-Gif';
//                             tagDownload.click();
//                     });
//                 });
//         }
//     });
// }


//Ventana Modal
// console.log(caja1);
caja1.addEventListener('click', ventanaModal);
boxtrending.addEventListener('click', ventanaModal);

function ventanaModal(e) {
    // console.log(e.target);
    e.preventDefault();

    // console.log(e.target);
    if (e.target.classList.contains('zoom-img')) {
        const test = e.target.parentElement;
        // console.log(test);
        leerDatos(test);
        // re.style.pointerEvents = "none";
    } else if (e.target.classList.contains('imgGif')) {
        const test = e.target.parentElement;
        // console.log(test)
        leerDatos(test);
    } else if (e.target.classList.contains('containImg3')) {
        const test = e.target.parentElement;
        // console.log(test)
        leerDatos(test);
    } else if (e.target.classList.contains('boxImg3')) {
        const test = e.target.parentElement.parentElement;
        // console.log(test)
        leerDatos(test);
    }   

    


}


function leerDatos(gif) {
    // console.log(gif.querySelector('.zoom-img'));
    if (gif.querySelector('.zoom-img')) {
        let user = gif.querySelector('.zoom-img').getAttribute('data-user');
        // console.log(user);
        let title = gif.querySelector('.zoom-img').getAttribute('data-title');
        // console.log(title);
        const infoImg = {
            imagen: gif.querySelector('.zoom-img').src
        };
        insertarImg(infoImg, user, title);
    } else {
        let user = gif.querySelector('.imgGif').getAttribute('data-user');
        // console.log(user);
        let title = gif.querySelector('.imgGif').getAttribute('data-title');
        // console.log(title);
        const infoImg = {
            imagen: gif.querySelector('.imgGif').src
        };
        insertarImg(infoImg, user, title);
    }
    
    
}

function insertarImg(infImg,user,title) {
    if (x.matches) {
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
        text1 = document.createElement('p')
        text1.innerText = user;
        contenedor3.appendChild(text1);
        text = document.createElement('h3')
        text.innerText = title;
        contenedor3.appendChild(text);
    } else {
        // console.log(infImg);
        // console.log(user);
        // console.log(infImg.imagen);
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        // console.log(re.parentNode);
        // caja.style.display = 'block';
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
            <img src="${infImg.imagen}" class="zoom-img" data-title="${title}">
        `
        contenedor.appendChild(copyImgGif);
        contenedor5 = document.createElement('div');
        contenedor5.classList.add('container');
        contenedor.appendChild(contenedor5);
        contenedor3 = document.createElement('div');
        contenedor3.classList.add('container-text');
        contenedor5.appendChild(contenedor3)
        text1 = document.createElement('p')
        text1.innerText = user;
        contenedor3.appendChild(text1);
        text = document.createElement('h3')
        text.innerText = title;
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
        // descarga.onclick = downloadGifSearchMobile;
        descarga.onclick = downloadGifTrendingMobile;
        // Al presionar como favorito Guardar en LS  
        fav.addEventListener('click', imprimirFav);

        // // Al presionar como favorito Guardar en LS  
        // fav.addEventListener('click', imprimirFav);
        function imprimirFav(e) {
            console.log(e.target);
            if (!e.target.classList.contains('active-mobile')) {
                // console.log('SI');
                fav.classList.add('active-mobile');
                fav.style.content = 'url(./images/icon-fav-active.svg)';
                let element = document.createElement('div');
                element.style.height = '120px'
                let elementImg = document.createElement('img');
                // console.log(copyImgGif.firstElementChild); 
                elementImg.src = copyImgGif.firstElementChild.getAttribute('src');
                element.appendChild(elementImg);
                boxFavoritos.appendChild(element);
                // console.log(elementImg);
                guardarGifLocalStorage(infImg);
            } else {
                fav.classList.remove('active-mobile');
                fav.style.content = 'url(./images/icon-fav-hover.svg)';
            }
                 
        }
    }

   


    //Cerrar ventana modal y recarga web
    cerrar.addEventListener('click', function(ev){
        // console.log(contenedor);
        // ev.preventDefault();
        // console.log('cerrar');
        // console.log(this.parentNode.parentNode);
        // // console.log(this.parentNode);
        // console.log(re);
        // console.log(re.parentNode);
        document.getElementsByTagName("html")[0].style.overflow = "unset";
        caja.classList.remove('caja-off');
        // caja.style.display = 'none';
        caja.classList.add('caja');
        // re.style.pointerEvents = 'auto';
        // padreImg.appendChild(re);
        // console.log(re);
        // console.log(re.parentNode);                    
        this.parentNode.remove();
        // contenedor.classList.add('error');

        // location.reload();
        
    })





}


//Almacena un favorito en LocalStorage
function guardarGifLocalStorage(ls) {
    // console.log(ls);
    let favoritos;
    // Toma el valor de una arreglo con datos de LS o vacio
    favoritos = obtenerGifLocalStorage();
    // console.log(favoritos);

    // El git favorito seleccionado se agrega al arreglo (LS)
    // console.log(typeof(favoritos));
    // console.log(favoritos);
    favoritos.push(ls);

    localStorage.setItem('fav', JSON.stringify(favoritos));
}

//Obtiene Gifs del LS
function obtenerGifLocalStorage() {
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
    let trendingLS;
    let searchLS;

    favoritosLS = obtenerGifLocalStorage();
    trendingLS = obtenerLS();
    searchLS = obtenerSearchLS();
    // console.log(favoritosLS);
    // console.log(trendingLS);

    // trendingLS.forEach(element => {
    //     console.log(element.id);
    // });

    //Si no hay gifs favortios se implementa vista default
    if (favoritosLS.length != 0) {  
        btnFavorites.classList.remove('error');      
        boxFavoritos.classList.add('card-favoritos');
        boxFavoritos.classList.remove('card-Sinfavoritos');
        favoritosLS.forEach(function(infoFav, i){
            // console.log(infoFav.id);
            // Construir el template
            const box = document.createElement('div');
            box.innerHTML = `
                <img src="${infoFav.imagen}">        
            `;
            boxFavoritos.appendChild(box);

            if (x.matches) {
                trendingLS.forEach((element) => {
                    // console.log(element.id);
                    if (element === infoFav.id) {
                        // console.log('SI');
                        // console.log(element);
                        // console.log(i);
                        const gif =  document.querySelectorAll('.zoom-img');
                        // console.log(gif);
                        gif.forEach(element => {
                            // console.log(element.getAttribute('data-id'));
                            let domTrending = element;
                            // let domTrending = element.getAttribute('data-id');
                            if (infoFav.id == domTrending.getAttribute('data-id')) {
                                // console.log(domTrending);
                                // console.log(domTrending.parentElement);
                                const hovDiv = domTrending.parentElement.children[1];
                                // console.log(hovDiv);
                                hovDiv.classList.add('hoverActive');
                                const hovContain = domTrending.parentElement.children[2];
                                hovContain.classList.add('containImgActive');
                                hovContain.classList.add('hov-ls');
                                const hovImg = domTrending.parentElement.children[2].children[0];
                                hovImg.classList.add('imgActive');
                                const hovContain2 = domTrending.parentElement.children[3];
                                hovContain2.classList.add('containImgActive');
                                hovContain2.classList.add('containImg2Active');
                                const hovContain3 = domTrending.parentElement.children[4];
                                hovContain3.classList.add('containImgActive');
                                hovContain3.classList.add('containImg3Active');
                                const hovText = domTrending.parentElement.children[5];
                                hovText.classList.add('text-gifActive');
                                const hovTitle = domTrending.parentElement.children[6];
                                hovTitle.classList.add('title-gifActive');
                            }
                        });
                    }    
                });                
            } else {
                // trendingLS.forEach((element) => {
                //     // console.log(element.id);
                //     if (element === infoFav.id) {
                //         // console.log('SI');
                //         const gif =  document.querySelectorAll('.zoom-img');
                //         // console.log(gif);
                //         gif.forEach(element => {
                //             // console.log(element.getAttribute('data-id'));
                //             let domTrending = element;
                //             // let domTrending = element.getAttribute('data-id');
                //             if (infoFav.id == domTrending.getAttribute('data-id')) {
                //                 // console.log(domTrending);
                //                 console.log(infoFav.id)
                //             }
                //         });
                //     }    
                // });  
            }
            
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

    if (x.matches) {
        favoritosLS.forEach(fav => {
            searchLS.forEach((search) => {
                // console.log(fav.id);
                // console.log(search);
                if (search === fav.id) {
                    // console.log('SI');
                    // console.log(element);
                    // console.log(i);
                    const gif =  document.querySelectorAll('.imgGif');
                    // console.log(gif);
                    gif.forEach(element => {
                        // console.log(element.getAttribute('data-id'));
                        let domTrending = element;
                        // let domTrending = element.getAttribute('data-id');
                        if (fav.id == domTrending.getAttribute('data-id')) {
                            // console.log(domTrending);
                            // console.log(domTrending.parentElement);
                            const hovDiv = domTrending.parentElement.children[1];
                            // console.log(hovDiv);
                            hovDiv.classList.add('searchHovActive');
                            const hovContain = domTrending.parentElement.children[2];
                            hovContain.classList.add('containImgActive');
                            hovContain.classList.add('hov-ls');
                            const hovImg = domTrending.parentElement.children[2].children[0];
                            hovImg.classList.add('imgActive');
                            const hovContain2 = domTrending.parentElement.children[3];
                            hovContain2.classList.add('containImgActive');
                            hovContain2.classList.add('containImg2Active');
                            const hovContain3 = domTrending.parentElement.children[4];
                            hovContain3.classList.add('containImgActive');
                            hovContain3.classList.add('containImg3Active');
                            const hovText = domTrending.parentElement.children[5];
                            hovText.classList.add('text-gifActive');
                            const hovTitle = domTrending.parentElement.children[6];
                            hovTitle.classList.add('title-gifActive');
                        }
                    });
                }    
            });
        });
                        
    }

}

// Pagina mis Gifos

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

// Imprime los gif seleccionados del local storage en el pagina de MisGifos
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


//Carousel
const flechaIzquierda = document.querySelector('.left-gifos');
const flechaDerecha = document.querySelector('.rigth-gifos');

flechaDerecha.addEventListener('click', () => {
    padreImg.scrollLeft += padreImg.offsetWidth = 379;
})

flechaIzquierda.addEventListener('click', () => {
    padreImg.scrollLeft -= padreImg.offsetWidth = 379;
})




