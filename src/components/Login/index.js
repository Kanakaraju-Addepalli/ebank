import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', showError: false, errorMessage: ''}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onFailure = errorMessage => {
    this.setState({showError: true, errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <div className="form-container">
            <h1 className="wel-heading">Welcome Back!</h1>
            <form onSubmit={this.onSubmitForm} className="input-container">
              <label htmlFor="username">User ID</label>
              <input
                type="text"
                id="username"
                value={userId}
                onChange={this.onChangeUserId}
                placeholder="Enter User ID"
              />
              <label htmlFor="userPin">PIN</label>
              <input
                type="password"
                id="userPin"
                value={pin}
                placeholder="Enter PIN"
                onChange={this.onChangePin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showError ? (
                <p className="error-message">{errorMessage}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
