import React, { Component } from "react";
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstraAlgo';
import './AlgorithmVisualizer.css';
import { Link } from "react-router-dom";
import styled from "styled-components";


const startNodeRow = 12;
const startNodeCol = 12;
const endNodeRow = 12;
const endNodeCol = 60;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItems = styled.ul`
  text-decoration: none;
  flex: 1;
  text-align: left;
  color: white;
`;

const NavList = styled.li`
  display: inline-block;
  list-style: none;
  margin: 0px 20px;
`;

const Title = styled.h1`
  font-size: 3em;
  color: white;
`

const Button = styled.button`
  background-color: #041621;
  color: white;
  font-size: 1em;
  margin-bottom: 1em;
  padding: .75em 1em;
  border: 2px solid #56f7fc;
  border-radius: 3px;
  cursor: pointer;
`

export default class AlgorithmVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }
  
  componentDidMount() {
    const grid = getInititalGrid();
    this.setState({grid});
  }
  
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }
  
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }
  
  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }
  
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 5 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 5 * i);
    }
  }
  
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-shortest-path';
      }, 25 * i);
    }
  }
  
  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  clearGrid() {
    window.location.reload('Refresh')
  }
  
  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <React.Fragment>
        <div className='navbar'>
          <Nav>
            <NavItems>
              <NavList>
                <Title>AlgoVisual</Title>
              </NavList>
              <NavList>
                <Button onClick = {() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
                </Button>
              </NavList>
              <NavList>
                <Button onClick = {() => this.clearGrid(this)}>Reset the grid</Button>
              </NavList>
              <NavList>
                <Link to='/feedback' id='linkto'>
                  Submit Feedback
                </Link>
              </NavList>
            </NavItems>
          </Nav>
        </div>
        <div className="grid">
          <p>Dijkstra's algorithm is a pathfinding algorithm that finds the shortest or "cheapest" path between 2 or more points. It expands evenly around the start or "source" node in search of the other nodes. Hit the "Visualize Dijkstra's Algorithm" button to see it in action! Click and hold your mouse on any part of the grid to create a maze of walls that the algorithm will work around to get to the end node. Once finished, the algorithm will highlight the shortest, most optimal path between the 2 nodes.</p>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const {isStart, isFinish, row, col, isWall} = node; 
                  return (
                    <Node 
                    key={nodeIndex}
                    col={col}
                    isStart={isStart} 
                    isFinish={isFinish}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    onMouseUp={() => this.handleMouseUp()}
                    row={row}
                    >
                  </Node>
                )
              })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const getInititalGrid = () => {
  const grid = [];
  for (let row = 0; row < 25; row++) {
    const currentRow = [];
    for (let col = 0; col < 75; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === endNodeRow && col === endNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

