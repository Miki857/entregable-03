// cities -> Array:
//     0: Object { id: 1, name: "Rick Sanchez", status: "Alive", … }
//         created: "2017-11-04T18:48:46.250Z"
//         episode: Array(51) [ "https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2", "https://rickandmortyapi.com/api/episode/3", … ]
//         gender: "Male"
//         id: 1
//         image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
//         location: Object { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" }
//         name: "Rick Sanchez"
//         origin: Object { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" }
//         species: "Human"
//         status: "Alive"
//         type: ""
//         url: "https://rickandmortyapi.com/api/character/1"

const autoComplete = (cities, type) => {
    let availableKeyword = [];//Lista de posibles Match.
    cities.map((city) => {
        availableKeyword.push([city.name, city.id, city.image]);//Guardamos el nombre con el ID.
    });
    const searchBox = document.querySelector(".search-box_" + type);//El <div> que contiene la <ul>
    const inputBox = document.getElementById("input-box_" + type);//El input donde el user escribe el Lugar.
    const ul = document.querySelector(".search_ul_" + type);//El input donde el user escribe el Lugar.

    inputBox.onkeyup = () => {//Cada que el usuario tipee algun caracter.
        //TAREAS:
        //1.Hacer visible el <ul>.
        //2.Hacer invisible el <ul> en caso el usuario borre todo el contenido.
        //3.Ocultar los <ul> de los otros inputs.
        //4.Hacer invisible el <ul> en caso no haya Match.

        let result = [];//Aqui guardaremos los posibles resultados.
        let input = inputBox.value;

        if(input.length){//Siempre que input tenga algun valor.
            ul.style.display = "block";//1.
            result = availableKeyword.filter((k) => {//Le agregamos a result las opciones que contengan los que el user tipeo.
                return k[0].toLocaleLowerCase().includes(input.toLocaleLowerCase());
            });
        }else{
            ul.style.display = "none";//2.
        }
        document.querySelector(".search_ul_city").style.display = "none";//3.

        if(result.length){//4.
            display(result);//Creamos un nuevo UL y los agregamos.
        }else{
            ul.style.display = "none";//4.
        }
    }

    ul.onmouseleave = (event) => {
        console.log(event)
        ul.style.display = "none";
    }

    function display(result){
        const content = result.map((list) => {//Creamos una lista de <li>:
            const li = document.createElement("li");//Creamos el <li>.
            li.classList.add("flex");
            li.classList.add("align-center");
            li.classList.add("gap-01");
            const p = document.createElement("p");//Creamos el <p> que lleva el nombre del Character.
            p.innerHTML = list[0] + " Universo " + list[1];//Le agregamos su texto.

            const img = document.createElement("img");//Creamos el <img> icno del character.
            img.src = list[2];
            img.width = "70";
            img.style.borderRadius = "50%";

            li.appendChild(img);
            li.appendChild(p);

            li.addEventListener("click", () => {//Le agregamos un eventoOnClick.
                //TAREAS: 
                //1.Agregar el contenido del <li> al input.
                //2.Hacer INVISIBLE el <ul>. 
                inputBox.value = list[0] + " Universo " + list[1];//1.
                ul.style.display = "none";//2.
            })
            return li;
        });

        //Removemos todos los <li> del <ul>:
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        //Agregamos los nuevos <li> al <ul>:
        for(const li of content){
            ul.appendChild(li);
        }
        searchBox.appendChild(ul);
    }
}

export default autoComplete