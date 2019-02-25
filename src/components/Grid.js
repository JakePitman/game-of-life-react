import React, {Fragment} from 'react'
import styled from 'styled-components'
import Cell from './Cell'

const GridContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  border: 5px solid black;
  margin-bottom: 10px;
`

const SingleRow = styled.div`
  display: flex;
  flex-direction: row;
`

class Grid extends React.Component {

  generateSingleRow = (yCoordinate, cols) => {
    return Array.apply(null, {length: cols}).map((e, i) => {
      const isLive = this.props.containsSubArr(this.props.liveCells, [i, yCoordinate])
      return <Cell 
        row={ yCoordinate} 
        col={i} 
        isLive={isLive}
        clickHandler={
          isLive ? 
          this.props.removeFromLiveCells : 
          this.props.addToLiveCells
        } 
        key={`cell-${i}-${yCoordinate}`}
      />
    })
  }

  generateRows = (rows, cols) => {
    return Array.apply(null, {length: rows}).map((e, i) => {
      return <SingleRow key={`row-${i}`}>{this.generateSingleRow(i, cols)}</SingleRow>
    })
  }

  render(){
    return(
      <Fragment>
        <GridContainer>
          {this.generateRows(this.props.gridParams.maxX, this.props.gridParams.maxY)}
        </GridContainer>
      </Fragment>
    )
  }


}

export default Grid
