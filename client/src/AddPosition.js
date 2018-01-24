import React, { Component } from 'react'
import $ from 'jquery'
import Header from './Header'
import { API_ENDPOINT } from './Api'
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
    this.setState({theCoin: newCurrency, defaultCoin: newCurrency}, this.fetchCoin(newCurrency))
  }

  fetchCoin (newCurrency) {
    $.ajax({
      url: API_ENDPOINT + '/api/coin_symbol/' + newCurrency,
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
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
        url: API_ENDPOINT + '/api/positions',
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
      url: API_ENDPOINT + '/api/coins/list',
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
    if ($('[type="date"]').prop('type') === 'date') {
      document.getElementById('datePicker').valueAsDate = new Date()
    }
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
    const altTxt = `${this.state.coin.name} icon image`
    let coinDetail = ''
    if (!this.state.coin.symbol) {
      coinDetail = <img src='https://s3.amazonaws.com/cryptfolio-cdn/spinner.svg' className='loading-spinner' alt='Loading Data' />
    } else {
      coinDetail =
        <div className='add-coin-detail'>
          <div className='add-coin-detail-image'>
            <img className='add-icon' src={`https://s3.amazonaws.com/cryptfolio-cdn/icons/${this.state.coin.symbol.toLowerCase()}.png`} alt={altTxt} />
          </div>
          <div className='add-coin-detail-data'>
            <p><strong>Name:</strong> {this.state.coin.name}</p>
            <p><strong>Symbol:</strong> {this.state.coin.symbol}</p>
            <p><strong>Price (USD):</strong> ${this.props.currencyFormat(parseFloat(this.state.coin.price_usd))}</p>
            <p><strong>Change (24H): <span style={changeColor}>{parseFloat(this.state.coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(this.state.coin.percent_change_24h).toFixed(2)}%</span></strong></p>
          </div>
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
              <p>Price <input className='edit-input' type='text' name='price' /></p>
              <p>Date <input className='edit-input' id='datePicker' type='date' name='date' /></p>
              <p className='add-button'><button onClick={() => { this.handleSubmit }}>Add</button></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default AddPosition
