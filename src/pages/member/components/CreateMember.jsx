// ###### Tue Jun 11 23:12:15 KST 2024 만듬 

import React from 'react'
import { useState } from 'react';
import Figure from './Figure';
import { useNavigate } from 'react-router-dom';
import style from '../App.module.css'

const CreateMember = () => {
    const navigate = useNavigate()
    const [descriptionImage, setDescriptionImage] = useState(null);
    const [image, setImage] = useState(null);
    const [member, setMember] = useState({
        author: "",
        title: "",
        description: ""
    })

    const onChange = (e) => {
        const { target: { name, value } } = e
        setMember({ ...member, [name]: value })
    }

    const imgChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imgbase64 = reader.result;
            setImage(imgbase64);
        };

        reader.readAsDataURL(file);
    };

    const descriptionImageChange = (e) => {
        const file1 = e.target.files[0];
        const reader1 = new FileReader();

        reader1.onload = () => {
            const desbase64 = reader1.result;
            setDescriptionImage(desbase64);
        };

        reader1.readAsDataURL(file1);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const post = {
            ...member,
            image: image,
            descriptionImage: descriptionImage
        }
        fetch(`http://localhost:5000/member_posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then((response) => response.json())
            .then((response) => setMember({
                author: "",
                title: "",
                description: ""
            }))
            .then(() => navigate('/member'))
    }

    return (
        <>
            <Figure />
            <form onSubmit={onSubmit} method='POST'>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">이름</label>
                    <input onChange={onChange} value={member.author} name='author' className="form-control" placeholder="이름" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">좌우명</label>
                    <input onChange={onChange} value={member.title} name='title' className="form-control" placeholder="좌우명" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">본문</label>
                    <textarea onChange={onChange} value={member.description} name='description' className="form-control" placeholder='본문' rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label className={style.inputFileButton} htmlFor="inputMainImage">업로드</label>
                    <input id='inputMainImage' style={{ display: 'none' }} type='file' onChange={imgChange} name='image' className="form-control" />
                    {image ? <img style={{ width: "25em", height: "657px" }} src={image}></img> : "메인 사진을 올려주세요"}
                </div>
                <div className="form-group">
                    {/* <label htmlFor="exampleInputEmail1">본문이미지</label> */}
                    <label className={style.inputFileButton} htmlFor="inputDescriptionImage">업로드</label>
                    <input style={{ display: 'none' }} id='inputDescriptionImage' type='file' onChange={descriptionImageChange} name='descriptionImage' className="form-control" />
                    {image ? <img style={{ width: "25em", height: "657px" }} src={descriptionImage}></img> : "본문 사진을 올려주세요"}
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CreateMember