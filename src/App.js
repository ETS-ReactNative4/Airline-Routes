import React, { Component } from 'react';
import './App.css';
import DATA from './data';

import Table from './components/Table';
import Select from './components/Select';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airline: 'all',
      
    };
  }

  formatValue(property, value) {
    let str = '';
    if (property === 'src'|| property === 'dest') {
      str = DATA.airportByCode(value);
    } else if (property === 'airline') {
      str = DATA.airlineById(value);
    }

    return str;
  }

  filteredAirlines() {    
    return DATA.airlines.map((airline) => {
      return (
        <option
          key={airline.id}
          value={airline.id}
        >
          {DATA.airlineById(airline.id)}
        </option>
      )
    }) 
  }

  filteredRows() {
    const allRows = DATA.routes.slice();
    const filteredRows = this.state.airline === 'all' ? allRows : allRows.filter((row) => row.airline === +this.state.airline)

    return filteredRows;
  }

  handleSelect = (e) => {
    this.setState({
      airline: e.target.value,
    })
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Select options={this.filteredAirlines()} 
                  valueKey="id" 
                  titleKey="name"
                  allTitle="All Airlines" 
                  value={this.state.airline}
                  onSelect={this.handleSelect}
          />
          <Table className="routes-table" columns={columns} rows={this.filteredRows()} format={this.formatValue} />
        </section>
      </div>
    );
  }
}

export default App;

