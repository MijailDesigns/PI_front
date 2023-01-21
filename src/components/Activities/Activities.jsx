import React from 'react'
import a from './Activities.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, deleteActivity } from '../../redux/actions';
import ActivityCard from '../ActivityCard/ActivityCard';

const Activities = () => {

    const activities = useSelector(state => state.activities);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActivities())
    }, [])

    const handleDelete = (e) => {
        dispatch(deleteActivity(e.target.id)); 
        dispatch(getActivities())
    }

  return (
    <div className={a.flexContainer}>
        {activities.map((el, index) => {
            return(
                <ActivityCard handleDelete={handleDelete} key={el.id} id={el.id} name={el.name} difficulty={el.difficulty} duration={el.duration} season={el.season} countries={el.countries} />
            )
        })}
    </div>
  )
}

export default Activities