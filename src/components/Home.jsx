import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { fetchCoins } from '../utils/coins';
import styles from "./Home.module.css"

function Home() {
const [coins, setCoins] = useState([]);

useEffect(() => {
    const getData = async() => {
        const data = await fetchCoins()
        setCoins(data.data)
        // console.log(data.data)
    }
    getData()
}, [coins])

    return(
        <>
            <h1>Home</h1>
            <ul className={styles.cardWrap}>
            {coins ? (coins.map((coin) => (
                <Link key={coin.id} to={`/coin/${coin.id}`}>
                    <li className={styles.card}>
                        <h2 className={styles.title}>{coin.name}</h2>
                        <p className={styles.symbol}>{coin.symbol}</p>
                        <p className={styles.text}>{coin.priceUsd}</p>
                    </li>
                </Link>
            ))) : (
                <h2>LOADING</h2>
            )}
            </ul>
        </>
    )
}

export default Home