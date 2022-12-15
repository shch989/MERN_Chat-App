import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

import styled from 'styled-components'
import Logo from '../assets/logo192.png'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    usename: '',
    password: '',
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  // 로컬스토리지에 회원정보가 저장될 경우 로그인 페이지 이동시 자동으로 메인페이지로 이동
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [])

  const handlerSubmit = async (event) => {
    event.preventDefault()
    if (handleVaildation()) {
      const { password, username } = values
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      })
      if (data.status === false) {
        return toast.error(data.message, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate("/")
      }
    }
  }

  const handleVaildation = () => {
    const { password, username } = values
    if (password === "") {
      toast.error('유저명 또는 비밀번호가 작성되지 않았습니다.', toastOptions)
      return false
    } else if (username.length === "") {
      toast.error('유저명 또는 비밀번호가 작성되지 않았습니다.', toastOptions)
      return false
    }
    return true
  }
  const handlerChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return (
    <Fragment>
      <FormContainer>
        <form onSubmit={handlerSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>React Chat</h1>
          </div>
          <input
            type="text"
            placeholder="이름"
            name="username"
            onChange={handlerChange}
            min="2"
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            onChange={handlerChange}
          />
          <button type="submit">로그인</button>
          <span>
            계정이 없으신가요? <Link to="/register">회원가입</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </Fragment>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
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
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`

export default Login

