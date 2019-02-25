import React from 'react'
import styled from 'styled-components'

const GridParametersFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const UpdateParamsButton = styled.button`
  margin-top: 20px;
  padding: 10px 10px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 50px;
  font-family: 'Arial Narrow';
  letter-spacing: 5px;
  outline: none;
  transition: all 0.5s;
  &:hover{
    background: black;
    color: white;
  }
`

const InputField = styled.input`
  text-align: center;
  padding: 10px 10px;
  font-size: 50px;
  font-family: 'Arial Narrow';
  letter-spacing: 5px;
  border: 1px solid black;
  outline: none;
`

class GridParametersForm extends React.Component {
  state = {
    gridSize: null
  }

  updateGridSize = (e) => {
    this.setState({gridSize: parseInt(e.target.value)})
  }

  handleUpdate = () => {
    if(typeof(this.state.gridSize) === 'number' && this.state.gridSize >= 10 && this.state.gridSize <= 50)  {
      this.props.updateGridParams(this.state.gridSize, this.state.gridSize)
    } else {
      alert('please enter a numerical value between 10 and 50')
    }
  }

  render(){ 
    return(
      <GridParametersFormContainer>
        <InputField type='text' placeholder='(10 - 50)' onChange={this.updateGridSize} />
        <UpdateParamsButton onClick={this.handleUpdate}>Set Grid Parameters</UpdateParamsButton>
      </GridParametersFormContainer>
    )
  }
}

export default GridParametersForm
