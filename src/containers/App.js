import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as dc from '@mapd/mapdc';
const _ = require('lodash');

import LeftNav from './LeftNav.js';
import SearchBar from './SearchBar.js';
import MapChart from './MapChart.js'
import LineChart from './LineChart.js'
import Legend from './Legend.js'
import TweetResults from './TweetResults.js'

import { mapdConnect } from '../thunks/mapdConnect'
import createMapChart from '../thunks/mapChart';
import createLineChart from '../thunks/lineChart';

let charts = []
let resizeListener = null

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const dispatch = this.props.dispatch

    dispatch(mapdConnect())
      .then(() => {
        // run chart init thunks
        return Promise.all([
          dispatch(createMapChart()),
          dispatch(createLineChart())
        ])
      }).then((result) => {
        // render charts
        charts = result
        return dc.renderAllAsync()
      }).then(() => {
        // attach resize listener
        const [[mapChart, mapSizeFunc], [lineChart, lineSizeFunc]] = charts

        resizeListener = _.debounce(() => {
          const [mapW, mapH] = mapSizeFunc();
          const [lineW, lineH] = lineSizeFunc();

          mapChart.map().resize();
          mapChart.isNodeAnimate = false;
          mapChart.width(mapW).height(mapH).render();

          lineChart.width(lineW).height(lineH)

          dc.redrawAllAsync();
        }, 500)

        window.addEventListener("resize", resizeListener);
      }, err =>  {
        console.log(err)
      })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", resizeListener);
  }

  render() {
    return (
      <dash>
        <LeftNav/>

        <main>
          <map>
            <SearchBar/>
            <MapChart/>
            <LineChart/>
            <Legend/>
          </map>
        </main>

        <TweetResults/>
      </dash>
    );
  }
}

export default connect()(App)
