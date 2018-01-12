import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'

class DetailModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coin: null
    }
  }

  componentDidMount () {
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/coins/' + this.props.coin_id,
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

  addPosition (url) {
    this.props.history.push(url)
  }

  render () {
    const iconStyle = {width: '100px'}
    if (!this.state.loaded) {
      return (
        <h3>Loading...</h3>
      )
    } else {
      const iconImage = 'https://s3.amazonaws.com/cryptfolio-cdn/icons/' + this.state.coin.symbol.toLowerCase() + '.png'
      let changeColor1H = {}
      let changeColor24H = {}
      let changeColor7D = {}
      if (this.state.coin.percent_change_1h > 0) {
        changeColor1H = {color: 'green'}
      } else {
        changeColor1H = {color: 'red'}
      }
      if (this.state.coin.percent_change_24h > 0) {
        changeColor24H = {color: 'green'}
      } else {
        changeColor24H = {color: 'red'}
      }
      if (this.state.coin.percent_change_7d > 0) {
        changeColor7D = {color: 'green'}
      } else {
        changeColor7D = {color: 'red'}
      }
      return (
        <div>
          <div className='detail-image-container'><img src={iconImage} alt={`${this.state.coin.name} Logo`}style={iconStyle} /></div>
          <div className='coin-detail-container'>
            <p><strong>Currency Name:</strong> {this.state.coin.name}</p>
            <p><strong>Ticker Symbol:</strong> {this.state.coin.symbol}</p>
            <p><strong>Price (USD):</strong> ${this.props.currencyFormat(parseFloat(this.state.coin.price_usd))}</p>
            <p><strong>Change (1 hour): <span style={changeColor1H}>{parseFloat(this.state.coin.percent_change_1h) > 0 ? '+' : null}{parseFloat(this.state.coin.percent_change_1h).toFixed(2)}%</span></strong></p>
            <p><strong>Change (24 hours): <span style={changeColor24H}>{parseFloat(this.state.coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(this.state.coin.percent_change_24h).toFixed(2)}%</span></strong></p>
            <p><strong>Change (1 week): <span style={changeColor7D}>{parseFloat(this.state.coin.percent_change_7d) > 0 ? '+' : null}{parseFloat(this.state.coin.percent_change_7d).toFixed(2)}%</span></strong></p>
          </div>
          <div className='detail-buttons'>
            { this.props.loggedIn ? <button onClick={(e) => { this.addPosition(`/positions/new/${this.state.coin.symbol}`) }}>Add</button> : null }
            <button onClick={this.props.toggleModal}>Close</button>
          </div>
        </div>
      )
    }
  }
}

export default withRouter(DetailModal)
