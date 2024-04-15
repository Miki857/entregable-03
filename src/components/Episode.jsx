import React from 'react'

const Episode = ({ep}) => {
    return (
        <div className='episode__container'>
            <h2>{ep.name}</h2>
            <p>Date: <span>{ep.air_date}</span></p>
            <p>Episode: <span>{ep.episode}</span></p>
            <h3>CHARACTERS</h3>
            <div className='characters_container'>
                {
                    ep.characters.map((character, index) => (
                        <>
                            <div className='flex flex-column align-center' key={index + ep.length}>
                                <img src={character[1]} alt="character image" width="50"/>
                                <p>{character[0]}</p>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Episode