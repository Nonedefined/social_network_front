import React from 'react'


function PopUp(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button class="close-btn btn btn-outline-light" type="button" onClick={() => props.setTrigger(false)}><i class="fa-solid fa-xmark"></i></button>
                <img class="popup_image" src={props.image} />
            </div>
        </div>
    ) : ''
}

export default PopUp