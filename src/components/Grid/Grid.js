import styles from './Grid.module.scss';

function Grid(props) {
  const renderCells = (rowIdx) => {
    const cells = [];

    for (let i = 0; i < props.activeMode.gridSize; i++) {
      const cellIdx = i + 1;

      cells.push(
        <div className={styles.cell}
             onMouseEnter={() => props.changeCellState(rowIdx, cellIdx)}
             style={props.activeCells[`${rowIdx}-${cellIdx}`] ? {backgroundColor: '#03a8f4'} : {}}
             key={i}
        />
      );
    }

    return cells;
  }

  const renderRows = () => {
    const rows = [];

    for (let i = 0; i < props.activeMode.gridSize; i++) {
      rows.push(
        <div className={styles.row} key={i}>
          {renderCells(i + 1)}
        </div>
      );
    }

    return rows;
  }

  return (
    <div>
      {renderRows()}
    </div>
  );
}

export default Grid;

