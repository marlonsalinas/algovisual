import React, { Component } from "react";
import Node from './Node/Node'

import './AlgorithmVisualizer.css';

export default class AlgorithmVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 25; row++) {
      const currentRow = [];
      for (let col = 0; col < 75; col++) {
        currentRow.push([]);
      }
      nodes.push(currentRow);
    }
    this.setState({nodes});
  }

  render() {
    const {nodes} = this.state;
    console.log(nodes);

    return (
      <div className="grid">
        {nodes.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
