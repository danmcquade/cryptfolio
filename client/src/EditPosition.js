import React, { Component } from 'react'
import $ from 'jquery'
import Header from './Header'
import './EditPosition.css'

class EditPosition extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position_id: this.props.match.params.id,
      position: {
        name: '',
        symbol: '',
        price: 0,
        shares: 0,
        date: '1900-01-01'
      },
      currencies: [],
      updatedPosition: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    let updatedPosition = {}
    e.preventDefault()
    let positionId = this.state.position.id
    let currency = this.state.position.symbol
    let shares = this.state.position.shares
    let price = this.state.position.price
    let date = this.state.position.date
    updatedPosition = {position_id: positionId, currency: currency, shares: shares, purchase_price: price, purchase_date: date}
    console.log(updatedPosition)
    const goBack = function () {
      this.props.history.push('/positions')
    }.bind(this)
    this.setState({updatedPosition: updatedPosition}, () => {
      let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
      $.ajax({
        url: 'https://cryptfolio-api.herokuapp.com/api/positions/' + this.state.position.id,
        type: 'PUT',
        data: this.state.updatedPosition,
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
        success: function (result) {
          goBack()
        },
        error: function (xhr) {
          console.log('Edit position failed')
        }
      })
    })
  }

  updateCurrency (e) {
    let newCurrency = e.target.value
    console.log(newCurrency)
    this.setState(prevState => ({
      position: {
        ...prevState.position,
        symbol: newCurrency
      }
    }))
  }

  updateShares (e) {
    let newShares = parseInt(e.target.value, 10)
    this.setState(prevState => ({
      position: {
        ...prevState.position,
        shares: newShares
      }
    }))
  }

  updatePrice (e) {
    let newPrice = e.target.value
    this.setState(prevState => ({
      position: {
        ...prevState.position,
        price: newPrice
      }
    }))
  }

  updateDate (e) {
    let newDate = e.target.value
    this.setState(prevState => ({
      position: {
        ...prevState.position,
        date: newDate
      }
    }))
  }

  componentDidMount () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/coins/list',
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({currencies: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetching currency list from API failed')
      }
    }).then(
      $.ajax({
        url: 'https://cryptfolio-api.herokuapp.com/api/positions/' + this.state.position_id,
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
        context: this,
        success: function (result) {
          console.log(result)
          this.setState({position: JSON.parse(JSON.stringify(result))})
        },
        error: function (xhr) {
          console.log('Fetching position from API failed')
        }
      })
    )
  }

  render () {
    let currencies = this.state.currencies.map((c, index) => {
      return (
        <option key={index} value={c.symbol} selected={c.name === this.state.position.name ? 'selected' : null}>{c.name} ({c.symbol})</option>
      )
    })

    return (
      <div>
        <Header />
        <h1>Edit Position</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Currency <select name='currency' onChange={(e) => this.updateCurrency(e)}>{currencies}</select></p>
          <p>Shares <input className='edit-input' type='text' name='shares' onChange={(e) => this.updateShares(e)} value={this.state.position.shares} /></p>
          <p>Purchase Price <input className='edit-input' type='number' name='price' onChange={(e) => this.updatePrice(e)} value={this.state.position.price} /></p>
          <p>Date <input type='date' className='edit-input' name='date' onChange={(e) => this.updateDate(e)} value={this.state.position.date} /></p>
          <p><input type='submit' value='Update' /></p>
        </form>
      </div>
    )
  }
}

export default EditPosition
