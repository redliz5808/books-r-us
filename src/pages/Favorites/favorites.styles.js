import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 350px;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 2px 3px 5px #333;
  background-color: #BFAFA6;
`;

export const Title = styled.h3`
  display: block;
  background-color: #BFAFA6;
`;

export const Author = styled.h4`
  display: block;
  background-color: #BFAFA6;
`;

export const Cover = styled.div`
  display: block;
  background-color: #BFAFA6;
`;