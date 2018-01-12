import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import Modal from 'react-modal'
import DetailModal from './DetailModal'
import { modalStyle } from './ModalStyle'
import './Dashboard.css'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coins: [],
      loaded: false,
      login: false,
      detailModalIsOpen: false,
      currentItem: -1,
      loading: false,
      coin_id: 'bitcoin'
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleModalCloseRequest = this.handleModalCloseRequest.bind(this)
    this.handleOnAfterOpenModal = this.handleOnAfterOpenModal.bind(this)
  }

  toggleModal (e) {
    e.preventDefault()
    if (this.state.detailModalIsOpen) {
      this.handleModalCloseRequest()
      return
    }
    this.setState({
      detailModalIsOpen: true,
      loading: true
    })
  }

  handleModalCloseRequest () {
    this.setState({
      detailModalIsOpen: false,
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

  componentDidMount () {
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/coins',
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({coins: JSON.parse(JSON.stringify(result)), loaded: true})
      },
      error: function (xhr) {
        console.log('Fetching API data failed')
      }
    })
  }

  openModal (e, coinId) {
    this.setState({coin_id: coinId}, this.toggleModal(e))
  }

  render () {
    const { detailModalIsOpen } = this.state
    const allCoins = this.state.coins.map((coin, index) => {
      let changeColor = {}
      if (coin.percent_change_24h > 0) {
        changeColor = {color: 'green'}
      } else {
        changeColor = {color: 'red'}
      }
      const iconImage = 'http://cdn.danmcq.com/cryptfolio/icons/' + coin.symbol.toLowerCase() + '.png'
      const detailUrl = '/detail/' + coin.id
      const altTxt = `${coin.name} icon image`
      return (
        <div className='coin-detail' key={index}>
          <div className='icon-container'><Link to={detailUrl} onClick={(e) => { this.openModal(e, coin.id) }}><img className='crypto-icon' alt={altTxt} src={iconImage} /></Link></div>
          <div className='data-container'>
            <p><strong>Name:</strong> <Link to={detailUrl} onClick={(e) => { this.openModal(e, coin.id) }}>{coin.name}</Link></p>
            <p><strong>Symbol:</strong> {coin.symbol}</p>
            <p><strong>Price (USD):</strong> ${this.props.currencyFormat(parseFloat(coin.price_usd))}</p>
            <p><strong>Change (24H): <span style={changeColor}>{parseFloat(coin.percent_change_24h) > 0 ? '+' : null}{parseFloat(coin.percent_change_24h).toFixed(2)}%</span></strong></p>
          </div>
        </div>
      )
    })
    if (!this.state.loaded) {
      return (
        <div>
          <div className='header-container'><img className='dashboard-logo' alt='Cryptfolio Logo' src='http://cdn.danmcq.com/cryptfolio/white-header-logo.png' /></div>
          <h1>Dashboard</h1>
          <div className='coins-container loading'>
            <h3>Loading...</h3>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='header-container'><img className='dashboard-logo' alt='Cryptfolio Logo' src='http://cdn.danmcq.com/cryptfolio/white-header-logo.png' /></div>
          <h1>Dashboard</h1>
          <div className='coins-container'>
            {allCoins}
          </div>
          <Modal
            id='Currency Details'
            closeTimeoutMS={150}
            isOpen={detailModalIsOpen}
            style={modalStyle}
            onAfterOpen={this.handleOnAfterOpenModal}
            onRequestClose={this.toggleModal}>
            <DetailModal loggedIn={this.props.loggedIn} coin_id={this.state.coin_id} toggleModal={this.toggleModal} currencyFormat={this.props.currencyFormat} />
          </Modal>
        </div>
      )
    }
  }
}

export default Dashboard
