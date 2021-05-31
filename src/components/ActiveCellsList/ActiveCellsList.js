import styles from './ActiveCellsList.module.scss';

function ActiveCellsList(props) {
  const renderList = () => {
    return Object.values(props.activeCells).map((currElem, index) => (
      currElem &&
      <li key={index} className={styles.listItem}>
        {currElem}
      </li>
    ));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Highlighted squares</h1>
      <ul className={styles.list}>
        {renderList()}
      </ul>
    </div>
  );
}

export default ActiveCellsList;

