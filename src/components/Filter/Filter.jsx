import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from './Filter.module.css'




const Filter = ({searchN, setSearchN, countries, setCurrentPage, handleSort}) => {
    
    let history = useHistory();
    let {search} = useLocation();
    console.log(useLocation())
    let query = new URLSearchParams(search);

    function handleChange(e) {
        setSearchN({
          ...searchN,
          [e.target.name]: e.target.value
        });
        query.set("page", 1)
        query.set(e.target.name, e.target.value)
        history.push({search: query.toString()})

      };

    let resultCountries = Array.from(new Set(countries.map(el => el.continent)))
    
    let result = []
    countries.map(el => {
        if (el.activities.lenght !== 0) {
            el.activities.map(el => result.push(el.name))
        }
    })


  return (
    <div className={s.container}>
        <form>
            <input type='text' className={s.inputs} name='name' value={searchN.name} placeholder="Search by country's name"
            onChange={handleChange} />

            <label className={s.label}>Continent</label>
            <select name='continent' className={s.inputs} onChange={e => handleChange(e)} >
                <option value="" selected={searchN.continent === "" ? true : false}>All</option>
                {resultCountries.map((g, index) => 
                    <option key={index}  value={g} selected={searchN.continent === g ? true : false} >{g}</option>  
                    )}
            </select>

            <label className={s.label}>Tourist Activity</label>
            <select name='activity' className={s.inputs} onChange={e => handleChange(e)}>
                <option value="" selected={searchN.activity === "" ? true : false}>All</option>
                {Array.from(new Set(result)).map((g, index) => 
                    <option key={index}  value={g}  selected={searchN.activity === g ? true : false} >{g}</option>  
                    )}
            </select>
            <br></br>
            <label className={s.label}>Order by: country's name</label>
            <select name="order" className={s.inputs} onChange={e => handleSort(e)}>
                <option value="default">Default</option>
                <option value="ascAlp">A-Z</option>
                <option value="descAlp">Z-A</option>
            </select>

            <label className={s.label}>population</label>
            <select name="order" className={s.inputs} onChange={e => handleSort(e)}>
                <option value="default">Default</option>
                <option value="ascPop">0-9</option>
                <option value="descPop">9-0</option>
            </select>
        </form>
    </div>
  )
}

export default Filter