import React, { useEffect, useState } from 'react';
import './Environement.css';
import { minimax, isWinner, getAvailable } from '../../bot/data';
import { EnvPropsType, PositionType, RewardIndexedType } from '../../type';

function Environement(envProps: EnvPropsType) {
    const {caseSize} = envProps
    const createEnv = (size: number) => {
        let env = Array.from(Array(size),()=>Array.from(Array(size)))
        env.forEach((line, y)=>{
            for(let x in line){
                env[y][x] = ''
            }
        })
        return env
    }
    const [actualEnv, setActualEnv] = useState<string[][]>(createEnv(caseSize))
    const [isHuman, setIsHuman] = useState<boolean>(true)
    const insert = (player: string, position: PositionType) => {
        setActualEnv(prevState => [...prevState.map((yelt, y)=>(
            yelt.map((xelt,x)=>{
                if(x == position.x && y == position.y){
                    return player
                }
                return xelt
            })
        ))])
    }

    const bot =()=>{
        let cot: RewardIndexedType = minimax(actualEnv,"X",0) as RewardIndexedType
        if(cot.index){
            insert("X",cot.index)
            setIsHuman(true)
        }
    }
    useEffect(()=> {
        if(!isHuman) {
            bot()
        }
    },[isHuman])
    useEffect(()=>{
        if(isWinner(actualEnv, "X", 3).length != 0) {
            alert("Bot win, Human lose !!")
        } else if(isWinner(actualEnv, "O", 3).length != 0) {
            alert("Human win, Bot lose !!")
        } else if(getAvailable(actualEnv,3).length == 0) {
            alert('Draw game, No winner for the moment')
        }
    }, [actualEnv])

    const human = (huProps:PositionType) => {
        const {x,y} = huProps
        insert("O",{x, y});
        setIsHuman(false) 
    }
    return (
        <>
        <table>
            <tbody>
            {actualEnv.map((yelt:string[], y)=>(
                <tr>
                    {yelt.map((xelt:string, x)=>(
                       <td onClick={(isHuman && actualEnv[y][x] === '') ? ()=>human({x,y}): ()=>{} }>{actualEnv[y][x]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={()=>setIsHuman(false)}>Start</button>
        </>
    )
}

export default Environement
