import React, { useEffect,useState } from 'react'

const ImgPrint = () => {
    const [imgs, setImgs] = useState([])
    fetch("http://localhost:5000/img",{
        method:"GET"
    }).then((res)=>{return res.json()})
    .then((ans)=>{setImgs(ans)})
  return (
    <div>
        {imgs.map((item)=>{
            return <img key={item.id} src={item.src} alt="" />
        })}
    </div>
  )
}

export default ImgPrint