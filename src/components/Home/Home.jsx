import React from 'react';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getCountries, orderBy } from '../../redux/actions';
import CardCountry from '../CardCountry/CardCountry';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import h from './Home.module.css'

const Home = () => {

    let {search} = useLocation();
    let query = new URLSearchParams(search);
    console.log(query.toString());
    let name = query.get("name");
    let continent = query.get("continent");
    let activity = query.get("activity");
    let page = query.get("page");
    let order = query.get("order");
    

    console.log(order);

    let history = useHistory();

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const loading = useSelector(state => state.loading);

    let [searchN, setSearchN] = useState({
        name: name || "",
        continent: continent || "",
        activity: activity || ""
    });

    //pagination
    const [currentPage, setCurrentPage] = useState(5);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    let last = 9 + ((currentPage - 1) * itemsPerPage);
    let first = last - itemsPerPage;
    let countriesToRender = countries.slice(first, last)

    const changeItemsPerPage = (currentPage) => {
        if (currentPage === 1) {
            setItemsPerPage(9);
        }else{
            setItemsPerPage(10);
        }
    }
    
    const[orden, setOrden] = useState (order || 'default');

    useEffect(() => {
        changeItemsPerPage(currentPage)
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(Number(page)  || 1)
        dispatch(getCountries(searchN))
    }, [dispatch, searchN, page]);

    

    function handleSort (e) {
        e.preventDefault();
        setCurrentPage(1); 
        dispatch(orderBy(e.target.value));
        
        setOrden(`Ordenado ${e.target.value}`) 
        query.set(e.target.name, e.target.value)
        history.push({search: query.toString()})

    };
    


  return (
    <div className={h.fondo}>
        <div style={{marginTop: '50px'}}>
            <Filter searchN={searchN} setSearchN={setSearchN} countries={countries} setCurrentPage={setCurrentPage}  handleSort={handleSort}/>
            <Pagination countries={countries} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        
        <div className={h.flexContainer}>
            {loading ? (
                <img className={h.loading}
                    src='https://ftsamuelrobinson.files.wordpress.com/2015/02/planeta-gif-2b924d2.gif'
                    alt='Cargando..'
                />
            ) : (
                countriesToRender?.map((el, index) => {return(
                    <Fragment key={index}>
                            <CardCountry 
                                key={index} 
                                id={el.id}
                                name={el.name}
                                flag={el.flag}
                                continent={el.continent} 
                            />
                    </Fragment>
                )})
            )}
        </div>
    </div>
  )
}

export default Home