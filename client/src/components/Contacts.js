import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from "../assets/logo192.png"

function Contacts(props) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const {contacts, currentUser} = props

  useEffect(() => {
    if(currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser])
  const changeCurrentChat = (index, contact) => {

  }
  return <div>Contacts</div>
}

export default Contacts