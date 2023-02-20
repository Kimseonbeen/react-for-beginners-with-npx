import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUSD] = useState(0);
  const [seleted, setSelected] = useState([
    {
      symbol: "",
      price: "",
    },
  ]);
  const { symbol, price } = seleted;
  const onChange = (evnet) => setUSD(evnet.target.value);
  const handleSelect = (event) => {
    setSelected({
      symbol: event.target.value.split(":")[0],
      price: event.target.value.split(":")[1],
    });
    setUSD(0);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setSelected(json[0].symbol);
        setSelected({
          symbol: json[0].symbol,
          price: json[0].quotes.USD.price,
        });
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={handleSelect}>
          {coins.map((coin) => (
            <option
              key={coin.id}
              value={loading ? null : coin.symbol + ":" + coin.quotes.USD.price}
            >
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <p>selected : {symbol}</p>
      <p>price : {price}</p>
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
      <input value={(1 / price) * usd} type="number" disabled={true} />
    </div>
  );
}

export default App;
