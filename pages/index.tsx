import type { NextPage } from 'next'
import { useState } from 'react'
// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as Web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState<number|string>(0) // <-- Typescripting!
  const [address, setAddress] = useState('')
  const [exec, setExec] = useState<boolean|string>('🤔')

  const addressSubmittedHandler = (address: string) => {
    try {
        setAddress(address)
        const key = new Web3.PublicKey(address)
        const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
        connection.getBalance(key)
        .then(bal => {
            setBalance(bal / Web3.LAMPORTS_PER_SOL)
        })
        connection.getAccountInfo(key)
        .then(accInfo => {
            if(accInfo?.executable) { // optional chaining
                setExec('yep')
            } else if (accInfo?.executable === undefined) {
                setExec('is this an untouched account?')
            } else {
                setExec('nope')
            }
        })
    } catch (err) {
        setAddress(`${err}`) // <-- 🤓
        setBalance('Invalid') // <-- cuz Typescripting!
        setExec('😅')

        alert(err)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is executable? ${exec}`}</p>
      </header>
    </div>
  )
}

export default Home
