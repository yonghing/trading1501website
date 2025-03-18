import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import trading1501Logo from './assets/TRADING1501.png'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from "swr";

function App() {
  //const [count, setCount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [pair, setPair] = useState("");
  const [symbol, setSymbol] = useState("");

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("https://nextjs-fastapi-henna.vercel.app/api/py/db", fetcher);

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  const upData = data && data.filter((d) => d.ma80 > d.ma480);
  const downData = data && data.filter((d) => d.ma80 < d.ma480);

  const uguData = data && data.filter((d) => (d.ma30 > d.ma80) && (d.ma80 > d.ma480));
  const ugdData = data && data.filter((d) => (d.ma30 < d.ma80) && (d.ma80 > d.ma480));
  const dguData = data && data.filter((d) => (d.ma30 > d.ma80) && (d.ma80 < d.ma480));
  const dgdData = data && data.filter((d) => (d.ma30 < d.ma80) && (d.ma80 < d.ma480));

  const uhuData = data && data.filter((d) => (d.ma5 > d.ma30) && (d.ma30 > d.ma80));
  const uhdData = data && data.filter((d) => (d.ma5 < d.ma30) && (d.ma30 > d.ma80));
  const dhuData = data && data.filter((d) => (d.ma5 > d.ma30) && (d.ma30 < d.ma80));
  const dhdData = data && data.filter((d) => (d.ma5 < d.ma30) && (d.ma30 < d.ma80));

  const dataSymbol =  symbol === "UP" ?
                      data && data.filter((d) => d.ma80 > d.ma480)
                      :
                      symbol === "DOWN" ?
                      data && data.filter((d) => d.ma80 < d.ma480)
                      :
                      symbol === "UGU" ?
                      data && data.filter((d) => (d.ma30 > d.ma80) && (d.ma80 > d.ma480))
                      :
                      symbol === "UGD" ?
                      data && data.filter((d) => (d.ma30 < d.ma80) && (d.ma80 > d.ma480))
                      :
                      symbol === "DGU" ?
                      data && data.filter((d) => (d.ma30 > d.ma80) && (d.ma80 < d.ma480))
                      :
                      symbol === "DGD" ?
                      data && data.filter((d) => (d.ma30 < d.ma80) && (d.ma80 < d.ma480))
                      :
                      symbol === "UHU" ?
                      data && data.filter((d) => (d.ma5 > d.ma30) && (d.ma30 > d.ma80))
                      :
                      symbol === "UHD" ?
                      data && data.filter((d) => (d.ma5 < d.ma30) && (d.ma30 > d.ma80))
                      :
                      symbol === "DHU" ?
                      data && data.filter((d) => (d.ma5 > d.ma30) && (d.ma30 < d.ma80))
                      :
                      symbol === "DHD" ?
                      data && data.filter((d) => (d.ma5 < d.ma30) && (d.ma30 < d.ma80))                      
                      :
                      symbol === "CRYPTO" ?
                      data && data.filter((d) => d.symbol.toLowerCase().includes("ethereum") || d.symbol.toLowerCase().includes("bitcoin")) 
                      :
                      data && data.filter((d) => d.symbol.toLowerCase().includes(symbol.toLowerCase()))

  //console.log(dataSymbol)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get('pair')) {
      //console.log(searchParams.get('pair'))
      setPeriod(3);
      setPair(searchParams.get('pair'));
    }

  }, [location.search]);

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
      location.search && (location.search.includes("query=algotrading") || location.search.includes("query=fastapi") || location.search.includes("pair="))?
      (<><a href={location.href.split('?')[0]}>Go to Homepage</a></>)
      : 
      (<><a href={location.href.split('?')[0]+'?query=algotrading'}>Algorithmic Trading section</a><span>  &#8226; </span><a href={location.href.split('?')[0]+'?query=fastapi'}>Focus on FastAPI section</a>
      <h1>Trading1501 Filter Analysis</h1>
      <div className="card">
        <button autoFocus={!period} onClick={() => {setPeriod(0); setSymbol("")}}>
          M15
        </button>
        <button onClick={() => {setPeriod(1); setSymbol("")}}>
          H1
        </button>
        <button onClick={() => {setPeriod(2); setSymbol("")}}>
          D1
        </button>
      </div>
      <div className="card">
        <button onClick={() => setSymbol("USD")}>
          USD
        </button>
        <button onClick={() => setSymbol("EUR")}>
          EUR
        </button>
        <button onClick={() => setSymbol("GBP")}>
          GBP
        </button>
        <button onClick={() => setSymbol("CAD")}>
          CAD
        </button>
        <button onClick={() => setSymbol("CHF")}>
          CHF
        </button>  
        <button onClick={() => setSymbol("JPY")}>
          JPY
        </button>    
        <button onClick={() => setSymbol("AUD")}>
          AUD
        </button>
        <button onClick={() => setSymbol("NZD")}>
          NZD
        </button>        
        <button onClick={() => setSymbol("CRYPTO")}>
          CRYPTO
        </button> 
        {/** 
        <button onClick={() => setSymbol("UP")}>
          D-UP ({upData && upData.length})
        </button>  
        <button onClick={() => setSymbol("DOWN")}>
          D-DOWN ({downData && downData.length})
        </button>   
        **/}  
      </div>
      {/** 
      <div className="card">
        <button onClick={() => setSymbol("UGU")}>
          D-UP-H4-UP ({uguData && uguData.length})
        </button>
        <button onClick={() => setSymbol("UGD")}>
          D-UP-H4-DOWN ({ugdData && ugdData.length})
        </button> 
        <button onClick={() => setSymbol("DGD")}>
          D-DOWN-H4-DOWN ({dgdData && dgdData.length})
        </button>
        <button onClick={() => setSymbol("DGU")}>
          D-DOWN-H4-UP ({dguData && dguData.length})
        </button>   
      </div>
      <div className="card">
        <button onClick={() => setSymbol("UHU")}>
          H4-UP-H1-UP ({uhuData && uhuData.length})
        </button>
        <button onClick={() => setSymbol("UHD")}>
          H4-UP-H1-DOWN ({uhdData && uhdData.length})
        </button> 
        <button onClick={() => setSymbol("DHD")}>
          H4-DOWN-H1-DOWN ({dhdData && dhdData.length})
        </button>
        <button onClick={() => setSymbol("DHU")}>
          H4-DOWN-H1-UP ({dhuData && dhuData.length})
        </button>   
      </div>
      **/}
      </>)
}

{
      location.search && location.search.includes("query=algotrading") ?
      (<>
        <h2>Algo Trading Web Resources: </h2>
        <div>
          <ul>
            <li><a href="https://www.fool.com/terms/a/algorithmic-trading/" target="_blank">What Is Algorithmic Trading?</a></li>
            <li><a href="https://epchan.com/financial-machine-learning" target="_blank">Financial Machine Learning</a></li>
          </ul>
        </div>
        <h2>Algorithmic Trading Platforms: </h2>
        <div>
          <ul>
            <li><a href="https://www.quantconnect.com/" target="_blank">QuantConnect</a></li>
            <li><a href="https://www.mql5.com/" target="_blank">MQL5</a></li>
          </ul>
        </div>
        <h2>Financial Machine Learning Frameworks: </h2>
        <div>
          <ul>
            <li><a href="https://alphapy.readthedocs.io/" target="_blank">AlphaPy</a></li>
          </ul>
        </div>
        <h2>Algorithmic Trading Books: </h2>
        <div>
          <ul>
            <li><a href="https://epchan.com/books" target="_blank">Ernest P. Chan</a></li>
          </ul>
        </div>
      </>)
      : 
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

      { (period === 0) && dataSymbol && dataSymbol.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div key={index+1} >
          <h2>{index+1}&#41; {pair.symbol} 
          {(() => {
            switch (period) {
              case 0:
                return " M15"
              case 1:
                return " H1"
              case 2:
                return " D1"
              default:
                return null
            }
          })()}
          <button className="triple-button" onClick={() => {window.open(location.href.split('?')[0]+'?pair='+pair.symbol, "_blank");}}>triple</button>
          </h2>
          <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"H1.png?t="+Date.now()} />
        </div>
      ))}

      { (period === 1) && dataSymbol && dataSymbol.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div key={index+1} >
          <h2>{index+1}&#41; {pair.symbol} 
          {(() => {
            switch (period) {
              case 0:
                return " M15"
              case 1:
                return " H1"
              case 2:
                return " D1"
              default:
                return null
            }
          })()}
          <button className="triple-button" onClick={() => {window.open(location.href.split('?')[0]+'?pair='+pair.symbol, "_blank");}}>triple</button>
          </h2>
          <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"D1.png?t="+Date.now()} />
        </div>
      ))}

      { (period === 2) && dataSymbol && dataSymbol.sort((a, b) => (a.symbol < b.symbol ? 1 : -1)).map((pair, index) => (
        <div key={index+1} >
          <h2>{index+1}&#41; {pair.symbol} 
          {(() => {
            switch (period) {
              case 0:
                return " M15"
              case 1:
                return " H1"
              case 2:
                return " D1"
              default:
                return null
            }
          })()}
          <button className="triple-button" onClick={() => {window.open(location.href.split('?')[0]+'?pair='+pair.symbol, "_blank");}}>triple</button>
          </h2>
          <img key={index} className="responsive-image" src={"https://server1501.cloud/charts/"+pair.symbol+"W1.png?t="+Date.now()} />
        </div>
      ))}


      { (period === 3) && 
        <>
        <h2>{pair} triple charts</h2>
        <h2>{pair} W1</h2>
        <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair+"W1.png?t="+Date.now()} />
        <h2>{pair} D1</h2>
        <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair+"D1.png?t="+Date.now()} />
        <h2>{pair} H1</h2>
        <img className="responsive-image" src={"https://server1501.cloud/charts/"+pair+"H1.png?t="+Date.now()} />
        </>
      }
      </>)

}
{/** 
      <p>
        <span>&#9993;</span> ai@trading1501.com
      </p>
**/}
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
