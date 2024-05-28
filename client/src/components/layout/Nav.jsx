import React, {useState} from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom'
import cn from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';


const NavBlock = styled.div`
font-family: "Do Hyeon", sans-serif;
            font-weight: 400;
            font-style: normal;
position: fixed;
top: 0;
right: -768px;
width: 100%;
height: 100%;
background:var(--main);
opacity: 0;
transition: all 0.6s ease;
&.on{
right:0;
opacity: 1;
}
.nav__wrap{
    padding: 100px 15px;
    .nav__depth1{
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #fff;
        padding-bottom: 30px;
        li{
            a{
            font-family: "Do Hyeon", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 1.7em;
            letter-spacing: 1px;
            padding: 15px 0;
            }
        }
        .myPage{
            font-size: 1.7em;
            letter-spacing: 1px;
            padding: 15px 0;
            .nav__depth2{
                display:none;
                li{
                a{
                font-size: 0.7em;
            }
        }
                &.on{
                    display: block;
                }
            }
        }
    }
    .Family__site{
        .Family__name{
            font-size:2em;
            padding-top: 30px;
        }
        .Family__list{
            #dropdown-basic{
                width: 100%;
                background: transparent;
                border: 1px solid #fff;
                font-size: 1.3em;
                text-align: left;
                padding: 20px 10px;
                transition: all 0.5s ease;

            }
           
            div.dropdown-menu.show{
                    background: #fff;
                    border: 1px solid #fff;
                    width: 100%;
                    a{color: #222;
                        font-size: 1.2em;
                    }
                }
        }
    }
}

`

const Nav = ({isOpen, toggleMenu}) => {


    const [depth2,setDepth2] = useState(false)

    const depth2Click = ()=>{
        setDepth2(!depth2)
    } 


    return (
        <NavBlock className={isOpen ? 'on' : ''}>
            <div className="nav__wrap">
                <ul className="nav__depth1">
                    <li onClick={toggleMenu}><NavLink to="/">회사소개</NavLink></li>
                    <li onClick={toggleMenu}><NavLink to="/">서비스</NavLink></li>
                    <li onClick={toggleMenu}><NavLink to="/">오시는길</NavLink></li>
                    <li className='myPage' onClick={depth2Click}> 마이페이지
                    <ul className={cn('nav__depth2', depth2 ? 'on' : '' )}>
                            <li onClick={toggleMenu}><NavLink to="/">정보수정</NavLink></li>
                            <li onClick={toggleMenu}><NavLink to="/">좋아요 리스트</NavLink></li>
                            <li onClick={toggleMenu}><NavLink to="/">최근 본 음식</NavLink></li>
                        </ul>
                    </li>
                </ul>
                <div className="Family__site">
                    <div className="Family">
                        <p className='Family__name'>FamilySite</p>
                    </div>
                    <div className="Family__list">
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        패밀리사이트 보기
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">우아한형제들</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
            </div>
        </NavBlock>
    );
};

export default Nav;