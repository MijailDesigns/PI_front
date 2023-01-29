//import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const ORDER_BY = 'ORDER_BY'
export const GET_COUNTRY_DETAIL="GET_COUNTRY_DETAIL";
export const CLEAN_DETAIL="CLEAN_DETAIL";
export const GET_COUNTRY_FOR_ACTIVITY="GET_COUNTRY_FOR_ACTIVITY";
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const GET_ACTIVITIES="GET_ACTIVITIES";
export const DELETE_ACTIVITY_BY_ID="DELETE_ACTIVITY_BY_ID";
export const GET_ACTIVITY_BY_ID="DELETE_ACTIVITY_BY_ID";
export const UPDATE_ACTIVITY="UPDATE_ACTIVITY";
const URL = 'https://piback-production-b2c4.up.railway.app'

export function loading (){
    return {
        type: "LOADING"
    }
}

export const getCountries = ({name, continent, activity}) => {
    return async function (dispatch){
        dispatch(loading())
        return fetch(`${URL}/countries?name=${name}&continent=${continent}&activity=${activity}`)
        .then(response => response.json()
        .then(json => dispatch({type: GET_COUNTRIES, payload: json})))
    }
}

export const getCountriesForActivity = (name) => {
    return async function (dispatch){
        dispatch(loading())
        return fetch(`${URL}/countries?name=${name}`)
        .then(response => response.json()
        .then(json => dispatch({type: GET_COUNTRY_FOR_ACTIVITY, payload: json})))
    }
}

export const getActivities = () => {
    return async function (dispatch){
        dispatch(loading())
        return fetch(`${URL}/activities`)
        .then(response => response.json()
        .then(json => dispatch({type: GET_ACTIVITIES, payload: json})))
    }
}

export const addActivity = (payload) => {
    return async function (dispatch){
        await fetch(`${URL}/activities`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(json => dispatch({
            type: ADD_ACTIVITY
        }))
        
    }
}

export const updateActivity = (id, payload) => {
    return async function (dispatch){
        await fetch(`${URL}/activities/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(json => dispatch({
            type: UPDATE_ACTIVITY
        }))
        
    }
}

// export function addActivity(payload) {
//     return async function (dispatch) {
//         const response = await axios.post('http://localhost:3001/activities', payload)
//         console.log(response)
//         return {
//             type: ADD_ACTIVITY,
//             response
//         }
//     }
// }

export const deleteActivity = (id) => {
    return async function (dispatch){
        await fetch(`${URL}/activities/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(json => dispatch({ type: ADD_ACTIVITY, payload: id}))
    }
}

export const orderBy = (payload) => {
    return {
        type: ORDER_BY,
        payload
    }
}

export const getCountryDetail = (id) => {
    return async function (dispatch) {
        return fetch(`${URL}/countries/${id}`)
        .then(res => res.json()
        .then(json => dispatch({type: GET_COUNTRY_DETAIL, payload: json})))
    }
}

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
}






