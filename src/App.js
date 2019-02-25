import React, { Component } from 'react';
import styled from 'styled-components'
import './App.css';
import Grid from './components/Grid'
import ControlPanel from './components/ControlPanel'
import GridParamsForm from './components/GridParamsForm'
import Rules from './components/Rules'

//----------------STYLES-----------------

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StartContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const StartHeading = styled.h1`
  font-family: 'Arial Narrow';
  letter-spacing: 5px;
  font-weight: lighter;
`

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CenterColumn = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
`

const SideColumn = styled.div`
  width: 25vw;
  height: 50vw;
`

class App extends Component {

  state = {
    liveCells: [],
    gridParams: null
  }

  getGridParams = () => {
    if(!this.state.liveCells || this.state.liveCells.length === 0) {
      return {
        maxX: 0,
        maxY: 0
      }
    }
    const xPositions = []
    const yPositions = []
    this.state.liveCells.forEach( liveCell => {
      xPositions.push(liveCell[0])
      yPositions.push(liveCell[1])
    })
    return {
      maxX: Math.max.apply(null, xPositions),
      maxY: Math.max.apply(null, yPositions),
    }
  }

  updateGridParams = (maxX, maxY) => {
    this.setState({gridParams: {maxX, maxY}})
  }

  adjCells = (cell) => {
    const x = cell[0]
    const y = cell[1]
    const adjCells = []
    const xValues = [(x - 1), x, (x + 1)]
    xValues.forEach(xPos => {
      adjCells.push([xPos, y - 1])
      adjCells.push([xPos, y])
      adjCells.push([xPos, y + 1])
    })
    return adjCells.filter(cell => !(cell[0] === x && cell[1] === y))
  }

  containsSubArr = (arr, subArr) => {
    let result = false
    arr.forEach(elem => {
      if (elem[0] === subArr[0] && elem[1] === subArr[1]) {
        result = true
      }
    })
    return result
  }

  adjLiveCellCount = (cell) => {
    return this.adjCells(cell).filter(adjCell => this.containsSubArr(this.state.liveCells, adjCell)).length
  }

  determineSurvival = (liveCell) => {
    const adjLiveCells = this.adjLiveCellCount(liveCell)
    return ( adjLiveCells === 2 || adjLiveCells === 3 ) ? true : false
  }

  determineGeneration = (deadCell) => {
    const adjLiveCells = this.adjLiveCellCount(deadCell)
    return ( adjLiveCells === 3 ) ? true : false
  }

  withinGridParams = (cell) => {
    return (
      cell[0] < this.state.gridParams.maxX && 
      cell[1] < this.state.gridParams.maxY &&
      cell[0] >= 0 &&
      cell[1] >= 0
    )
  }

  updateCells = () => {
    const updatedLiveCells = []
    this.state.liveCells.forEach(liveCell => {
      //check survival
      if(this.determineSurvival(liveCell) && 
        !this.containsSubArr(updatedLiveCells, liveCell)
      ) {
        updatedLiveCells.push(liveCell)
      }
      //determine if any adj cells come to life
      this.adjCells(liveCell).forEach(adjCell => {
        if (
          this.withinGridParams(adjCell) &&
          !(this.containsSubArr(updatedLiveCells, adjCell)) && 
          this.determineGeneration(adjCell)){
          updatedLiveCells.push(adjCell)
        }
      })
    })
    this.setState({liveCells: updatedLiveCells}) 
  }

  addToLiveCells = (cell) => {
    const liveCellsCopy = [ ...this.state.liveCells ]
    liveCellsCopy.push(cell)
    this.setState({liveCells: liveCellsCopy})
  }

  removeFromLiveCells = (targetCell) => {
    this.state.liveCells.forEach((cell, i) => {
      if(cell[0] === targetCell[0] && cell[1] === targetCell[1]) {
        const liveCellsCopy = [...this.state.liveCells]
        liveCellsCopy.splice(i, 1)
        this.setState({liveCells: liveCellsCopy})
      }
    })
  }

  resetToTitle = () => {
    this.setState({
      liveCells: [],
      gridParams: null
    })
  }

  resetBoard = () => {
    this.setState({
      liveCells: []
    })
  }

  intervalId = null

  setTimer = () => {
    this.intervalId = setInterval(() => this.updateCells(), 200)
    this.setState({timerOn: true})
  }

  endTimer = () => {
    clearInterval(this.intervalId)
    this.setState({timerOn: false})
  }

  render() {
    return (
      <AppContainer>
        {
          this.state.gridParams ?
          <GameContainer>
            <SideColumn>
              <Rules/>
            </SideColumn>
            <CenterColumn>
              <Grid 
                liveCells={this.state.liveCells} 
                containsSubArr={this.containsSubArr} 
                addToLiveCells={this.addToLiveCells} 
                removeFromLiveCells={this.removeFromLiveCells} 
                gridParams={this.state.gridParams}
              />
            </CenterColumn>
            <SideColumn>
              <ControlPanel 
                updateCells={this.updateCells} 
                resetToTitle={this.resetToTitle}
                resetBoard={this.resetBoard}
                setTimer={this.setTimer}
                endTimer={this.endTimer}
                timerOn={this.state.timerOn}
              />
            </SideColumn>
          </GameContainer>
          :
          <StartContainer>
            <StartHeading>Conway{"'"}s Game of Life</StartHeading>
            <GridParamsForm updateGridParams={this.updateGridParams}/>
            <div></div>
          </StartContainer>
        }
      </AppContainer>
    );
  }
}

export default App;
