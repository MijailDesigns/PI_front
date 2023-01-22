import React from 'react'
import a from './Activities.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getActivities, deleteActivity } from '../../redux/actions';
import ActivityCard from '../ActivityCard/ActivityCard';

const Activities = () => {

    const activities = useSelector(state => state.activities);
    const dispatch = useDispatch();
    const navigate = useHistory();

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])

    const handleDelete = (e) => {
        dispatch(deleteActivity(e.target.id)); 
        dispatch(getActivities())
    }

  return (
    <div >
            {(activities.length === 0) ? (
      <div className={a.flexContainerE}>
        <div>
            <h2>There is not created activities yet</h2>
            <button 
                className={a.button}
                onClick={() => navigate.push("/createActivity/create")}>
                Let's create an activity
            </button>
        </div>
      </div>
    ) : (
      <div className={a.flexContainer}>
        {activities?.map((el, index) => {
          return(
            <ActivityCard handleDelete={handleDelete} key={el.id} id={el.id} name={el.name} difficulty={el.difficulty} duration={el.duration} season={el.season} countries={el.countries} />
          )
        })}
      </div>
    )}
        {/* {activities.map((el, index) => {
            return(
                <ActivityCard handleDelete={handleDelete} key={el.id} id={el.id} name={el.name} difficulty={el.difficulty} duration={el.duration} season={el.season} countries={el.countries} />
            )
        })} */}
    </div>
  )
}

export default Activities