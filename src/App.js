import Peer from 'peerjs'
import gyro from './lib/gyro.js'
import queryString from 'query-string'
import config from '../config'
import React, { Component } from 'react'

class App extends Component {
  
  state = { status: '', data: {}, conn: null }

  sendData() {
    gyro.frequency = 50
    gyro.startTracking(o => {
      const { conn } = this.state
      //console.log(`Sending ${JSON.stringify(o)}`)
      this.setState({ data: o })
      if (conn) {
        conn.send(o)
      }
    })
  }

  componentDidMount() {
    this.setState({ status: 'Init' })
    const parsed = queryString.parse(location.search)
    const pid = parsed.pid || 'pid'
    let peer
    // to connect
    if (!parsed.s) {
      this.setState({ status: `Connecting to ${pid}` })
      peer = new Peer(config)
      conn = peer.connect(pid)
      //
      conn.on('open', () => {
        this.setState({ status: 'Connected', conn })
        this.sendData()
      })

    }
    // waiting for connections
    if (parsed.s) {
      this.setState({ status: `Waiting for connections at ${pid}`})
      peer = new Peer(pid, config) 
      peer.on('open', id => {
        peer.on('connection', conn => {
          this.setState({ status: 'Connected', conn })
          this.sendData()
        })
      })
    }
  }

  render() {
    const { status, data } = this.state
    return <div className="App">
      {`Status: ${status}; Data: ${JSON.stringify(data)}`}
    </div>
  }
}

export default App
