import React, { Component } from 'react'
import $ from 'jquery'

class AddPosition extends Component {
  constructor (props) {
    super(props)
    this.state = {
      position: {}
    }
    this.stateIsSet = this.stateIsSet.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  goBack () {
    this.props.history.push('/positions')
  }

  stateIsSet () {
    console.log('State has been set!')
  }

  handleSubmit (e) {
    let newPos = {}
    e.preventDefault()
    let currency = e.target[0].value
    let shares = e.target[1].value
    let price = e.target[2].value
    let date = e.target[3].value
    newPos = {currency: currency, shares: shares, purchase_price: price, purchase_date: date}
    console.log(newPos)
    this.setState({position: newPos}, () => {
      let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
      $.ajax({
        url: 'http://localhost:3001/api/positions',
        type: 'POST',
        data: this.state.position,
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
        success: function (result) {
          console.log('New position posted')
        },
        error: function (xhr) {
          console.log('Fetch user data from API failed')
        }
      })
    })
  }

  render () {
    return (
      <div>
        <h1>New Position</h1>
        <button onClick={() => { this.click() }}>Click</button>
        <form onSubmit={this.handleSubmit}>
          <p>Currency <input type='text' name='currency' /></p>
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
