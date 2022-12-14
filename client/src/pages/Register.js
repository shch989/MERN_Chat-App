import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'

import styled from 'styled-components'
import Logo from '../assets/logo192.png'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
  const [values, setValues] = useState({
    usename: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const handlerSubmit = async (event) => {
    event.preventDefault()
    if(handleVaildation()) {
      const { password, confirmPassword, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password
      })

    }
  }

  const handleVaildation = () => {
    const { password, confirmPassword, username, email } = values
    if (password !== confirmPassword) {
      toast.error('입력하신 비밀번호가 일치하지 않습니다.', toastOptions)
      return false
    } else if (username.length < 2) {
      toast.error('유저명은 2자 이상으로 해야합니다.', toastOptions)
      return false
    } else if (password.length < 8) {
      toast.error('비밀번호는 8자 이상으로 해야합니다.', toastOptions)
      return false
    } else if (email === "") {
      toast.error('이메일을 작성란이 비어있습니다.', toastOptions)
      return false
    }
    return true;
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
          />
          <input
            type="email"
            placeholder="이메일"
            name="email"
            onChange={handlerChange}
          />
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            onChange={handlerChange}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            onChange={handlerChange}
          />
          <button type="submit">회원가입</button>
          <span>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
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

export default Register
