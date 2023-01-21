import React from 'react';
import x from './ActivityCard.module.css'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getActivityById } from '../../redux/actions';
import Modal from '../Modal/Modal';


const ActivityCard = ({handleDelete, id, name, difficulty, duration, season, countries}) => {

    let dispatch = useDispatch();
    let history = useHistory();

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(true);
    }
      
    const handleHide = () => {
        setShow(false);
    }

  return (
    <div key={id} className={x.cardContainer}>
        <h2>{name}</h2>
        <h3>Difficulty: {difficulty}/5</h3>
        <h3>Duration: {duration} hours</h3>
        <h3>Season: {season}</h3>
        <h3>Available Countries:</h3>
        {/* {el.countries.map(el => <h3>{el.name}</h3>)}
        <button className='button' onClick={() => {dispatch(deleteActivity(el.id)); dispatch(getActivities())}}>Delete</button>  */}
        {countries.map(el => <h3>{el.name}</h3>)}
        <div>
          <button className={x.button} value={id} >
            <Link to={`/createActivity/${id}`}>Update</Link>
            {/* Update */}
          </button>
          <button className={x.button} onClick={(e) => handleShow(e)}>Delete</button>
        </div>
        {show && <Modal name={name} key={id} id={id} handleHide={handleHide} handleDelete={handleDelete} />}
    </div>
  )
}

export default ActivityCard