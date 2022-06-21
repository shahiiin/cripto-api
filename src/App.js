
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=100&sparkline=false')
      .then(res => {
        setData(res.data)
        console.log(res.data, 'data is here')
      }).catch(err => (console.log(err)))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const filteredCoin = data.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search a currency"
            className='coin-input'
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoin.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
          />
        )
      })
      }
    </div>
  );
}

export default App;
