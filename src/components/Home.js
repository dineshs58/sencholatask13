import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Content from './Content';
import '../style/home.css'
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem('username')
    if (username === '' || username === null) {
      navigate('/login');
    }
  }, [])
  return (
    <div>
      <div className="headerhome">
        <Link  >Home</Link>
        <Link style={{ float: 'right' }} to={'/'}>Logout</Link>
      </div>
      <Content/>

    </div>
  )
}

export default Home