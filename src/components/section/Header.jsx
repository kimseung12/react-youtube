import React from 'react'

import { MdCardTravel } from 'react-icons/md'
import { SiYourtraveldottv } from 'react-icons/si'
import { SiVfairs } from 'react-icons/si'
import { SiAlby } from 'react-icons/si'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header id='header' role='banner'>
            <h1 className='header__logo'>
                <Link to='/'>
                    <em><MdCardTravel /></em>
                    <span>travel<br />youtube</span>
                </Link>
            </h1>
            <nav className='header__menu'>
                <ul className='menu'>
                    <li className='active'>
                        <Link to='/'><SiYourtraveldottv /> 여행 유튜버 홈</Link>
                    </li>
                    <li>
                        <Link to='/'><SiVfairs /> 오늘의 여행지 탐험</Link>
                    </li>
                    <li>
                        <Link to='/'><SiAlby /> 유명 유튜버 소개</Link>
                    </li>
                </ul>
            </nav>
            <div className='header__sns'></div>
        </header>
    )
}

export default Header