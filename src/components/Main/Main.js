import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Main.module.scss';
import Grid from 'components/Grid/Grid';
import ActiveCellsList from 'components/ActiveCellsList/ActiveCellsList';
import { ReactComponent as Arrow } from './img/down-arrow.svg'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mods: props.mods,
      activeMode: null,
      isModeStarted: false,
      activeCells: {},
      isDropdownOpened: false
    }
  }

  changeCellState = (rowIdx, cellIdx) => {
    if (!this.state.isModeStarted) return;

    this.setState(prevState => ({
      activeCells: {
        ...prevState.activeCells,
        [`${rowIdx}-${cellIdx}`]: prevState.activeCells[`${rowIdx}-${cellIdx}`] ? null : `row ${rowIdx} - col ${cellIdx}`
      }
    }));
  }

  changeMode = (currMode) => {
    this.setState({
      activeMode: currMode,
      activeCells: {}
    });
  }

  renderOptions = () => {
    return this.state.mods.map((currMode, index) => (
      <div className={styles.option} key={index} onClick={() => this.changeMode(currMode)}>
        {currMode.modeName}
      </div>
    ));
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened
    }));
  }

  toggleStartBtn = () => {
    if (!this.state.activeMode) return;

    this.setState(prevState => (
      {isModeStarted: !prevState.isModeStarted}
    ));
  }

  render() {
    const {
      activeMode,
      isModeStarted,
      activeCells,
      isDropdownOpened
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <div className={styles.controls}>
            <div
              className={cx(
                styles.select,
                {[styles.selectOpened]: isDropdownOpened}
              )}
              onClick={this.toggleDropdown}
            >
              { (activeMode && activeMode.modeName) ||
                <span className={styles.selectDefaultValue}>Pick a mode</span>
              }
              <Arrow />
              <div className={styles.dropdown}>
                {this.renderOptions()}
              </div>
            </div>
            <button
              type="button"
              className={cx(
                styles.startBtn,
                { [styles.startBtnDisabled]: !activeMode,
                  [styles.startBtnActive]: isModeStarted}
              )}
              onClick={this.toggleStartBtn}
            >
              {isModeStarted ? 'STOP' : 'START'}
            </button>
          </div>
          { activeMode &&
            <Grid
                activeMode={activeMode}
                activeCells={activeCells}
                changeCellState={this.changeCellState}
            />
          }
        </div>
        { activeMode &&
          <ActiveCellsList activeCells={activeCells} />
        }
      </div>
    );
  }
}

export default Main;