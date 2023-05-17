import React from 'react'
import { Link } from 'react-router-dom'

export function CardItem(props) {

    return (
        <li className="cards__item">
            <Link className="cards__item__link" to={props.path}>
                <img src={props.src} alt="Studios"
                    className="card__item__img" />
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{props.text}</h5>
                </div>
            </Link>
        </li>
    )
}

