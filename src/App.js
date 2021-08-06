import { useEffect, useState } from "react";
import axios from "axios";
import Coin from "./Coin";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error is present");
      });
  }, []);
  const chng = (e) => {
    setsearch(e.target.value);
  };
  const filtered = coins.filter((elem) => {
   return elem.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Searh Crypto Currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Seacrh Crypto Currency"
            onChange={chng}
          />
        </form>
      </div>

      {filtered.map((elem) => {
        return <Coin key={elem.id} 
        name={elem.name} 
        image={elem.image} 
        symbol={elem.symbol}
        volume={elem.market_cap}
        price={elem.current_price}
        priceChange={elem.price_change_percentage_24h}
        />;
      })}
    </div>
  );
}

export default App;
