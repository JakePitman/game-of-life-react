import React from 'react'
import styled from 'styled-components'

const CellDiv = styled.div`
  position: relative;
  border: 1px solid grey;
  width: 50%;
  cursor: pointer;
  &:before{
    content: "";
    display: block;
    padding-top: 100%;
  }
`

const Cell = (props) => {
  return(
    <CellDiv
      onClick={() => props.clickHandler([props.col, props.row])}
      style={{background: props.isLive ? 'black' : 'white'}}
    />
  )
}

export default Cell
