import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 2000px;
`

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
`

export const Genre = styled.h1`
  display: block;
  width: 100vw;
  text-align: center;
  padding: 10px;
  background-color: #ccc;
`