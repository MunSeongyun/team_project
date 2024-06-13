import React from 'react'
// Hyji.jsx

const HyjiList = ({ name, image, info }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h4 style={{
        fontWeight: 'bold'
      }} className='container'>{name}</h4>

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