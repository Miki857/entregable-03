//cities -> Array:
    // 0: Object { id: 1, name: "Earth (C-137)", type: "Planet", … }
    // 1: Object { id: 2, name: "Abadango", type: "Cluster", … }
    // 2: Object { id: 3, name: "Citadel of Ricks", type: "Space station", … }
    // 3: Object { id: 4, name: "Worldender's lair", type: "Planet", … }

const autoComplete = (cities, type) => {
    let availableKeyword = [];//Lista de posibles Match.
    cities.map((city) => {
        availableKeyword.push(city.name);//Guardamos el nombre.
    });
    const searchBox = document.querySelector(".search-box_" + type);//El <div> que contiene la <ul>
    const inputBox = document.getElementById("input-box_" + type);//El input donde el user escribe el Lugar.
    const ul = document.querySelector(".search_ul_" + type);//El input donde el user escribe el Lugar.

    inputBox.onkeyup = () => {//Cada que el usuario tipee algun caracter.
        //TAREAS:
        //1.Hacer visible el <ul>.
        //2.Hacer invisible el <ul> en caso el usuario borre todo el contenido.
        //3.Ocultar los <ul> de los otros inputs.
        //4.Hacer invisible el <ul> en caso no haya Match. De otra forma, aparece el ul en forma de linea.

        let result = [];//Aqui guardaremos los posibles resultados.
        let input = inputBox.value;

        if(input.length){//Siempre que input tenga algun valor.
            ul.style.display = "block";//1.
            result = availableKeyword.filter((k) => {//Le agregamos a result las opciones que contengan los que el user tipeo.
                return k.toLocaleLowerCase().includes(input.toLocaleLowerCase());
            });
        }else{
            ul.style.display = "none";//2.
        }
        
        document.querySelector(".search_ul_char").style.display = "none";//3.

        if(result.length){//4.
            display(result);//Creamos un nuevo UL y los agregamos.
        }else{
            ul.style.display = "none";//4.
        }
    }

    inputBox.onfocusout = () => {
        //TAREA:
        //Cada que el input pierda el "focus". Se deve ocultar el <ul>.
        ul.style.display = "none";
    }

    function display(result){
        const content = result.map((list) => {//Creamos una lista de <li>:
            const li = document.createElement("li");//Creamos el <li>.
            li.innerHTML = list;//Le agregamos su texto.
            li.addEventListener("click", () => {//Le agregamos un eventoOnClick.
                //TAREAS: 
                //1.Agregar el contenido del <li> al input.
                //2.Hacer INVISIBLE el <ul>. 
                console.log(61416516)
                inputBox.value = list;//1.
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