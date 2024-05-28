import React from "react";
import styled from "styled-components";


const HeaderBlock = styled.div`
background: var(--main);
padding: 30px 0px;
color: white;
`

const Header = () => {
  return <HeaderBlock>
          안녕하세요
        </HeaderBlock>;
};    

export default Header;
