import React, { useEffect } from 'react'
import { useState } from 'react';
import Figure from './Figure';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';



const UpdateMember = () => {
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const member = location.state.member[0]
    const [memberState, setStateMember] = useState({
        author: member.author,
        title: member.title,
        description: member.description,
        image: member.image,
        descriptionImage: member.descriptionImage
    })

    const onChange = (e) => {
        const { target: { name, value } } = e
        setStateMember({ ...memberState, [name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/member_posts/${params.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberState)
        })
            .then((response) => response.json())
            .then((response) => setStateMember({
                author: "",
                title: "",
                description: "",
                image: "",
                descriptionImage: ""
            }))
            .then(() => { navigate(`/member`) })
    }

    return (
        <>
        <Figure />
            <form onSubmit={onSubmit} method='POST'>
                <div class="form-group">
                    <label for="exampleInputEmail1">이름</label>
                    <input onChange={onChange} value={memberState.author} name='author' className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">좌우명</label>
                    <input onChange={onChange} value={memberState.title} name='title' className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">본문</label>
                    <textarea onChange={onChange} value={memberState.description} name='description' className="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">메인이미지</label>
                    <input onChange={onChange} value={memberState.image} name='image' className="form-control" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">본문이미지</label>
                    <input onChange={onChange} value={memberState.descriptionImage} name='descriptionImage' className="form-control" placeholder="Enter email" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default UpdateMember