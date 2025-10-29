import './index.css'
import Dice from './components/Dice'

function App() {

  // Intialize  dice array  with 10 items 
  const diceArray = new Array(10).fill(0).map((ele) => ele = 1)

  // Dice Array Element intialized 
  const diceArrayElement = diceArray.map((dice) => <Dice value={dice} />)

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
       <button>Roll</button>
      </section>
    </main>

  )
}

export default App
