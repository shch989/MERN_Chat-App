import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import loader from '../assets/loader.gif'
import styled from 'styled-components'
import { Buffer } from 'buffer'

import 'react-toastify/dist/ReactToastify.css'

function SetAvatar() {
  const api = 'https://api.multiavatar.com/45678945'
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(async() => {
    if(!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    }
  }, [])

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('프로필 아바타를 지정해주세요.', toastOptions)
      return
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      if(data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate('/')
      } else {
        toast.error('에러가 발생하였습니다. 다시 시도해보십시오', toastOptions)
      }
    }
  }
  useEffect(async () => {
    const data = []
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      )
      const buffer = new Buffer(image.data)
      data.push(buffer.toString('base64'))
    }
    setAvatars(data)
    setIsLoading(false)
  }, [])

  return (
    <Fragment>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>당신의 아바타 프로필을 선택하세요.</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? 'selected' : ''
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            프로필 아바타로 지정
          </button>
        </Container>
      )}
      <ToastContainer />
    </Fragment>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`

export default SetAvatar
