import React from 'react'
import styled from 'styled-components'

const RulesContainer = styled.div`
  font-family: 'Arial Narrow';
  letter-spacing: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const ListItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-right: 20px;
`
const Num = styled.h2`
  margin: 0px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RuleContent = styled.p`
  text-align: center;
`

const Rules = () => {
  
  return(
    <RulesContainer>
      <ListItem>
        <Num>1</Num>
        <RuleContent>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</RuleContent>
      </ListItem>
      <ListItem>
        <Num>2</Num>
        <RuleContent>Any live cell with two or three live neighbors lives on to the next generation.</RuleContent>
      </ListItem>
      <ListItem>
        <Num>3</Num>
        <RuleContent>Any live cell with more than three live neighbors dies, as if by overpopulation.</RuleContent>
      </ListItem>
      <ListItem>
        <Num>4</Num>
        <RuleContent>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</RuleContent>
      </ListItem>
    </RulesContainer>
  )
}

export default Rules
