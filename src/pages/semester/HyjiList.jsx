import React from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// Travels.jsx

const HyjiList = ({ name, image, info }) => {
  console.log(image);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h4 style={{
        fontWeight: 'bold'
      }} className='container mt-4'>{name}</h4>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <img className='container mt-1' src={image} alt="Food preparation" style={{ width: '80%', maxWidth: '800px', height: 'auto' }} />
      </div>
      <p className='container mt-5'>
        {info}
      </p>
    </div>
  )
}

export default HyjiList