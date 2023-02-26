import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { getRandom } from '../provider/data';
import { gameElement } from '../types/Type';

function Home() {
    const [toCompare, setToCompare] = useState<gameElement[]>([])
    const [memory, setMemory] = useState<gameElement[]>([...getRandom(5),...getRandom(5)])
    const [matched, setMatched] = useState<number>(0)

    const add = (i:number) => {
        setMemory(prevState=> [...prevState].map((elt,index)=>(
            (index === i) ? {...elt, isMatched:false} : elt
        )))
        setToCompare([...toCompare,...[memory[i]]])
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(toCompare.length === 2) {
                if(toCompare[0].name === toCompare[1].name){
                    setMatched(matched+1)
                }else{
                    setMemory(prevState=> [...prevState].map((elt,index)=>(
                        (elt.name === toCompare[0].name || elt.name === toCompare[1].name) ?
                            {...elt, isMatched:true}
                        :
                        elt
                    )))
                }
            setToCompare([])
            }},700)
    },[toCompare])
    useEffect(()=> {
        setTimeout(()=>setMemory(prevState=> [...prevState].map((elt,index)=>({...elt, isMatched:true}
        ))),500)
    },[])

    return (
        <div className='home'>
            {memory.map((element: gameElement, index: number)=>(
                <Card key={index} i={index} element={element} add={add}/>
            ))}
            <h1>{matched}</h1>
        </div>
    )
}

export default Home
