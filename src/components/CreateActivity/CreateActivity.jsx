import React from 'react'
import y from './CreateActivity.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { addActivity, getCountriesForActivity, getActivities, updateActivity, loading } from '../../redux/actions';

const CreateActivity = () => {

    let {id} = useParams();
    console.log(id)

    const countries = useSelector(state => state.countriesInActivity);
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch();

    const navigate = useHistory();

    let activityName = activities.map(e => e.name);
    console.log(activityName);
    let update = activities.find(e => e.id === id)
    console.log(update);

    const [errors, setErrors] = React.useState({});

    const [input, setInput] = useState({
        name: (update && update.name) || '',
        difficulty: (update && update.difficulty) || '',
        duration: (update && update.duration) || '',
        season: (update && update.season) || '',
        country: (update && update.countries.map(e => e.name)) || []
    });

    const [lookFor, setLookFor] = useState("");

    function validate(input) {
        let errors = {};
        if (!input.name || input.name.length < 3 || !input.name.match( (/^[A-Za-z]+$/))) {
          errors.name = 'Activity name is required';
        }else if (activityName.some((e) => e.toLowerCase() === input.name.toLowerCase())) {
          errors.name = 'Name already exist';
        }else if(!input.difficulty){
          errors.difficulty = 'Difficulty is required';
        }else if(!input.duration){
          errors.duration = 'Duration is required';
        }else if(input.duration === 0){
            errors.duration = 'Duration is must be bigger than 0';
        }else if(!input.season){
            errors.season = 'Season is required';
        }else if(!input.country || input.country.length === 0){
            errors.country = 'Country is required';
        }

        return errors;
    };

    useEffect(() => {

        dispatch(getCountriesForActivity(lookFor));
        dispatch(getActivities());
    }, [lookFor])

   

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
      };

    function handleClick(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.alt]
        })

        setErrors(validate({
            ...input,
            country: [...input.country, e.target.alt]
        }))
    }

    function handleLook(e) {
        setLookFor(e.target.value);
      };

    function handleDelete(e) {
        setInput({
            ...input,
            country: input.country.filter((el) => el !== e),
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(input));
        if (Object.keys(errors).length === 0) {
            dispatch(addActivity(input))
            alert('Activity created successfully');
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                country: []
                })
            navigate.push("/activities");
        }
        return;
    }

    async function handleSubmit2(e) {
        e.preventDefault();
        // setErrors(validate(input));
        // if (Object.keys(errors).length === 0) {
        //     dispatch(updateActivity(input))
        //     alert('Activity updated successfully');
        //     setInput({
        //         name: '',
        //         difficulty: '',
        //         duration: '',
        //         season: '',
        //         country: []
        //         })
        //     navigate.push("/activities");
        // }
        // return;
        dispatch(updateActivity(e.target.id, input))
        alert('Activity updated successfully');
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            country: []
            })
        navigate.push("/activities");
    }

  return (
    <div className={y.container}>
        <div  style={{width: "70%"}}>
            <div className=''>
                <h2 className={y.title}>Select countries</h2>
            </div>
            <div className={y.countries}>
                {!countries ? (
                    <img className={y.loading}
                    src='https://ftsamuelrobinson.files.wordpress.com/2015/02/planeta-gif-2b924d2.gif'
                    alt='Cargando..'
                />
                ): (countries?.map(c => <img src={c.flag} alt={c.name} 
                    style={{width: "auto", height: "50px", padding: "5px", opacity: input.country.includes(c.name) ? "0.4" : "1"}} 
                onClick={e => handleClick(e)}/>))}
            </div>
            
        </div>
        <div className={y.createDiv} style={{width: "30%"}}>
            <div className='createSection'>
                <h1 className={y.title}>{update ? 'Update' : 'Create'} your activity</h1>
            </div>
            <form id={id} onSubmit={!update ? handleSubmit : handleSubmit2}>
                <div>
                    <label className={y.label}>Which is the activity name?</label>
                    <br/>
                    <input className={y.inputs} type="text" value={input.name} name='name' placeholder='Activity name...' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className={y.danger}>{errors.name}</p>
                    )}
                </div>
                
                <div>
                    <label className={y.label}>Difficulty</label>
                    <br/>
                    <select className={y.inputs} name='difficulty' onChange={e => handleChange(e)}>
                        <option  name="DEFAULT" disabled selected>Select Difficulty</option>
                        <option value="1" selected={input.difficulty === "1" ? true : false}>1</option>
                        <option value="2" selected={input.difficulty === "2" ? true : false}>2</option>
                        <option value="3" selected={input.difficulty === "3" ? true : false}>3</option>
                        <option value="4" selected={input.difficulty === "4" ? true : false}>4</option>
                        <option value="5" selected={input.difficulty === "5" ? true : false}>5</option>
                    </select> 
                    {errors.difficulty && (
                        <p className={y.danger}>{errors.difficulty}</p>
                    )}
                </div>
                
                <div>
                    <label className={y.label}>How long is going to take?</label>
                    <br/>
                    <input className={y.inputs} type="number" min={1} name='duration' value={input.duration} placeholder='Select hours'  onChange={e => handleChange(e)}/>
                    {errors.duration && (
                        <p className={y.danger}>{errors.duration}</p>
                    )}
                </div>
                
                <div>
                    <label className={y.label}>Season</label>
                    <br/>
                    <select value={input.season} className={y.inputs} name='season' defaultValue={"DEFAULT"} onChange={e => handleChange(e)}>
                        <option  value="" disabled selected>Select Season</option>
                        <option value="Winter" name="Winter" selected={input.season === "Winter" ? true : false}>Winter</option>
                        <option value="Spring" name="Spring" selected={input.season === "Spring" ? true : false}>Spring</option>
                        <option value="Summer" name="Spring" selected={input.season === "Summer" ? true : false}>Summer</option>
                        <option value="Autumn" name="Spring" selected={input.season === "Autumn" ? true : false}>Autumn</option>
                    </select>
                    {errors.season && (
                        <p className={y.danger}>{errors.season}</p>
                    )}
                </div>

                <div>
                    <label className={y.label}>Which are the countries where is going to be available?</label>
                    <br/>
                    <input className={y.inputs} type='text' placeholder='Look for the country' onChange={handleLook} />
                    <div className={y.selectedCountries}>
                        {input.country?.map((el, index) => <p className={y.textCountry}>{el} <button 
                            className={y.btnCountry}
                            type='button' 
                            onClick={() => handleDelete(el)}>X
                        </button>
                        </p>)}
                    </div>
                    
                    {errors.country && (
                        <p className={y.danger}>{errors.country}</p>
                    )}
                </div>
                
                {!update && <button className={y.createBtn} type='submit' disabled={Object.keys(errors).length > 0 || input.name === "" ? true : false}>Create Activity</button>}
                {update && <button className={y.createBtn} type='submit'>Update Activity</button>}
            </form>
            
        </div>
    </div>
  )
}

export default CreateActivity