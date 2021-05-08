import React, { Component } from 'react';

import styles from './Grid.module.scss';

class Grid extends Component {
  renderCells = (rowIdx) => {
    const cells = [];

    for (let i = 0; i < this.props.activeMode.gridSize; i++) {
      const cellIdx = i + 1;

      cells.push(
        <div className={styles.cell}
             onMouseEnter={() => this.props.changeCellState(rowIdx, cellIdx)}
             style={this.props.activeCells[`${rowIdx}-${cellIdx}`] ? {backgroundColor: '#03a8f4'} : {}}
             key={i}
        />
      );
    }

    return cells;
  }

  renderRows = () => {
    const rows = [];

    for (let i = 0; i < this.props.activeMode.gridSize; i++) {
      rows.push(
        <div className={styles.row} key={i}>
          {this.renderCells(i + 1)}
        </div>
      );
    }

    return rows;
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderRows()}
      </div>
    );
  }
}

export default Grid;

