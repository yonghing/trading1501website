import { useState } from 'react'
import reactLogo from './assets/react.svg'
import trading1501Logo from './assets/TRADING1501.png'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from "swr";

function App() {
  const [count, setCount] = useState(0);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("https://nextjs-fastapi-henna.vercel.app/api/py/db", fetcher);

  //console.log(data) 

  return (
    <>
      <div>
        <img src={trading1501Logo} className="logo" alt="Trading1501 logo" />
        {/*
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        */}
      </div>
      <h1>Trading1501 Analysis</h1>
      <div className="card">
        <button>M15</button>
        {/*
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>  
        */}
        {/*      
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        */}
      </div>
      {/*
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      */}

      { data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div>
          <h2>{index+1}&#41; {pair.symbol}</h2>
          <img key={index} className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"M15.png?t="+Date.now()} />
        </div>
      ))}

    </>
  )
}

export default App
