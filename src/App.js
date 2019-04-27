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
      airport: 'all',
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
          disabled={!this.filteredRows().some((row) => {
            return row.airline === airline.id;
          })}
        >
          {DATA.airlineById(airline.id)}
        </option>
      )
    }) 
  }

  filteredAirports() {
    return DATA.airports.map((airport) => {
      return (
        <option
          key={airport.code}
          value={airport.code}
          disabled={!this.filteredRows().some((row) => {
            return row.src === airport.code || row.dest === airport.code;
          })}
        >
          {DATA.airportByCode(airport.code)}
        </option>
      )
    }) 
  }

  filteredRows() {
    let rows = DATA.routes.slice();
    if (this.state.airline !== 'all') {
      rows = rows.filter(row => this.filteredByAirline(row));
    }

    if (this.state.airport !== 'all') {
      rows = rows.filter(row => this.filteredByAirport(row));
    }

    return rows;
  }

  filteredByAirline(row) {
    return row.airline === +this.state.airline;
  }

  filteredByAirport(row) {
    return row.src === this.state.airport || row.dest === this.state.airport;
  }

  airlineSelected = (e) => {
    this.setState({
      airline: e.target.value,
    })
  }

  airportSelected = (e) => {
    this.setState({
      airport: e.target.value,
    })
  }

  clearFilters = (e) => {
    this.setState({
      airport: 'all',
      airline: 'all',
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
          Show routes on:
          <Select options={this.filteredAirlines()} 
                  valueKey="id" 
                  titleKey="name"
                  allTitle="All Airlines" 
                  value={this.state.airline}
                  onSelect={this.airlineSelected}
          />
          flying in or out of:
          <Select options={this.filteredAirports()} 
                  valueKey="id" 
                  titleKey="name"
                  allTitle="All Airports" 
                  value={this.state.airport}
                  onSelect={this.airportSelected}
          />
          <button
            onClick={this.clearFilters}
          >
          Clear Filters
          </button>

          <Table className="routes-table" columns={columns} rows={this.filteredRows()} format={this.formatValue} />
        </section>
      </div>
    );
  }
}

export default App;

