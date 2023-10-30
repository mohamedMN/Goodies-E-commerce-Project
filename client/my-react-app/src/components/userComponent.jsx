import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AiOutlineDelete} from "react-icons/ai"
import {RxUpdate} from "react-icons/rx"

const UserComponent = ({managersInfo}) => {
  return (
    <div className='manager-Container'>
    <div className='manager-Info'>
    <label>Username: {managersInfo.username}</label>
    <label>{managersInfo.email}</label>
    <label>{managersInfo.role}</label>
    <label>{managersInfo.lastName}</label>
    </div>
    <div className='manager-Options'>
      <button onClick={()=>{}}><AiOutlineDelete/></button>
      <button><RxUpdate/></button>
    </div>
    </div>
  )
}

export default UserComponent