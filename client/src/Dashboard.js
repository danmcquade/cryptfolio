import React, { Component } from 'react'
import $ from 'jquery'
import './Dashboard.css'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coins: [],
      login: false
    }
  }

  currencyFormat (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
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
        width: '185px'
      }
      let changeColor = {}
      if (coin.percent_change_24h > 0) {
        changeColor = {color: 'green'}
      } else {
        changeColor = {color: 'red'}
      }
      return (
        <div className='coin-detail' key={index} style={divStyle}>
          <p><strong>Name:</strong> {coin.name}</p>
          <p><strong>Symbol:</strong> {coin.symbol}</p>
          <p><strong>Price (USD):</strong> ${this.currencyFormat(parseFloat(coin.price_usd))}</p>
          <p><strong>Change (24H): <span style={changeColor}>{parseFloat(coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(coin.percent_change_24h).toFixed(2)}%</span></strong></p>
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
