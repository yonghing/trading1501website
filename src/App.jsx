import { useState } from 'react'
import reactLogo from './assets/react.svg'
import trading1501Logo from './assets/TRADING1501.png'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from "swr";

function App() {
  const [count, setCount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [pair, setPair] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("https://nextjs-fastapi-henna.vercel.app/api/py/db", fetcher);

  //console.log(data) 
  //console.log(location.search);
  //console.log(location.href.split('?')[0]);

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

{
      location.search && location.search.includes("query=fastapi") ?
      (<><a href={location.href.split('?')[0]}>Go to Homepage</a></>)
      : 
      (<><a href={location.href.split('?')[0]+'?query=fastapi'}>Focus on FastAPI section</a>
      <h1>Trading1501 Filter Analysis</h1>
      <div className="card">
        <button autoFocus={!period} onClick={() => setPeriod(0)}>
          M15
        </button>
        <button onClick={() => setPeriod(1)}>
          H4
        </button>
        <button onClick={() => setPeriod(2)}>
          Daily
        </button>
      </div>
      </>)
}

{
      location.search && location.search.includes("query=fastapi") ?
      (<>
        <h2>The Power of FastAPI: </h2>
        <div>
          <ul>
            <li>Fast Performance - FastAPI is built on top of well-established libraries - Starlette and Pydantic.</li>
            <li>Fast to Code - FastAPI's syntax and methodology are understandable to developers who are familiar with Python.</li>
            <li>Asynchronous Server Gateway Interface (ASGI) support. </li>
            <li>Built-in OpenAPI spec (Swagger).</li>
            <li>Excellent choice for developing API-centric applications.</li>
          </ul>
        </div>
        <h2>Demo of CRUD app of FastAPI:</h2>
        <div>
          <p>Backend(API docs) URL: <a target="_blank" href="https://crud-fastapi-dusky.vercel.app/api/py/docs">https://crud-fastapi-dusky.vercel.app/api/py/docs</a></p>
          <p>Frontend(Demo app) URL: <a target="_blank" href="https://react-crud-fastapi-app.vercel.app">https://react-crud-fastapi-app.vercel.app</a> </p>
        </div>
      </>)
      : 
      (<>
      { isLoading && <h2>Loading...</h2> }

      { (period === 0) && data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div key={index+1} >
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
          <button className="triple-button" onClick={() => {setPeriod(3); setPair(pair.symbol);}}>triple</button>
          </h2>
          <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"M15.png?t="+Date.now()} />
        </div>
      ))}

      { (period === 1) && data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div key={index+1} >
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
          <button className="triple-button" onClick={() => {setPeriod(3); setPair(pair.symbol);}}>triple</button>
          </h2>
          <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"H4.png?t="+Date.now()} />
        </div>
      ))}

      { (period === 2) && data && data.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div key={index+1} >
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
          <button className="triple-button" onClick={() => {setPeriod(3); setPair(pair.symbol);}}>triple</button>
          </h2>
          <img key={index} className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"D1.png?t="+Date.now()} />
        </div>
      ))}


      { (period === 3) && 
        <>
        <h2>{pair} triple charts</h2>
        <h2>{pair} Daily</h2>
        <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair+"D1.png?t="+Date.now()} />
        <h2>{pair} H4</h2>
        <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair+"H4.png?t="+Date.now()} />
        <h2>{pair} M15</h2>
        <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair+"M15.png?t="+Date.now()} />
        </>
      }
      </>)

}

      <p>
        <span>&#9993;</span> ai@trading1501.com
      </p>

      <div>
        <span>This website is built with React.js </span>
        <img width="25" style={{verticalAlign: "middle"}} src={reactLogo} alt="React logo" />
      </div>

      <div>
        <h3>Jobs Worldwide</h3>
        <span><a href="https://www.linkedin.com/jobs/python-jobs-worldwide">Python Jobs in Worldwide</a></span><br/>
        <span><a href="https://www.linkedin.com/jobs/javascript-jobs-worldwide">JavaScript Jobs in Worldwide</a></span><br/>
        <span><a href="https://survey.stackoverflow.co/2024/technology">Most popular technologies</a></span>
      </div>

    </>
  )
}

export default App
