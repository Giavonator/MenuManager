import { useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("No updates!");
  const [isPending, startTransition] = useTransition();

  const callBackend = async () => {
    startTransition(async () => {
      const backendResponse: Response = await fetch("https://menumanager.giavonator.deno.net");
      setText(await backendResponse.text());
    })
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() =>  {
          setCount((count) => count + 1);
          callBackend();
          }} disabled={isPending}>
          count is {count}
        </button> 
        <p>{isPending ? "Updating..." : text}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
