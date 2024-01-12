import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/square'
import {TURNS , WINNER_COMBOS} from './constants'
import { WinnerModal } from './components/winnerModal'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn , setTurn] = useState(TURNS.X)

  //null es que no hay ganador , false es que hay un empate
  const [winner , setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{
    
//revisamos todas las combinaciones ganadores
//para ver si gano x u o

    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
         boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

const checkEndGame = (newBoard) =>{
  return newBoard.every((square) => square != null)
}

  const updateBoard = (index) =>{
      //no actualizamos esta posicion
      //si ya tiene algo
      if(board[index] || winner) return

  //actualizar el tablero
    const newBoard = [...board]
     newBoard[index] = turn
     setBoard(newBoard)

     console.log(board)

     //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisa si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
       setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square , index)=>{
            return(
             <Square
              key = {index}
              index={index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

<WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}

export default App
