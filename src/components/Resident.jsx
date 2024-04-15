import React, { useEffect } from 'react'
import useFetch from '../js/useFetch';
import './resident.css'

const Resident = ({api}) => {
    const [apiDataResident, getApiDataResident] = useFetch(api);
    
    useEffect(() => {//Ejecuto la api al ingresar a la pagina.
        getApiDataResident();
    }, [api]);//Para la Paginacion.

    return (
        <div className={'resident ' + apiDataResident?.status}>
            {
                apiDataResident?.status == "Dead" ?
                    <>
                        <div className='character_status flex justify-center align-center'><p>{apiDataResident?.status}</p></div>
                        <img src={apiDataResident?.image} alt="Character Image" width="300"/>
                        <div className='resident__info flex flex-column align-center'>
                            <h3>{apiDataResident?.name}</h3>
                            <hr />
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Origin:</th>
                                        <td>{apiDataResident?.origin.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Species:</th>
                                        <td>{apiDataResident?.species}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender:</th>
                                        <td>{apiDataResident?.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Episodes:</th>
                                        <td>{apiDataResident?.episode.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                :
                    <>
                        <img src={apiDataResident?.image} alt="Character Image" width="300"/>
                        <div className='resident__info flex flex-column align-center'>
                            <h3>{apiDataResident?.name} <span className={apiDataResident?.status}>{apiDataResident?.status}</span></h3>
                            <hr />
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Origin:</th>
                                        <td>{apiDataResident?.origin.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Species:</th>
                                        <td>{apiDataResident?.species}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender:</th>
                                        <td>{apiDataResident?.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Episodes:</th>
                                        <td>{apiDataResident?.episode.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </div>
    )
}

export default Resident