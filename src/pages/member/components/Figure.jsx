import style from '../App.module.css'
import { useNavigate } from 'react-router-dom';

function Figure() {

  const navigate = useNavigate()
  const toHome = () => {
    navigate('/member')
  }

  return (
    <>
      <figure style={{ margin: '50px' }}>
        <div className={style.nine}>
          <h1 style={{ cursor: 'pointer' }} onClick={toHome}>1 Class Introduction<span>Tagline Keywords</span></h1>
        </div>
      </figure>
    </>
  );
}

export default Figure;