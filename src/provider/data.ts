import { gameElement } from '../types/Type';
import banana from '../images/banana.jpg';
import monkey from '../images/monkey.png';
import phone from '../images/phone.jpg';
import apple from '../images/apple.jpg';
import car from '../images/car.jpg';
import human from '../images/human.jpg'

export const GameElement: gameElement[] = [
    {
        name: 'banana',
        image: banana,
        isMatched: false
    },
    {
        name: 'monkey',
        image: monkey,
        isMatched: false
    },
    {
        name: 'phone',
        image: phone,
        isMatched: false
    },
    {
        name: 'apple',
        image: apple,
        isMatched: false
    },
    {
        name: 'car',
        image: car,
        isMatched: false
    },
    {
        name: 'human',
        image: human,
        isMatched: false
    }
]

export const getRandom = (number: number) => {
    let temp: gameElement[] = [...GameElement.slice(0,number)]
    let result: gameElement[] = []
    for(let i=0; i<number; i++) {
        let index = Math.floor(Math.random() * temp.length)
        result.push(temp[index])
        temp.splice(index,1)
    }
    return result
}
