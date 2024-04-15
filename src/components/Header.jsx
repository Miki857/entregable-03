import React from 'react'

const Header = () => {
  return (
    <header className='header flex align-center'>
        <nav className='flex'>
          <a href="index.html">Home</a>
          <a href="episodes.html">Episodes</a>
        </nav>
        <img src="https://movementstrategy.com/wp-content/themes/bigdrop-theme/mortyawardy/RAM_LOGO_COLOR_DROPSHADOW.png" alt="" />
    </header>
  )
}

export default Header