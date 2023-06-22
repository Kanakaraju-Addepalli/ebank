import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="digital-card-container">
          <h1 className="heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </div>
    </>
  )
}

export default Home
