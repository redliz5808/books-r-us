import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export const BigStar = styled.p`
  font-size: 25px;
`;

export const NavLi = styled.li`
  list-style: none;
`;

export const NavUl = styled.ul`
  display: flex;
  justify-content: space-around;
`;

export const MyGlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    background-color: #D4D2D5;
  }

  nav {
    margin-top: 10px;
    font-size: 20px;
  }
`;
