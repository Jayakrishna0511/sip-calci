import { useState } from 'react'
import './App.css'
// import './SipCalculator.css';
import SipCalculator from './components/SipCalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <SipCalculator/>
    </>
  )
}

export default App
