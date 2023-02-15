import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUSD] = useState(0);
  const onChange = (evnet) => setUSD(evnet.target.value);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <h2>USD TO Coin Convert</h2>
      <div>
        <input
          value={usd}
          onChange={onChange}
          type="number"
          placeholder="write to USD"
        />
      </div>
      <input type="number" disabled="true" />
    </div>
  );
}

export default App;
