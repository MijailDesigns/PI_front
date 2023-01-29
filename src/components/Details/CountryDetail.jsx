import React from 'react'
import d from './CountryDetail.module.css'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCountryDetail, cleanDetail } from '../../redux/actions';

const CountryDetail = (props) => {

    let history = useHistory();

    const {id} = useParams();
    console.log(id);

    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    
    useEffect(() => {
        dispatch(getCountryDetail(id))
    }, [dispatch, id])

    useEffect(() => {
        return () => {
            dispatch(cleanDetail())
          };
    }, [dispatch])


  return (
    <div className={d.detailContainer}>
        <div className={d.flag}>
            <div>
                <button className={d.button} onClick={() => {history.goBack()}}>Go back</button>
            </div>
            <div>
                <img src={detail.flag} alt={detail.name} className={d.imgFlag} />
            </div>
        </div>
        <div className={d.container}>
            <div className={d.containerText}>
                <h1>{detail.name} ({detail.id})</h1>
                <h3>Capital: {detail.capital}</h3>
                <h3>Subregion: {detail.subregion}</h3>
                <h3>Area: {detail.area} km<sup>2</sup></h3>
                <h3>Population: {detail.population}</h3>
                <h3>Tourist Activities: </h3>
                <ul>
                    <div className={d.activitiesContainer}>
                        {detail.activities?.map(el => {return(
                            <>
                                <li><h4>{el.name}</h4></li>
                                <p>Difficulty: {el.difficulty}</p>
                                <p>Duration: {el.duration}</p>
                                <p>Season: {el.season}</p>
                            </>)
                        })}
                    </div>
                    
                </ul>
            </div>
            
        </div>
        
    </div>
  )
}

export default CountryDetail