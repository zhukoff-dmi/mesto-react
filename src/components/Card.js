import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="card" key={props.card._id} >
            <img className="card__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="card__signature">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-container">
                    <button className="card__like" type="button"></button>
                    <p className="card__like-number">{props.card.likes.length}</p>
                </div>
            </div>
            <button className="card__delete-button" type="button"></button>
        </article>

    )
}

export default Card;