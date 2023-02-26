let directions = [ 
    [0,1], //vetical |
    [1,0], //horizontal _
    [1,1], //oblique vers la droite
    [1,-1] //oblique vers la gauche
]
export const isWinner = (board: string[][], who: string, size: number) => {
    for(let yi=0; yi<board.length; yi++){
        for(let xi in board[yi]){
            for(let direction of directions) {
                let items = []
                for(let i=0; i<size; i++) {
                    const x = parseInt(xi) + (i * direction[0])
                    const y = yi + (i * direction[1])
                    if((board[y]?board[y][x]:'') === who){
                        items.push({x,y})
                    }
                    if(items.length >= 3){
                        return items
                    }
                }
            }
           
        }
       
    }
    return []
}
let maximiz = "X";
let minimiz = "O"
let maxDepth = 4
let size = 8;
let caseLength = 3;

export const getAvailable = (board: string[][], caseLength: number) => {
    let available = []
    for(let y=0; y<caseLength; y++) {
        for(let x=0; x<caseLength; x++) {
            if(board[y][x] === ''){
                available.push({x,y})
            }
        }
    }
    return available
}
const insert = (board: string[][], who: string, position:{x:number, y:number}) =>{
    board[position.y][position.x] = who
    return board
}
export const minimax = (board: string[][], who: string, depth: number): {index:{x:number,y:number}, score:number} | {score:number}=> {
    if(getAvailable(board, caseLength).length === caseLength*caseLength){
        return {index: getAvailable(board, caseLength)[Math.floor(Math.random() * (caseLength*caseLength))], score:0}
    }
    if(isWinner(board, maximiz, size).length !== 0){
        return {score: 20-depth}
    } else if(isWinner(board, minimiz, size).length !== 0){
        return {score: -10+depth}
    }else if(getAvailable(board, caseLength).length === 0 || depth === maxDepth) {
        return {score:0}
    }

    let moves:{index:{x:number, y:number}, score: number}[] | {score:number}[] = []
    getAvailable(board, caseLength).forEach((emptyIndex)=>{
        let tempBoard = board.map((a)=>a.slice());
        let moveResult: {index:{x:number,y:number}, score: number} = {
            index: {
                x: -20,
                y: -20
            },
            score: -20
        }
        insert(tempBoard, who, emptyIndex)
        moveResult.index = emptyIndex
        if(who === maximiz) {
            let result = minimax(tempBoard, minimiz, depth+1)
            moveResult.score = result.score
        } else {
            let result = minimax(tempBoard, maximiz, depth+1)
            moveResult.score = result.score
            
        }
        moves.push(moveResult)
    })
    let bestIndex = 0;
    if(who === maximiz) {
        let bestScore = -100
        moves.forEach((e,index)=>{
            if(bestScore<=e.score){
                bestScore = e.score
                bestIndex = index
            }
        })
    } else {
        let bestScore = 100
        moves.forEach((e,index)=>{
            if(bestScore>=e.score){
                bestScore = e.score
                bestIndex = index
            }
        })
    }
    return moves[bestIndex]
}
console.log(minimax([["O","X",""],["O","O",""],["X","",""]],"X",0))