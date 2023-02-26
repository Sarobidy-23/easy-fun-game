import React, { useEffect, useState } from 'react';
import './Card.css';
import { gameElement } from '../../types/Type';

type CardPropType = {
    element: gameElement,
    add: (i: number)=>void,
    i: number
}

function Card(props:CardPropType) {
    const { element, add, i } = props;

    const [flip, setFlip] = useState<boolean>(element.isMatched);
    const onClick = () => {
        setFlip(false)
        add(i)
    }

    return (
        <div className='card-container' onClick={element.isMatched ? () => onClick() : ()=>{}}>
            <div className={`card ${(flip || element.isMatched) ? 'is-flipped' : ''}`}>
                <div className="card__face card__face--front ">
                    <img src={element.image} alt='ede'/>
                </div>
                <div className="card__face card__face--back">?</div>
            </div>
        </div>
    )
}

export default Card
