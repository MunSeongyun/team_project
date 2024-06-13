import React, { useEffect, useState } from 'react'

const ImgTest = () => {
    const [base64Image, setBase64Image] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setBase64Image(base64);
    };

    reader.readAsDataURL(file);
  };
  useEffect(()=>{
    const post = {
        src:base64Image
    }
    fetch("http://localhost:5000/img",{
        method:"POST",
        body:JSON.stringify(post)
    })
  },[base64Image])

  return (
    <div>
      <input type="file" onChange={handleChange} />
      {base64Image && <img src={base64Image} alt="Uploaded" />}
    </div>
  );
}

export default ImgTest