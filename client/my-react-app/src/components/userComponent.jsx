import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AiOutlineDelete} from "react-icons/ai"
import {RxUpdate} from "react-icons/rx"

const UserComponent = (Props) => {
  const { managersInfo ,index } = Props;
  return (
      <tr className={index % 2  === 0 ? "Table-Row" : "Table-row-Dark"} >
        <td className="Table-Data" scope="row">
        <label>{managersInfo.user_name}</label> 
        </td>
        <td className="Table-Data">
        <label>{managersInfo._id}</label>
        </td>
        <td className="Table-Data" scope="row">
        <label>{managersInfo.role}</label>

        </td>
        <td className="Table-Data" scope="row">
        <label>{managersInfo.email}</label> 

        </td>
        <td className="Table-Data-functions" scope="col">
        <button onClick={() => {}}>
          <AiOutlineDelete />
        </button>
        <button onClick={() => {}}>
          <AiOutlineUserAdd />
        </button>{" "}
        <button onClick={() => {}}>
          <AiOutlineEllipsis />
        </button>
        </td>
        </tr>
  );
};

export default UserComponent