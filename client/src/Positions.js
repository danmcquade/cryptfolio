import React, { Component } from 'react'
import Modal from 'react-modal'
import $ from 'jquery'
import EditModal from './EditModal'
import Header from './Header'
import './Positions.css'
import { modalStyle } from './ModalStyle'

class Positions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      positions: [],
      summary: null,
      whoami: null,
      fetched: false,
      editPositionIsOpen: false,
      currentItem: -1,
      loading: false,
      items: []
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this)
    this.handleOnAfterOpenModal = this.handleOnAfterOpenModal.bind(this)
  }

  updatePositions () {
    if (localStorage.getItem('cryptfolio-jwt')) {
      this.setState({loggedIn: true})
      this.getPositions()
      this.getPositionsSummary()
      this.whoAmI()
    }
  }

  componentDidMount () {
    this.updatePositions()
  }

  componentWillReceiveProps () {
    this.updatePositions()
  }

  getPositions () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/positions',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this,
      success: function (result) {
        this.setState({positions: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch positions from API failed')
      }
    })
  }

  getPositionsSummary () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/positions/summary',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this,
      success: function (result) {
        this.setState({summary: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch positions from API failed')
      }
    })
  }

  editPosition (id) {
    this.props.history.push('/positions/edit/' + id)
  }

  addPosition () {
    this.props.history.push('/positions/new/')
  }

  deletePosition (id) {
    var check = window.confirm('Are you sure you want to delete this position?')
    if (check === true) {
      let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
      $.ajax({
        url: 'https://cryptfolio-api.herokuapp.com/api/positions/delete/' + id,
        type: 'GET',
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
        context: this,
        success: function (result) {
          this.setState({positions: JSON.parse(JSON.stringify(result))})
          this.getPositionsSummary()
        },
        error: function (xhr) {
          console.log('Delete position API call failed')
        }
      })
    }
  }

  whoAmI () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/whoami',
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

  toggleModal (e) {
    if (e) {
      e.preventDefault()
    }
    if (this.state.editPositionIsOpen) {
      this.handleModalCloseRequest()
      return
    }
    this.setState({
      editPositionIsOpen: true,
      loading: true
    })
  }

  handleModalCloseRequest () {
    this.setState({
      editPositionIsOpen: false,
      loading: false
    })
  }

  handleOnAfterOpenModal () {
    (new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 500)
    })).then(res => {
      this.setState({
        loading: false
      })
    })
  }

  openEditModal (e, id) {
    this.setState({position_id: id}, this.toggleModal(e))
  }

  render () {
    const { editPositionIsOpen } = this.state

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
          <button onClick={() => { this.deletePosition(pos.id) }}>Delete</button>
          <button onClick={(e) => { this.openEditModal(e, pos.id) }}>Edit</button>

        </div>
      )
    })

    if (this.state.summary && this.props.loggedIn && this.props.whoami) {
      let positionsGainLoss = this.state.summary.current_value - this.state.summary.original_value
      let pglColor = {}
      if (positionsGainLoss > 0) {
        pglColor = {color: 'green'}
      } else {
        pglColor = {color: 'red'}
      }

      return (
        <div>
          <Header />
          <h1>Positions</h1>
          <h3>Positions for {this.props.whoami.name}</h3>
          <h3>Total: ${this.props.currencyFormat(parseFloat(this.state.summary.current_value))} (<span style={pglColor}>{positionsGainLoss > 0 ? '+' : null}${this.props.currencyFormat(positionsGainLoss)}</span>)</h3>
          <p><button onClick={() => { this.addPosition() }}>Add</button></p>
          <div className='positions'>
            {allPositions}
          </div>
          <Modal
            id='Edit Position'
            closeTimeoutMS={150}
            isOpen={editPositionIsOpen}
            style={modalStyle}
            onAfterOpen={this.handleOnAfterOpenModal}
            onRequestClose={this.toggleModal}>
            <EditModal id={this.state.position_id} toggleModal={this.toggleModal} />
          </Modal>
        </div>
      )
    } else if (!this.props.loggedIn) {
      return (
        <div>
          <Header />
          <h1>Positions</h1>
          <h3>Must be logged in to view positions</h3>
        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <h1>Positions</h1>
          <h3>Loading...</h3>
        </div>
      )
    }
  }
  }

export default Positions
