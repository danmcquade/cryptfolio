import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import './Dashboard.css'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coins: [],
      loaded: false,
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
        this.setState({coins: JSON.parse(JSON.stringify(result)), loaded: true})
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
      const iconImage = '/icons/' + coin.symbol.toLowerCase() + '.png'
      const detailUrl = '/detail/' + coin.id
      const altTxt = `${coin.name} icon image`
      return (
        <div className='coin-detail' key={index} style={divStyle}>
          <img className='crypto-icon' alt={altTxt} src={iconImage} />
          <p><strong>Name:</strong> <Link to={detailUrl}>{coin.name}</Link></p>
          <p><strong>Symbol:</strong> {coin.symbol}</p>
          <p><strong>Price (USD):</strong> ${this.props.currencyFormat(parseFloat(coin.price_usd))}</p>
          <p><strong>Change (24H): <span style={changeColor}>{parseFloat(coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(coin.percent_change_24h).toFixed(2)}%</span></strong></p>
        </div>
      )
    })
    if (!this.state.loaded) {
      return (
        <div>
          <h1>Dashboard</h1>
          <div className='coins-container'>
            <h3>Loading...</h3>
          </div>
        </div>
      )
    } else {
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
}

export default Dashboard
