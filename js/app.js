let caja = document.querySelector('.caja');
let padreImg = document.querySelector('.list-gifos');
let imagen = document.querySelectorAll('.zoom-img');
let contenedor, contenedor2, contenedor3, contenedor4, contenedor5;
let text;
let cerrar, fav, descarga;

console.log(imagen);

imagen.forEach(re => {
    re.addEventListener('click', function(ev, index) {
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