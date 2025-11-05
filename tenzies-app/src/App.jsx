import './index.css'
import Dice from './components/Dice'
import React from 'react'
import { nanoid } from 'nanoid'

function App() {

  // Intialize  dice array  with 10 items 
  const diceArray = new Array(10).fill(0).map((ele) => {
    return { 'isSelect': false, 'value': ele = Math.ceil(Math.random() * 6) }
  }
  )

  const [diceList, setDiceList] = React.useState(diceArray)

  console.log(diceList);
  // Dice Array Element intialized 
  const diceArrayElement = diceList.map((dice, index) =>
    <Dice key={nanoid()} value={dice.value} handleDiceSelect={() => handleDiceSelect(index)} isSelect={dice.isSelect} />)


  // Dice roll function
  function handleDiceRoll() {

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
      <section className="header-section">
        <h1>Tenzies</h1>
        <p>Roll until all dices are same. Click each dice to freeze it at its current value between rolls.</p>
      </section>
      <section className="dice-section">
        {diceArrayElement}
      </section>
      <section className="btn-section">
        <button onClick={handleDiceRoll}>Roll</button>
      </section>
    </main>

  )
}

export default App
