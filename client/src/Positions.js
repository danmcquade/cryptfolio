import React, { Component } from 'react'
import $ from 'jquery'
import './Positions.css'

class Positions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      positions: [],
      mine: [],
      loggedIn: false
    }
    this.click = this.click.bind(this)
  }

  componentDidMount () {
    $('.logout').hide()
    console.log('Login Component Mounted!')
    if (!localStorage.getItem('cryptfolio-jwt')) {
      console.log('Not logged in')
    } else {
      console.log('We have a token!')
      this.setState({loggedIn: true})
      this.getPositions()
    }
  }

  click () {
    console.log(JSON.parse(this.state.mine))
  }

  getPositions () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    console.log(token)
    $.ajax({
      url: 'http://localhost:3001/api/positions',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this,
      success: function (result) {
        console.log(result)
        this.setState({positions: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch positions from API failed')
      }
    })
  }

  render () {
    const allPositions = this.state.positions.map((pos, index) => {
      let gainLoss = (pos.value - pos.price)
      let gainColor = {}
      if (gainLoss > 0) {
        gainColor = {color: 'green'}
      } else {
        gainColor = {color: 'red'}
      }

      return (
        <div className='position-detail' key={index}>
          <p><strong>{pos.name} ({pos.symbol})</strong></p>
          <p><strong>Shares: </strong>{pos.shares}</p>
          <p><strong>Purchase Price: </strong>${this.props.currencyFormat(parseFloat(pos.price))}</p>
          <p><strong>Current value: </strong>${this.props.currencyFormat(parseFloat(pos.value))}</p>
          <p><strong>Gain/Loss: <span style={gainColor}>${this.props.currencyFormat(gainLoss)}</span></strong></p>
          <p><strong>Purchase Date: </strong>{pos.date}</p>
        </div>
      )
    })
    return (
      <div>
        <h1>Positions</h1>
        <div className='positions'>
          {allPositions}
        </div>
      </div>
    )
  }
  }

export default Positions
