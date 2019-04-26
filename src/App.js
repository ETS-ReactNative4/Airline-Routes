import React, { Component } from 'react';
import './App.css';
import DATA from './data';

import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props);
  }

  formatValue(property, value) {
    let str = '';
    if (property === 'src'|| property === 'dest') {
      str = DATA.airportByCode(value);
    } else if (property === 'airline') {
      str = DATA.airportByCode(value)
    }

    return str;
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const rows = DATA.routes.map((route) => {
      return {
        name: DATA.airlineById(route.airline),
        src: DATA.airportByCode(route.src),
        dest: DATA.airportByCode(route.dest),
      };
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table className="routes-table" columns={columns} rows={rows} format={this.formatValue} />
        </section>
      </div>
    );
  }
}

export default App;

