import React from 'react'

export default function Header() {
  return (
    <div>
      <h1>Today's Date</h1>
      <form>
              <label style={{ color: "white" }}>Recherche user</label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            <div className='user-info-pannel'>
            <div className='user-Profile-Pic'>

            </div>
            <div>
                <label className='usename-label'></label>
                <label className='email-Label'></label>
            </div>
            </div>
    </div>
  )
}
