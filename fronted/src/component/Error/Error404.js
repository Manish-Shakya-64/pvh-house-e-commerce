import React from 'react'
import './error404.css'
import {Link} from 'react-router-dom'
const Error404 = () => {
  return (
    <>
    <div className="errorContainer">
        <h1>Error 404</h1>
        <p>page not found...</p>
        <Link to="/">Home</Link>
    </div>
    </>
  )
}

export default Error404
