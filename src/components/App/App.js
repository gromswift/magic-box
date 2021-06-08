import React, { Component } from 'react';
import cx from 'classnames';

import Main from 'components/Main/Main';
import styles from './App.module.scss';

const GET_MODS_URL = process.env.REACT_APP_GET_MODS_URL;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      mods: null,
      error: null
    }
  }

  componentDidMount() {
    this.fetchMods();
  }

  handleMods = (result) => {
    if (typeof result !== 'object' || result === null) return;

    return Object.keys(result).map(currKey => (
      {
        modeName: currKey.replace('Mode', ''),
        gridSize: result[currKey].field
      }
    ));
  }

  fetchMods = () => {
    fetch(GET_MODS_URL)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isFetching: false,
          mods: this.handleMods(result)
        });
      })
      .catch(err => {
        this.setState({
          isFetching: false,
          error: err
        });
      });
  }

  render() {
    const {
      isFetching,
      mods,
      error
    } = this.state;

    if (error || (!isFetching && !mods)) {
      return (
        <div className={cx(styles.app, styles.error)}>
          Some error has occurred!!!
        </div>
      );
    }

    return (
      <div className={styles.app}>
        { isFetching
          ? <div className={styles.loader}>Loading ...</div>
          : <Main mods={mods}/>
        }
      </div>
    );
  }
}

export default App;
