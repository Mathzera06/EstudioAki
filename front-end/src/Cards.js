import React from 'react'
import "./Cards.css"
import { CardItem } from './CardItem.js'
// import Studio1 from './componentes/imgs/studio1.png'

export function Cards() {

    return (
        <div className='cards'>
            <h1>Olha esses estudio incriveis!!</h1>
            <div className="cards__container">
                {/* <div className="cards__wrapper">
                    <ul className="card__items">
                        <CardItem
                            src={Studio1}
                            text="Encontre o estudio que vc precisa"
                            path='/studios'

                        />
                    </ul>
                </div> */}
            </div>
        </div>
    )
}


