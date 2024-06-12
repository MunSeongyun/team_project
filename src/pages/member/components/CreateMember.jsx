// ###### Tue Jun 11 23:12:15 KST 2024 만듬 

import React from 'react'
import { useState } from 'react';
import Figure from './Figure';
import { useNavigate } from 'react-router-dom';
const CreateMember = () => {
    const navigate = useNavigate()

    const [member, setMember] = useState({
        author: "",
        title: "",
        description: "",
        image: "",
        descriptionImage: ""
    })

    const onChange = (e) => {
        const { target: { name, value } } = e
        setMember({ ...member, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/member_posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        })
            .then((response) => response.json())
            .then((response) => setMember({
                author: "",
                title: "",
                description: "",
                image: "",
                descriptionImage: ""
            }))
            .then(()=>navigate('/member'))
    }

    return (
        <>
        <Figure />
            <form onSubmit={onSubmit} method='POST'>
                <div class="form-group">
                    <label for="exampleInputEmail1">이름</label>
                    <input onChange={onChange} value={member.author} name='author' className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">좌우명</label>
                    <input onChange={onChange} value={member.title} name='title' className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">본문</label>
                    <textarea onChange={onChange} value={member.description} name='description' className="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">메인이미지</label>
                    <input onChange={onChange} value={member.image} name='image' className="form-control" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">본문이미지</label>
                    <input onChange={onChange} value={member.descriptionImage} name='descriptionImage' className="form-control" placeholder="Enter email" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default CreateMember