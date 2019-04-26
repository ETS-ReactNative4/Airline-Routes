import React, { Component } from 'react';
import './App.css';
import DATA from './data';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {name: 'Airline'},
      {name: 'Source Airport'},
      {name: 'Destination Airport'},
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
          <Table
            className='routes-table'
            columns={columns}
            rows={rows}
          >

          </Table>
        </section>
      </div>
    );
  }
}

export default App;

class Table extends Component {
  render() {
    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {
              this.props.columns.map((column, i) => {
                return (<th key={i}>{column.name}</th>);
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            this.props.rows.map((row, i) => {
              return (
                <tr key={i}>
                  <td>{row.name}</td>
                  <td>{row.src}</td>
                  <td>{row.dest}</td>
                </tr>
              )
            })
          }        
        </tbody>
      </table>
    )
  }
}