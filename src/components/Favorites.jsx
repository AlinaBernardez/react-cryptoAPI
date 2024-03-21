import { useState, useEffect } from 'react';
import styles from "./Home.module.css"
import { Link } from 'react-router-dom';
import { fetchCoins } from '../utils/coins';

let favs = [];

function Favorites() {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getData = async() => {
      const data = await fetchCoins()
      setCoins(data.data)
    }
    getData()
    favs = JSON.parse(localStorage.getItem('favoriteCoins'))
    if(favs) {
      coins.map(coin => {
        favs.map(sto => {
          if(coin.id == sto.id) {
            favs.push(coin)
            setFavorites([...favorites, favs])
          }
        })
      })
    }
  }, [])

  const deleteCoin = (id) => {
    let edited = favs.filter(fav => fav.id !== id )
    localStorage.setItem('favoriteCoins', JSON.stringify(edited))
    favs = edited
    setFavorites(edited)
  }

  const deleteAllCoins = () => {
    localStorage.clear()
    favs = []
    setFavorites([])
  }

  return (
    <>
      <h2>Favorite Coins</h2>
      <button onClick={() => deleteAllCoins()}>Delete all</button>
      <ul className={styles.cardWrap}>
      {favs ? (favs.map(fav => (
        <li key={fav.id} className={styles.card} >
          <h2 className={styles.title}>{fav.name}</h2>
          <p className={styles.symbol}>{fav.symbol}</p>
          <p className={styles.text}>{fav.priceUsd}</p>
          <button onClick={() => deleteCoin(fav.id)}>Delete</button>
          <Link to={`/coin/${fav.id}`}>View</Link>
        </li>
      ))) : (
        <p>No coins stored</p>
      )}
      </ul>
    </>
  )
}

export default Favorites
