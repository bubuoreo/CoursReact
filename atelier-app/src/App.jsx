import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export const App = (props) => {
  const [count, setCount] = useState(0)

  return (
      <div>
        <h1>Bonjour</h1>
      </div>
  );
}

export default App
