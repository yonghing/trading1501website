import { useState } from 'react'
import reactLogo from './assets/react.svg'
import trading1501Logo from './assets/TRADING1501.png'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from "swr";

function App() {
  const [count, setCount] = useState(0);
  const [period, setPeriod] = useState(0);

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
        /*}
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        */}
      </div>
      <h1>Trading1501 Filter Analysis</h1>
      <div className="card">
        <button onClick={() => setPeriod(0)}>
          M15
        </button>
        <button onClick={() => setPeriod(1)}>
          H4
        </button>
        <button onClick={() => setPeriod(2)}>
          Daily
        </button>
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

      { isLoading && <h2>Loading...</h2> }

      { (period === 0) && data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div>
          <h2>{index+1}&#41; {pair.symbol} 
          {(() => {
            switch (period) {
              case 0:
                return " M15"
              case 1:
                return " H4"
              case 2:
                return " Daily"
              default:
                return null
            }
          })()}
          </h2>
          <img key={index} className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"M15.png?t="+Date.now()} />
        </div>
      ))}

      { (period === 1) && data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div>
          <h2>{index+1}&#41; {pair.symbol} 
          {(() => {
            switch (period) {
              case 0:
                return " M15"
              case 1:
                return " H4"
              case 2:
                return " Daily"
              default:
                return null
            }
          })()}
          </h2>
          <img key={index} className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"H4.png?t="+Date.now()} />
        </div>
      ))}

      { (period === 2) && data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div>
          <h2>{index+1}&#41; {pair.symbol} 
          {(() => {
            switch (period) {
              case 0:
                return " M15"
              case 1:
                return " H4"
              case 2:
                return " Daily"
              default:
                return null
            }
          })()}
          </h2>
          <img key={index} className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"D1.png?t="+Date.now()} />
        </div>
      ))}

      <p>
        <span>&#9993;</span> ai@trading1501.com
      </p>

      <div>
        <span>This website is built with React.js </span>
        <img width="25" style={{verticalAlign: "middle"}} src={reactLogo} alt="React logo" />
      </div>



    </>
  )
}

export default App
