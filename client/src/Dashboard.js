import React, { Component } from 'react'
import $ from 'jquery'
import './Dashboard.css'

Number.prototype.formatMoney = function(z, x, y){
  let n = this
  let c = isNaN(z = Math.abs(z)) ? 2 : z
  let d = x === undefined ? '.' : x
  let t = y === undefined ? ',' : y
  let s = n < 0 ? '-' : ''
  let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
  let j = (j = i.length) > 3 ? j % 3 : 0
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
 }

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coins: [],
      login: false
    }
  }

  componentDidMount () {
    $.ajax({
      url: 'http://localhost:3001/api/coins',
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result)
        this.setState({coins: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetching API data failed')
      }
    })
  }

  render () {
    const allCoins = this.state.coins.map((coin, index) => {
      let divStyle = {
        margin: '15px',
        width: '175px'
      }
      let changeColor = {}
      if (coin.percent_change_24h > 0) {
        changeColor = {color: 'green'}
      } else {
        changeColor = {color: 'red'}
      }
      let price = coin.price_usd
      return (
        <div className='coin-detail' key={index} style={divStyle}>
          <p><strong>Name:</strong> {coin.name}</p>
          <p><strong>Symbol:</strong> {coin.symbol}</p>
          <p><strong>Price:</strong> ${parseFloat(coin.price_usd).formatMoney(2)}</p>
          <p><strong>Change: <span style={changeColor}>{parseFloat(coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(coin.percent_change_24h).toFixed(2)}</span></strong></p>
        </div>
      )
    })
    return (
      <div>
        <h1>Dashboard</h1>
        <div className='coins-container'>
          {allCoins}
        </div>
      </div>
    )
  }
}

export default Dashboard
