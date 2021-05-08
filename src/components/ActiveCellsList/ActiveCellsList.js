import React, { Component } from 'react';

import styles from './ActiveCellsList.module.scss';

class ActiveCellsList extends Component {
  renderList = () => {
    return Object.values(this.props.activeCells).map((currElem, index) => (
      currElem &&
      <li key={index} className={styles.listItem}>
        {currElem}
      </li>
    ));
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Highlighted squares</h1>
        <ul className={styles.list}>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default ActiveCellsList;

