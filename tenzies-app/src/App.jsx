import './index.css'
import Dice from './components/Dice'
import React from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const TIMER_VAlUE = 60

  const [diceList, setDiceList] = React.useState(() => generateAllNewDice())

  const [isRolling, setIsRolling] = React.useState(false);

  const [timer, setTimer] = React.useState(TIMER_VAlUE);

  const [gameOver, setGameOver] = React.useState(false);

  // Game won variable defined
  const gameWon = diceList.every((ele) => ele.isSelect) && diceList.every((ele) => ele.value === diceList[0].value);


  React.useEffect(function () {

    if (gameOver) return;

    const timer = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1 || gameWon) {
          console.log("here");
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }

  }, [gameOver, gameWon])

  // Dice Array Element intialized 
  const diceArrayElement = diceList.map((dice, index) =>
    <Dice key={dice.id} value={dice.value}
      handleDiceSelect={() => handleDiceSelect(index)}
      isSelect={dice.isSelect}
      rolling={isRolling}
    />)




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

    setIsRolling(true); // start animation

    if (gameWon || gameOver) {
      setDiceList(generateAllNewDice())
      setTimer(TIMER_VAlUE)
      setGameOver(false);
      return;
    }

    setTimeout(() => {
      setDiceList(function (prevValue) {
        return prevValue.map((ele) =>
          (ele.isSelect) ? ele : { ...ele, value: Math.ceil(Math.random() * 6) }
        )
      })
      setIsRolling(false); // end animation
    }, 600); // matches CSS animation duration


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
        {!gameWon && <h1>{timer} sec</h1>}
        {(gameOver && !gameWon) && <h3>Sorry, You have lost the game</h3>}
        {gameWon && <h3>Congratulations, You WON</h3>}
        <h1>Tenzies</h1>
        <p>Roll until all dices are same. Click each dice to freeze it at its current value between rolls.</p>
      </section>
      <section className="dice-section">
        {diceArrayElement}
      </section>
      <section className="btn-section">
        <button onClick={handleDiceRoll}>{(gameWon || gameOver) ? 'New Game' : 'Roll'}</button>
      </section>
    </main>

  )
}

export default App
