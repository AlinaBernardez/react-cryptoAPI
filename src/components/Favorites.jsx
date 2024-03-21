import { useState, useEffect } from 'react';
import styles from "./Home.module.css"
import { Link } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favoriteCoins'))
    if(stored) {
      setFavorites(stored)
    }
    console.log(localStorage)
  }, [])

  const deleteCoin = (id) => {
    let edited = favorites.filter(fav => fav.coin.id !== id )
    localStorage.setItem('favoriteCoins', JSON.stringify(edited))
    setFavorites(edited)
  }

  const deleteAllCoins = () => {
    localStorage.clear()
    setFavorites([])
  }

  return (
    <>
      <h2>Favorite Coins</h2>
      <button onClick={deleteAllCoins}>Delete all</button>
      <ul className={styles.cardWrap}>
      {favorites ? (favorites.map(c => (
        <li  className={styles.card} key={c.coin.id}>
          <h2 className={styles.title}>{c.coin.name}</h2>
          <p className={styles.symbol}>{c.coin.symbol}</p>
          <p className={styles.text}>{c.coin.priceUsd}</p>
          <button onClick={() => deleteCoin(c.coin.id)}>Delete</button>
          <Link to={`/coin/${c.coin.id}`}>View</Link>
        </li>
      ))) : (
        <p>No coins stored</p>
      )}
      </ul>
    </>
  )
}

export default Favorites
