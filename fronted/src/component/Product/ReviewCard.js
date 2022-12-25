import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/Profile.png'
import './ProductDetails.css'



const ReviewCard = ({review}) => {

    const options = {
        edit : false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 700 ? 15 : 20,
        value : review.rating,
        isHalf : true
    
      };
  return (
    <div className='reviewCard'>
        <img src={profilePng} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
      
    </div>
  )
}

export default ReviewCard
