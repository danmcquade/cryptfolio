import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Header from './Header'
import './AddPosition.css'

class AddPosition extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: {},
      defaultCoin: '',
      theCoin: 'BTC',
      coin: {},
      currencies: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateCurrency (e) {
    let newCurrency = e.target.value
    console.log(newCurrency)
    this.setState({theCoin: newCurrency, defaultCoin: newCurrency}, this.fetchCoin(newCurrency))
  }

  fetchCoin (newCurrency) {
    console.log('Fetching coin')
    console.log('Fetching coin deatil for id: ' + newCurrency)
    $.ajax({
      url: 'http://localhost:3001/api/coin_symbol/' + newCurrency,
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result)
        this.setState({coin: JSON.parse(JSON.stringify(result[0])), loaded: true})
      },
      error: function (xhr) {
        console.log('Fetching API data failed')
      }
    })
  }

  handleSubmit (e) {
    let newPosition = {}
    e.preventDefault()
    let currency = e.target[0].value
    let shares = e.target[1].value
    let price = e.target[2].value
    let date = e.target[3].value
    newPosition = {currency: currency, shares: shares, purchase_price: price, purchase_date: date}
    const goBack = function () {
      this.props.history.push('/positions')
    }.bind(this)
    this.setState({position: newPosition}, () => {
      let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
      $.ajax({
        url: 'http://localhost:3001/api/positions',
        type: 'POST',
        data: this.state.position,
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
        success: function (result) {
          goBack()
        },
        error: function (xhr) {
          console.log('Post new position failed')
        }
      })
    })
  }

  componentDidMount () {
    $.ajax({
      url: 'http://localhost:3001/api/coins/list',
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({currencies: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetching currency list from API failed')
      }
    })
    if (this.props.match.params.currency) {
      this.setState({defaultCoin: this.props.match.params.currency})
      this.fetchCoin(this.props.match.params.currency)
    } else {
      this.fetchCoin('BTC')
    }
    document.getElementById('datePicker').valueAsDate = new Date()
  }

  render () {
    let currencies = this.state.currencies.map((c, index) => {
      return (
        <option key={index} value={c.symbol}>{c.name} ({c.symbol})</option>
      )
    })

    let changeColor = {}
    if (this.state.coin.percent_change_24h > 0) {
      changeColor = {color: 'green'}
    } else {
      changeColor = {color: 'red'}
    }
    // const iconImage = '/icons/' + this.state.coin.id.toLowerCase() + '.png'
    const detailUrl = '/detail/' + this.state.coin.id
    const altTxt = `${this.state.coin.name} icon image`
    let coinDetail = ''
    if (!this.state.coin.symbol) {
      coinDetail = <h3>Loading....</h3>
    } else {
      coinDetail =
        <div className='add-coin-detail'>
          <img className='add-icon' src={`/icons/${this.state.coin.symbol}.png`} alt={altTxt} />
          <p><strong>Name:</strong> <Link to={detailUrl}>{this.state.coin.name}</Link></p>
          <p><strong>Symbol:</strong> {this.state.coin.symbol}</p>
          <p><strong>Price (USD):</strong> ${this.props.currencyFormat(parseFloat(this.state.coin.price_usd))}</p>
          <p><strong>Change (24H): <span style={changeColor}>{parseFloat(this.state.coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(this.state.coin.percent_change_24h).toFixed(2)}%</span></strong></p>
        </div>
    }

    return (
      <div>
        <Header />
        <h1>New Position</h1>
        <div className='add-container'>
          {coinDetail}
          <div className='add-form'>
            <form onSubmit={this.handleSubmit}>
              <p>Currency <select name='currency' onChange={(e) => this.updateCurrency(e)} value={this.state.defaultCoin}>{currencies}</select></p>
              <p>Shares <input className='edit-input' type='text' name='shares' /></p>
              <p>Purchase Price <input className='edit-input' type='text' name='price' /></p>
              <p>Date <input className='edit-input' id='datePicker' type='date' name='date' /></p>
              <p><input type='submit' value='Add' /></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddPosition
