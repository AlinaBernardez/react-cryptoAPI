import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { fetchCoinByID } from '../utils/coins';
import styles from "./Home.module.css"

let favorites = [];

function Coin() {
    const [coin, setCoin] = useState();
    let { id } = useParams();

    useEffect(() => {
        const getData = async() => {
            const data = await fetchCoinByID(id)
            setCoin(data.data)
        }
        getData()
    }, [])

    const addToFavorite = () => {
        const stored = JSON.parse(localStorage.getItem('favoriteCoins'))
        if(stored) {
            stored.map(item => {
                if(item.id !== coin.id) {
                    console.log(coin.id)
                    favorites.push(coin)
                    localStorage.setItem('favoriteCoins', JSON.stringify(favorites))
                }
            })
        }
        else {
            favorites.push(coin)
            localStorage.setItem('favoriteCoins', JSON.stringify(favorites))
        }
    }

    return (
        <>
        {coin ? (
            <div className={styles.coinCard}>
                <h2 className={styles.coinTitle}>{coin.name}</h2>
                <p><b>RANK:</b> {coin.rank}</p>
                <p><b>SYMBOL:</b> {coin.symbol}</p>
                <p><b>SUPPLY:</b> {coin.supply}</p>
                <p><b>MAX SUPPLY:</b> {coin.maxSupply}</p>
                <p><b>MARKET CAP:</b> {coin.marketCapUsd}</p>
                <p><b>VOLUME 24H:</b> {coin.volumeUsd24Hr}</p>
                <p><b>PRICE (Usd):</b> {coin.priceUsd}</p>
                <p><b>CHANGE (%):</b> {coin.changePercent24Hr}</p>
                <p><b>VWAP 24H:</b> {coin.vwap24Hr}</p>
                <button className={styles.Btn} onClick={addToFavorite}>Añadir a favoritos</button>
            </div>
        ) : (
            'Loading'
        )}
        </>
    )
}

export default Coin