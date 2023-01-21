import React from 'react'
import { Link } from 'react-router-dom'
import c from './CardCountry.module.css'

const CardCountry = ({id, name, flag, continent}) => {
  return (
    <div className={c.card}>
        <img src={flag} alt='bandera' />
        <h2>{name}</h2>
        <h3>{continent}</h3>
        <button className={c.button}><Link to={`/countryDetail/${id}`}>See Details</Link></button>
        
    </div>
  )
}

export default CardCountry