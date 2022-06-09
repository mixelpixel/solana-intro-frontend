// import * as Web3 from '@solana/web3.js'
const Web3 = require('@solana/web3.js')
// console.log(Web3)

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
// console.log('connection:', connection)

const key = new Web3.PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")
// console.log('key:', key)

const balance = connection.getBalance(key).then(bal_info => {
    console.log('balance info:', bal_info / Web3.LAMPORTS_PER_SOL)
})

const acctInfo = connection.getAccountInfo(key).then(acc_info => {
    console.log('account info:', acc_info)
    console.log('is executable?', acc_info.executable)
})
