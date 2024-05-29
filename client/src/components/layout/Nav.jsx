import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom'
import cn from 'classnames';
// import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import { CiFacebook,CiInstagram,CiTwitter  } from "react-icons/ci";
import { IoIosArrowForward,IoIosArrowDown } from "react-icons/io";


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
overflow: hidden;
&.on{
right:0;
opacity: 1;
}
.nav__wrap{
    padding: 100px 15px 0px;
    .nav__depth1{
        padding: 0;
        margin: 0;
        padding-bottom: 10px;
        li{
          
            span{
                font-size:1em;
            }
            a{
                display: flex;
            align-items: center;
            justify-content: space-between;
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
            overflow: hidden;
            cursor: pointer;
            span{
                display: flex;
            align-items: center;
            justify-content: space-between;
            
            }
            .arrow{
                transition: all 0.5s ease;
            &.on{
                transform: rotate(180deg);
            }
        }
          
            .nav__depth2 {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.5s ease;
  transform: scaleY(0);
  transform-origin: top;
  li{
    a{
        font-size: 0.7em;
    }
  }
}

.nav__depth2.on {
  max-height: 300px; 
  opacity: 1;
  transform: scaleY(1);
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
                background: var(--main);
                border: 1px solid #fff;
                font-size: 1.3em;
                text-align: left;
                padding: 20px 10px;

            }
            .accordion{
            }
            .accordion-button collapsed{
                border:none;
                margin-bottom: 20px;
            }
            .accordion-button{
                background: white;
                border: none;
                font-size: 1em;
                color: var(--main);
            }
            .accordion-body{
                transition: all 0.5s;
                &:hover{
                    background: #f3f3f3;
                    a{
                        color: var(--main);
                    }
                }
                a{
                    font-size: 1.2em;
                    transition: all 0.3s;
                }
            }
              
        }
    }
    .sns{
        display: flex;
        justify-content: right;
        margin-bottom: 30px;
        a{
            display: inline-block;
            font-size: 3em;
            &.hover{
                background: green;
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
                    <li onClick={toggleMenu}><NavLink to="/">회사소개 <span><IoIosArrowForward/></span></NavLink></li>
                    <li onClick={toggleMenu}><NavLink to="/">서비스 <span><IoIosArrowForward/></span></NavLink></li>
                    <li onClick={toggleMenu}><NavLink to="/">오시는길 <span><IoIosArrowForward/></span></NavLink></li>
                    <li className='myPage' onClick={depth2Click}> <span>마이페이지<IoIosArrowDown className={cn('arrow', depth2 ? 'on' : '')}/></span>
                    <ul className={cn('nav__depth2', depth2 ? 'on' : '' )}> 
                            <li onClick={toggleMenu}><NavLink to="/">정보수정</NavLink></li>
                            <li onClick={toggleMenu}><NavLink to="/">좋아요 리스트</NavLink></li>
                            <li onClick={toggleMenu}><NavLink to="/">최근 본 음식</NavLink></li>
                        </ul>
                    </li>
                </ul>
                <div className="Family__site">
                    <div className="Family__list">
                    
                    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>FamilySite</Accordion.Header>
      
        <Accordion.Body>
            <a href="https://www.woowahan.com/" target='_blank'>우아한형제들</a>
        </Accordion.Body>
        <Accordion.Body>
        <a href="https://www.deliveryhero.com/" target='_blank'>deliveryhero</a>
        </Accordion.Body>
        <Accordion.Body>
        <a href="https://www.woowayouths.com/" target='_blank'>우아한청년들</a>
        </Accordion.Body>
        <Accordion.Body>
        <a href="https://woowarider.or.kr/" target='_blank'>우아한 라이더 살핌기금</a>
        </Accordion.Body>
        <Accordion.Body>
        <a href="https://woowasajangnim.or.kr/" target='_blank'>우아한 사장님 자녀 장학금 지원</a>
        </Accordion.Body>
        <Accordion.Body>
        <a href="https://baemin.dosirak.or.kr/">배민방학도시락</a>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
                    </div>
                </div>
                <div className="sns">
                <a href='' className='facebook'><CiFacebook/></a>
                <a href='' className='instargram'><CiInstagram/></a>
                <a href='' className='x'><CiTwitter /></a>
            </div>
            </div>
        
        </NavBlock>
    );
};

export default Nav;