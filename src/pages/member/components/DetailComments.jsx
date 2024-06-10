import React from 'react'
import style from '../App.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const DetailComments = ({ name, description, data,timestamp }) => {
    return (
        <div className={style.detailComments}>
            <div style={{width:"20%"}}>{name}</div>
            <div style={{width:"60%"}}>{description}</div>
            <div style={{width:"20%"}}>{timestamp}</div>
            <Link style={{width:"10%"}} state={{ data: data}} to={`/member/update/${data.id}`}>update</Link>
        </div>
    )
}

export default DetailComments   