import React from 'react'

export default function ErrorComponent() {
  return (
    <tr className='ErrorMsgContainer'  >
        <td colSpan={5} rowSpan={5} className='ErrorMsg'>Sorry we can't find this user!</td>
    </tr>
  )
}
