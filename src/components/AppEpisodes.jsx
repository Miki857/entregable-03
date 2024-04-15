import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios';
import Pagination from './Pagination';
import Header from './Header';
import Episode from './Episode';

// 'episodes' tiene el siguiente esquema -> Array:
//     0: Object { id: 1, name: "Pilot", air_date: "December 2, 2013", … }
    //     air_date: "December 2, 2013"
    //     characters: Array(19) [ "https://rickandmortyapi.com/api/character/1", "https://rickandmortyapi.com/api/character/2", "https://rickandmortyapi.com/api/character/35", … ]
    //     created: "2017-11-10T12:56:33.798Z"
    //     episode: "S01E01"
    //     id: 1
    //     name: "Pilot"
    //     url: "https://rickandmortyapi.com/api/episode/1"

const AppEpisodes = () => {
    const [url, setURL] = useState("https://rickandmortyapi.com/api/episode");
    const [episodes, setEpisodes] = useState([]);
    const [canChargeEpisodes, setChargeEpisodes] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
  
    //GET CHARACTERS:
    const [urlCharacters, setUrlCharacters] = useState("https://rickandmortyapi.com/api/character");
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get(urlCharacters)
            .then((res) => {
                let arr = []//Este array es para poder hacer uso del useState de setCities().
                res.data.results.map((character) => {
                    arr = [...arr, [character.name, character.image]];//Agregamos los lugares de la URL a arr.
                })
                arr = [...characters, arr];//
                setCharacters(arr);
                if(res.data.info.next){setUrlCharacters(res.data.info.next);}else{setChargeEpisodes(true);setCharacters(arr.flat());}//Cambiamos la url para volver a buscar.
            }).catch((err) => console.log(err))
            .finally();
    }, [urlCharacters]);

    //GET EPISODES:
    useEffect(() => {
        //TAREA:
        //Este useEffect se encargara de descargar todos los episodios de la serie(SOLO HAY 51 A LA FECHA EN LA API) y guardarlos en 'episodes'.
        if(canChargeEpisodes){
            axios.get(url)
            .then((res) => {
                let arr = []//Este array es para poder hacer uso del useState de setEpisodes().
                res.data.results.map((episode) => {
                    for(let i = 0; i < episode.characters.length; i++){
                        //El proposito de este bucle for es el de cambiar el valor de "character" por el de un array que contenga el nombre del personaje y su imagen, esto a causa de que "characters" contiene una url de API y no los datos de los personajes.
                        let url_to_character = episode.characters[i];//Aqui guardamos el url para transformarlo a array.
                        let char_id = 0;
                        let char = "";
                        for(let o = url_to_character.length - 1; o >= 0; o--){//Vamos a extraer el id que se encuentra al final de la url del personaje.
                            if(url_to_character[o] != "/"){
                                char = char + url_to_character[o];//OJO QUE ESTO ESTA AL REVES.
                            }else{
                                break;
                            }
                        }
                        char = char.split('').reverse().join(''); //OJO QUE char ESTABA AL REVES.
                        char_id = +char - 1;//-1 por el array que empieza en 0.
                        episode.characters[i] = [characters[char_id][0], characters[char_id][1]];
                    }
                    arr = [...arr, episode];//Agregamos los lugares de la URL a arr.
                })
                arr = [...episodes, arr];//
                setEpisodes(arr.flat(1));//'arr' terminará siendo un array de más de 1 dimension, asi que colapsamos todo en uno solo :)
                if(res.data.info.next){setURL(res.data.info.next);}else{setLoading(false);}//Cambiamos la url para volver a buscar. Si es que hay mas.
            }).catch((err) => console.log(err))
            .finally();
        }
    }, [url, canChargeEpisodes]);
    
    //PAGINATION:
    const quantity = 5;
    const pageToshow = () => {
        const first = quantity * (page - 1);
        const last = first + quantity;
        return episodes?.slice(first, last);
    }
    
    return (
        <>
            <Header/>
            <main>
                {
                    !loading ?
                        <>
                            <Pagination
                                page = {page}
                                setPage = {setPage}
                                totalPages = {Math.ceil(episodes.length / 5)}
                            />
                            {
                                pageToshow().map((ep) => (
                                    <Episode
                                        key = {ep.id}
                                        ep = {ep}
                                    />
                                ))
                            }
                        </>
                    :
                        <>
                        <div className='loadingContainer'>
                            <i className='bx bx-loader bx-spin bx-lg' ></i>
                        </div>
                        </>
                }
            </main>

        </>
    )
}

export default AppEpisodes