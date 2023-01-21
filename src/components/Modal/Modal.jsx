import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const Modal = ({handleHide, handleDelete, id, name}) => {
    return ReactDOM.createPortal(
        <div className='modal' >
            <h2>Are you sure to delete the activity with the name of {name}?</h2>
            <button className='button' id={id} onClick={handleDelete}>Yes, sure</button>
            <button className='button' onClick={handleHide}>No, I'm going think it for a while</button>
        </div>,
        document.getElementById("modal")
    )
}

export default Modal