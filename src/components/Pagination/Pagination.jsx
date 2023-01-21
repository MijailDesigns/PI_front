import React from 'react'
import p from './Pagination.module.css'
import { useHistory, useLocation } from 'react-router-dom';

const Pagination = ({countries, currentPage, setCurrentPage}) => {

  let history = useHistory();
  let {search} = useLocation();
  let query = new URLSearchParams(search);
  let page = query.get("page");

  const amountPage = Math.ceil(((countries.length - 9) / 10) + 1);

  const nextHandler = () => {
    const nextPage = currentPage + 1;
    if (nextPage > amountPage) return;
    setCurrentPage(nextPage);

    query.set("page", nextPage)
    history.push({search: query.toString()})
  }

  const prevHandler = () => {
      const prevPage = currentPage - 1;
      if (prevPage === 0) return;
      setCurrentPage(prevPage);

      query.set("page", prevPage)
      history.push({search: query.toString()})
  }

  const numHandler = (e) => {
      setCurrentPage(Number(e.target.value));

      query.set("page", Number(e.target.value))
      history.push({search: query.toString()})
  }

  
  // let buttons = []
  // for (let i = 1; i < amountPage + 1; i++) {
  //   buttons.push(<button value={i} style={ {i} <= currentPage+2 || {i} >= currentPage-2 ? {display:"inline"} : {display:"none"}} onClick={e => numHandler(e)} key={i} disabled={currentPage === i ? true : false}>{i}</button>)
  // }

  // let buttons = []
  // for (let i = 1; i < amountPage + 1; i++) {
  //   buttons.push(<button value={i}  onClick={e => numHandler(e)} key={i} disabled={currentPage === i ? true : false}>{i}</button>)
  // }

  let buttons = []
  for (let i = 1; i < amountPage + 1; i++) {
    buttons.push(i)
  }


  return (
    <div>
      <button className={p.button} onClick={prevHandler} style={ currentPage === 1 ? {display:"none"} : {display:"inline"}}>Prev</button>
      {buttons.map((el) => {
        if(el <= currentPage + 2 && el >= currentPage){
          return (
          <button className={p.button} value={el}  onClick={e => numHandler(e)} key={el} disabled={currentPage === el ? true : false}>{el}</button>
          )
        }else if(el >= (currentPage -2) && el <= currentPage){
          return(<button className={p.button} value={el}  onClick={e => numHandler(e)} key={el} disabled={currentPage === el ? true : false}>{el}</button>)
        }
      })}
      <button className={p.button} onClick={nextHandler} style={ currentPage === amountPage ? {display:"none"} : {display:"inline"}}>Next</button>
    </div>
  )
}

export default Pagination