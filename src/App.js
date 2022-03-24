import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

 function randomNumber(){
   return Math.ceil(Math.random()*6)
 }

  const [dice, setDice] = useState(generateArrayState())

  const [tenzies, setTenzies] = useState(false)

 
  
  function generateArrayState(){
     const random = []
     for(let i=1;i<=10;i++){
        random.push({value: randomNumber(), isHeld : false, id:nanoid()} )
     }
     return random
  }

  const holdDice = (id) =>{
      setDice(dice => dice.map(die => {
        return die.id===id ? {...die,isHeld: !die.isHeld}: die 
      }))
  }

  function handleClick(){

    if(tenzies){
      setDice(generateArrayState)
      setTenzies(false)
    }
    else{
      setDice(prevState => prevState.map(dice => {
        return dice.isHeld === true ? dice: {...dice, value:randomNumber()}
      }))
    }
  }

 
  const diceElements = dice.map(die=>{
    return(
      <Die value={die.value} isHeld={die.isHeld} key = {die.id} id = {die.id} holdDice = {holdDice}/>
    )
  })

  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value )

    if(allHeld && allSameValue){
      setTenzies(true)
    }
    },
    [dice]
  )
 
  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h2>Tenzies</h2>
        
        {tenzies ? <h3>Congratulations</h3>: <p>Roll Until all dice are the same. Click each dice to freeze it at its current value between rolls</p>}

        <div className='dice__component'>
            {diceElements}
        </div>

        <button onClick={handleClick}>{tenzies? 'New Game':'Roll Dice'}</button>
      </main>
    </div>
  )
}

export default App
