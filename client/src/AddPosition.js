import React, { Component } from 'react'
import $ from 'jquery'

class AddPosition extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: {},
      currencies: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    let newPosition = {}
    e.preventDefault()
    let currency = e.target[0].value
    let shares = e.target[1].value
    let price = e.target[2].value
    let date = e.target[3].value
    newPosition = {currency: currency, shares: shares, purchase_price: price, purchase_date: date}
    console.log(newPosition)
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
          console.log('New position posted')
          goBack()
        },
        error: function (xhr) {
          console.log('Fetch user data from API failed')
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
        console.log(result)
        this.setState({currencies: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetching API data failed')
      }
    })
  }

  render () {
    let currencies = this.state.currencies.map((c, index) => {
      return (
        <option key={index} value={c.symbol}>{c.name} ({c.symbol})</option>
      )
    })

    return (
      <div>
        <h1>New Position</h1>
        <button onClick={() => { this.click() }}>Click</button>
        <form onSubmit={this.handleSubmit}>
          <p>Currency <select name='currency'>{currencies}</select></p>
          <p>Shares <input type='text' name='shares' /></p>
          <p>Purchase Price <input type='text' name='price' /></p>
          <p>Date <input type='text' name='date' /></p>
          <p><input type='submit' value='Add' /></p>
        </form>
      </div>
    )
  }
}

export default AddPosition
