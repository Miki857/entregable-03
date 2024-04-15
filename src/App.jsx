import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './js/useFetch';
import Resident from './components/Resident'
import Pagination from './components/Pagination';
import axios from 'axios';
import './js/autoComplete.js'
import autoComplete from './js/autoComplete.js';
import autoCompleteChar from './js/autoCompleteChar.js';
import Header from './components/Header.jsx';

function App() {
  //LOADING SCREEN:
  //"citiesLoaded" y "charactersLoaded" seran utilizados para HABILITAR la carga del del 'main'.
  //"canAutocomplete" sera ultilizado para HABILITAR los 2 useEffect que estan justo debajo. Ya que sino los .js van a intentar acceder a elementos del DOM cuando aun no existen.
  const [citiesLoaded, setCitiesLoaded] = useState(false);
  const [charactersLoaded, setCharactersLoaded] = useState(false);
  const [canAutocomplete, setCanAutocomplete] = useState(false);
  
  const [locationNumber, setLocationNumber] = useState(3);//ID del Lugar.
  const url = `https://rickandmortyapi.com/api/location/${locationNumber}`;//URL del lugar
  const [apiData, getApiData] = useFetch(url);//Custom Fetch.

  useEffect(() => {//Ejecuto la api al ingresar a la pagina.
    getApiData();
  }, [locationNumber]);//Cada vez que el usuario busque un universo se debe volver a pedir la api.
  
  //GET CITIES:
  const [urlCities, setUrlCities] = useState("https://rickandmortyapi.com/api/location");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get(urlCities)
          .then((res) => {
            let arr = []//Este array es para poder hacer uso del useState de setCities().
            res.data.results.map((city) => {
              arr = [...arr, city];//Agregamos los lugares de la URL a arr.
            })
            arr = [...cities, arr];//
            setCities(arr.flat(1));
            if(res.data.info.next){setUrlCities(res.data.info.next);}else{setCitiesLoaded(true);}//Cambiamos la url para volver a buscar.
          }).catch((err) => console.log(err))
          .finally();
  }, [urlCities]);
  
  //GET CHARACTERS:
  const [urlCharacters, setUrlCharacters] = useState("https://rickandmortyapi.com/api/character");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get(urlCharacters)
          .then((res) => {
            let arr = []//Este array es para poder hacer uso del useState de setCities().
            res.data.results.map((character) => {
              arr = [...arr, character];//Agregamos los lugares de la URL a arr.
            })
            arr = [...characters, arr];//
            setCharacters(arr.flat(1));
            if(res.data.info.next){setUrlCharacters(res.data.info.next);}else{setCharactersLoaded(true);}//Cambiamos la url para volver a buscar.
          }).catch((err) => console.log(err))
          .finally();
  }, [urlCharacters]);

  //PAGINATION:
  const [page, setPage] = useState(1);
  const quantity = 5;
  const pageToshow = () => {
    const first = quantity * (page - 1);
    const last = first + quantity;
    return apiData?.residents.slice(first, last);
  }

  //SEARCH-FIELD ID:
  const textInput = useRef()
  const handleSearch = (event) => {
    event.preventDefault();//Para que no recarge la pagina.
    setLocationNumber(textInput.current.value);//Actualizamos el lugar a buscar
    textInput.current.value = "";
    setPage(1);
  }

  //SEARCH-FIELD PLACE-NAME:
  const textInput_u = useRef()
  const handleSearch_U = (event) => {
    event.preventDefault();//Para que no recarge la pagina.
    let foundPlace = false;//Con esto podemos saber si hemos encontrado el lugar o no.
    for(const city of cities){
      if(textInput_u.current.value == city.name){
        setLocationNumber(city.id);//Actualizamos el lugar a buscar
        textInput_u.current.value = "";//Eliminamos el contenido del buscador por comodidad.
        foundPlace = true;
        break;//Salimos del bucle una vez encontrado el lugar.
      }
    }

    if(!foundPlace){alert("Lugar no encontrado.")}
  }

  //SEARCH-FIELD CHARACTER-NAME:
  const [characterNumber, setCharacterNumber] = useState(1);
  const url_c = `https://rickandmortyapi.com/api/character/${characterNumber}`;
  const [apiData_c, getApiData_c] = useFetch(url_c);

  const textInput_c = useRef()
  const handleSearch_C = (event) => {
    event.preventDefault();//Para que no recarge la pagina.
    let foundCharacter = false;//Con esto podemos saber si hemos encontrado el lugar o no.
    for(const character of characters){
      if(textInput_c.current.value == character.name + " Universo " + character.id){
        setCharacterNumber(character.id);//Actualizamos el lugar a buscar
        textInput_c.current.value = "";//Eliminamos el contenido del buscador por comodidad.
        foundCharacter = true;
        break;//Salimos del bucle una vez encontrado el lugar.
      }
    }

    if(!foundCharacter){alert("Personaje no encontrado.")}
  }

  useEffect(() => {//Ejecuto la api al ingresar a la pagina.
    getApiData_c();
  }, [characterNumber]);//Cada vez que el usuario busque un universo se debe volver a pedir la api.
  
  //LOADING SCREEN:
  useEffect(() => {
    if(canAutocomplete){//Charge autocomplete JS for places.
      autoComplete(cities, "city");
    }
  },[cities, canAutocomplete])

  useEffect(() => {
    if(canAutocomplete){//Charge autocomplete JS for character.
      autoCompleteChar(characters, "char");
    }
  },[characters, canAutocomplete])

  if(citiesLoaded && charactersLoaded){
    if(!canAutocomplete){//La segunda condicion es para que no se ejecute infinitamente. RE-RENDERER ERROR.
      setCanAutocomplete(true);
    }
  }
  

  return (
    <>
    <Header/>
    <main>
      {
        (citiesLoaded && charactersLoaded) ?
          <>
            {/* CHARACTER DATA */}
            <img className='gif__left' src="https://movementstrategy.com/wp-content/themes/bigdrop-theme/mortyawardy/the-gist-of-it.gif" alt="gif-01"/>
            <img className='gif__right' src="https://i.giphy.com/McIBYFNF5pkayHj6vl.webp" alt="gif-02"/>
            <section className='characterData gap-01'>
              {/*SEARCH-FIELD CHARACTER-NAME:  */}
              <div className='search-box search-box_char flex flex-column align-center'>
                <form onSubmit={handleSearch_C} name='inputNameCharacter' className=' flex flex-column flex-start'>
                  <label htmlFor="inputNameCharacter">Buscar por nombre del personaje:</label>
                  <div className='flex'>
                    <input type="text" id='input-box_char' placeholder='Character' ref={textInput_c} autoComplete="off" required/>
                    <button className='search-btn'>Search</button>
                  </div>
                </form>
                <ul className='search_ul search_ul_char hidden'></ul>
              </div>
              {/* DATA DISPLAY */}
              <img src={apiData_c?.image} alt="character_image" width="150" />
              <table>
                <caption>{apiData_c?.name}</caption>
                <tbody>
                  <tr>
                    <th>Gender:</th>
                    <td>{apiData_c?.gender}</td>
                  </tr>
                  <tr>
                    <th>Species:</th>
                    <td>{apiData_c?.species}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td>{apiData_c?.status}</td>
                  </tr>
                </tbody>
              </table>
            </section>
            {/* PLACE DATA */}
            <div className='placeData__container flex flex-column align-center'>
              <section className='placeData'>
                {/* SEARCH-FIELD ID: */}
                <form onSubmit={handleSearch} className='flex flex-column flex-start'>
                  <label htmlFor="inputNumberUniverse">Buscar por numero de universo:</label>
                  <div className='flex'>
                    <input type="number" name='inputNumberUniverse' placeholder='1-126' min={1} max={126} ref={textInput} autoComplete="off" required/>
                    <button className='search-btn'>Search</button>
                  </div>
                </form>
                {/*SEARCH-FIELD PLACE-NAME:  */}
                <div className='search-box search-box_city flex flex-column align-center'>
                  <form onSubmit={handleSearch_U} name='inputNamePlace' className=' flex flex-column flex-start'>
                    <label htmlFor="inputNamePlace">Buscar por nombre del lugar:</label>
                    <div className='flex'>
                      <input type="text" id='input-box_city' placeholder='Nombre' ref={textInput_u} autoComplete="off" required/>
                      <button className='search-btn'>Search</button>
                    </div>
                  </form>
                  <ul className='search_ul search_ul_city hidden'></ul>
                </div>
                <table>
                  <caption>{apiData?.name}</caption>
                  <tbody>
                    <tr>
                      <th>Type:</th>
                      <td>{apiData?.type}</td>
                    </tr>
                    <tr>
                      <th>Dimension:</th>
                      <td>{apiData?.dimension}</td>
                    </tr>
                    <tr>
                      <th>Residents:</th>
                      <td>{apiData?.residents.length}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              {/* PAGINATION */}
              <Pagination
                page = {page}
                setPage = {setPage}
                totalPages = {Math.ceil(apiData?.residents.length / 5)}
              />
              {/* RESIDENTS */}
              <div className='residents__container'>
                {
                  pageToshow()?.map((characterApi, index) => {
                    return <Resident
                      key = {index}
                      api = {characterApi}
                    />
                  })
                }
              </div>
            </div>
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

export default App;
