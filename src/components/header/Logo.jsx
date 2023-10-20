import React from 'react'
import { MdCardTravel } from 'react-icons/md'
import { Link } from 'react-router-dom'
const Logo = () => {
    return (
        <h1 className='header__logo'>
            <Link to='/'>
                <em><MdCardTravel /></em>
                <span>travel<br />youtube</span>
            </Link>
        </h1>
    )
}

export default Logo