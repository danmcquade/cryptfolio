import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import './Positions.css'

class Positions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      positions: [],
      summary: null,
      whoami: null,
      loggedIn: false
    }
  }

  deletePosition (id) {
    var check = window.confirm('Are you sure you want to delete this position?')
    if (check === true) {
      console.log('Deleteing position id: ' + id)
      let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
      $.ajax({
        url: 'http://localhost:3001/api/positions/delete/' + id,
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
        context: this,
        success: function (result) {
          console.log(result)
          this.setState({positions: JSON.parse(JSON.stringify(result))})
          this.getPositionsSummary()
        },
        error: function (xhr) {
          console.log('Delete position API call failed')
        }
      })
    }
  }

  componentDidMount () {
    $('.logout').hide()
    console.log('Position Component Mounted!')
    if (!localStorage.getItem('cryptfolio-jwt')) {
      console.log('Not logged in')
    } else {
      console.log('We have a token!')
      this.setState({loggedIn: true})
      this.getPositions()
      this.getPositionsSummary()
      this.whoAmI()
    }
  }

  click () {
    console.log(JSON.parse(this.state.whoami))
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

  getPositionsSummary () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    console.log(token)
    $.ajax({
      url: 'http://localhost:3001/api/positions/summary',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this,
      success: function (result) {
        console.log(result)
        this.setState({summary: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch positions from API failed')
      }
    })
  }

  whoAmI () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    $.ajax({
      url: 'http://localhost:3001/api/whoami',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this,
      success: function (result) {
        this.setState({whoami: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch user data from API failed')
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
          <button onClick={() => { this.deletePosition(pos.id) }}>Delete Position</button>
        </div>
      )
    })

    if (this.state.summary == null){
      return (
        <div>
          <h1>Positions</h1>
          <h3>Loading...</h3>
        </div>
      )
    } else {
      let positionsGainLoss = this.state.summary.current_value - this.state.summary.original_value
      let pglColor = {}
      if (positionsGainLoss > 0) {
        pglColor = {color: 'green'}
      } else {
        pglColor = {color: 'red'}
      }

      return (
        <div>
          <h1>Positions</h1>
          <h3>Positions for {this.state.whoami.name}</h3>
          <h3>Total: ${this.props.currencyFormat(parseFloat(this.state.summary.current_value))} (<span style={pglColor}>{positionsGainLoss > 0 ? '+' : null}${this.props.currencyFormat(positionsGainLoss)}</span>)</h3>
          <p><Link to='/positions/new'>New Position</Link></p>
          <div className='positions'>
            {allPositions}
          </div>
        </div>
      )
    }
  }
  }

export default Positions
