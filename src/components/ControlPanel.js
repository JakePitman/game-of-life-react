import React from 'react'
import styled from 'styled-components'

const ControlPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`

const Button = styled.button`
  font-family: 'Arial Narrow';
  font-spacing: 5px;
  font-weight: lighter;
  font-size: 30px;
  cursor: pointer;
  border: 1px solid black;
  outline: none;
  width: 75%;
  height: 80px;
  transition: all 0.5s;
  &:hover{
    background: black;
    color: white;
  }
`

const EmptyButton = styled.button`
  font-family: 'Arial Narrow';
  font-spacing: 5px;
  font-weight: lighter;
  font-size: 30px;
  border: 1px solid grey;
  color: grey
  outline: none;
  width: 75%;
  height: 80px;
`

const ControlPanel = (props) => {
  return(
    <ControlPanelContainer>
      {
        props.timerOn ?
        <React.Fragment>
          <Button onClick={props.endTimer}>STOP RUNNING</Button>
          <EmptyButton>NEXT CYCLE</EmptyButton>
          <EmptyButton>ANNIHILATE</EmptyButton>
        </React.Fragment>
        :
        <React.Fragment>
          <Button onClick={props.setTimer}>RUN AUTOMATICALLY</Button>
          <Button onClick={props.updateCells}>NEXT CYCLE</Button>
          <Button onClick={props.resetBoard}>ANNIHILATE</Button>
        </React.Fragment>
      }
      <Button onClick={props.resetToTitle}>BACK TO TITLE</Button>
    </ControlPanelContainer>
  )
}

export default ControlPanel
