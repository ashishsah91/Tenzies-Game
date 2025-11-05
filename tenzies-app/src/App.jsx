import './index.css'
import Dice from './components/Dice'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [diceList, setDiceList] = React.useState(() => generateAllNewDice())

  // Dice Array Element intialized 
  const diceArrayElement = diceList.map((dice, index) =>
    <Dice key={dice.id} value={dice.value} handleDiceSelect={() => handleDiceSelect(index)} isSelect={dice.isSelect} />)


  // Game won variable defined
  const gameWon = diceList.every((ele) => ele.isSelect) && diceList.every((ele) => ele.value === diceList[0].value);


  // Generate All new dice 
  function generateAllNewDice() {
    return new Array(10).
      fill(0).
      map((ele) => (
        { 'id': nanoid(), 'isSelect': false, 'value': ele = Math.ceil(Math.random() * 6) }
      ))
  }

  // Dice roll function
  function handleDiceRoll() {
    (gameWon) ? setDiceList(generateAllNewDice()) :
      setDiceList(function (prevValue) {
        return prevValue.map((ele) =>
          (ele.isSelect) ? ele : { ...ele, value: Math.ceil(Math.random() * 6) }
        )
      })
  }

  function handleDiceSelect(ind) {

    setDiceList(function (prevValue) {
      return prevValue.map((ele, index) => (index == ind) ? { ...ele, isSelect: !ele.isSelect } : ele)
    })

  }

  return (
    <main>
      {gameWon && <Confetti />}

      <section className="header-section">
        {gameWon && <h3>Congratulations, You WON</h3>}
        <h1>Tenzies</h1>
        <p>Roll until all dices are same. Click each dice to freeze it at its current value between rolls.</p>
      </section>
      <section className="dice-section">
        {diceArrayElement}
      </section>
      <section className="btn-section">
        <button onClick={handleDiceRoll}>{(gameWon) ? 'New Game' : 'Roll'}</button>
      </section>
    </main>

  )
}

export default App
