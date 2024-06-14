import React, { useEffect } from 'react'
import { useState } from 'react';
import Figure from './Figure';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../App.module.css'



const UpdateMember = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const member = location.state.member[0]
    const [descriptionImage, setDescriptionImage] = useState(member.descriptionImage);
    const [image, setImage] = useState(member.image);
    const [memberState, setStateMember] = useState({
        author: member.author,
        title: member.title,
        description: member.description,
    })



    const onChange = (e) => {
        const { target: { name, value } } = e
        setStateMember({ ...memberState, [name]: value })
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
            ...memberState,
            image: image,
            descriptionImage: descriptionImage
        }
        fetch(`http://localhost:5000/member_posts/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then((response) => response.json())
            .then((response) => setStateMember({
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
                    <input onChange={onChange} value={memberState.author} name='author' className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">좌우명</label>
                    <input onChange={onChange} value={memberState.title} name='title' className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">본문</label>
                    <textarea onChange={onChange} value={memberState.description} name='description' className="form-control" rows="3"></textarea>
                </div>
                <div className="form-group">
                    {/* <label for="exampleInputEmail1">메인이미지</label> */}
                    <label className={style.inputFileButton} htmlFor="inputMainImage">업로드</label>
                    <input id='inputMainImage' style={{ display: 'none' }} type='file' onChange={imgChange} name='image' className="form-control" />
                    {image ? <img style={{ width: "25em", height: "657px" }} src={image}></img> : "메인 사진을 올려주세요"}
                </div>
                <div className="form-group">
                    {/* <label for="exampleInputEmail1">본문이미지</label> */}
                    <label className={style.inputFileButton} htmlFor="inputDescriptionImage">업로드</label>
                    <input style={{ display: 'none' }} id='inputDescriptionImage' type='file' onChange={descriptionImageChange} name='descriptionImage' className="form-control" />
                    {image ? <img style={{ width: "25em", height: "657px" }} src={descriptionImage}></img> : "본문 사진을 올려주세요"}
                </div>
                <button className="btn btn-primary">Submit</button>htmlFor
            </form>

        </>
    )
}

export default UpdateMember