import React from 'react'
import {shallow} from 'enzyme'
import App from '../App'

describe('getGridParams', () => {
  it('returns an object with maxX and maxY', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [
      [3,1],
      [5,6],
      [0,1],
      [0,11]
    ]
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().getGridParams()).toEqual({maxX: 5, maxY: 11})
  })

  it('doesn\'t break when given an empty array', () => {
    const wrapper = shallow(<App/>)
    const liveCells = []
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().getGridParams()).toEqual({maxX: 0, maxY: 0})
  })
})

describe('adjCells', () => {
  it('returns an array of all adjacent cells', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.instance().adjCells([6,3])).toEqual([
      [5,2], [5,3], [5,4], [6,2], [6,4], [7,2], [7,3], [7,4]
    ])
  })
})

describe('containsSubArr', () => {
  it('returns true if the array does contain the subArray', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.instance().containsSubArr([[1,1], [1,2], [1,3]], [1,2])).toEqual(true)
  })
  it('returns false if the array does not contain the subArray', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.instance().containsSubArr([[1,1], [1,2], [1,3]], [7,7])).toEqual(false)
  })
})

describe('adjLiveCellCount', () => {
  it('returns the number of adjacent live cells', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [ [3,1], [5,3], [6,2] ]
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().adjLiveCellCount([6,3])).toEqual(2)
  })
})

describe('determineSurvival', () => {
  it('returns true if adjLiveCells is 2 or 3', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().determineSurvival([2,3])).toEqual(true)
  })
  it('returns false if adjLiveCells is not 2 or 3', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().determineSurvival([1,2])).toEqual(false)
  })
})

describe('determineGeneration', () => {
  it('returns true if adjLiveCells is exactly 3', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().determineGeneration([2,2])).toEqual(true)
  })
  it('returns false if adjLiveCells is not exactly 3', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells})
    expect(wrapper.instance().determineGeneration([2,4])).toEqual(false)
  })
})

describe('updateCells', () => {
  it('kills cells that have less than two live adj cells', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[3,2], [4,3], [5,3], [5,4]]
    wrapper.setState({liveCells: liveCells, gridParams: { maxX: 50, maxY: 50 }})
    wrapper.instance().updateCells()
    expect(wrapper.instance().state.liveCells).toEqual(
      expect.not.arrayContaining([[3,2]])
    )
  })

  it('kills cells that have more than three live adj cells', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[3,2], [4,2], [4,3], [5,3], [5,4]]
    wrapper.setState({liveCells: liveCells, gridParams: { maxX: 50, maxY: 50 }})
    wrapper.instance().updateCells()
    expect(wrapper.instance().state.liveCells).toEqual(
      expect.not.arrayContaining([[4,3]])
    )
  })

  it('generates a live cell, where a dead cell has three adjacent live cells', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells, gridParams: { maxX: 50, maxY: 50 }})
    wrapper.instance().updateCells()
    expect(wrapper.instance().state.liveCells).toEqual(
      expect.arrayContaining([[2,2]])
    )
  })

  it('doesn\'t create duplicates when generating a cell', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells, gridParams: { maxX: 50, maxY: 50 }})
    wrapper.instance().updateCells()
    expect(wrapper.instance().state.liveCells).toEqual([[2,2], [2,3]])
  })
})

describe('updateGridParams', () => {
  it('updates state\'s boardParams attribute', () => {
    const wrapper = shallow(<App/>)
    wrapper.instance().updateGridParams(10, 15)
    expect(wrapper.instance().state.gridParams).toEqual({
      maxX: 10,
      maxY: 15
    })
  })
})

describe('addToLiveCells', () => {
  it('adds the cell to state\'s liveCells property', () => {
    const wrapper = shallow(<App/>)
    wrapper.instance().addToLiveCells([1,1])
    expect(wrapper.instance().state.liveCells).toEqual([[1,1]])
  })
})

describe('removeFromLiveCells', () => {
  it('removes the cell from state\'s liveCells property', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells})
    wrapper.instance().removeFromLiveCells([2,3])
    expect(wrapper.instance().state.liveCells).toEqual(
      expect.not.arrayContaining([[2,3]])
    )
  })
})

describe('withinGridParams', () => {
  it('returns true when cell is within grid params', () => {
    const wrapper = shallow(<App/>)
    wrapper.setState({gridParams: {maxX: 5, maxY: 5}})
    expect(wrapper.instance().withinGridParams([1,1])).toEqual(true)
  })
  it('returns false when cell is not within grid params', () => {
    const wrapper = shallow(<App/>)
    wrapper.setState({gridParams: {maxX: 5, maxY: 5}})
    expect(wrapper.instance().withinGridParams([7,1])).toEqual(false)
    expect(wrapper.instance().withinGridParams([1,7])).toEqual(false)
    expect(wrapper.instance().withinGridParams([-1,1])).toEqual(false)
    expect(wrapper.instance().withinGridParams([1,-1])).toEqual(false)
  })
})

describe('resetToTitle', () => {
  it('resets the state to it\'s original values', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells, maxX: 10, maxY: 10})
    wrapper.instance().resetToTitle()
    expect(wrapper.instance().state.liveCells).toEqual([])
    expect(wrapper.instance().state.gridParams).toEqual(null)
  })
})

describe('resetBoard', () => {
  it('resets state\'s liveCells property back to an empty array', () => {
    const wrapper = shallow(<App/>)
    const liveCells = [[1,2], [2,3], [3,2]]
    wrapper.setState({liveCells: liveCells, maxX: 10, maxY: 10})
    wrapper.instance().resetBoard()
    expect(wrapper.instance().state.liveCells).toEqual([])
  })
})
