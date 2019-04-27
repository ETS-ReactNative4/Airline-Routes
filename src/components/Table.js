import React, { Component } from 'react';
import DATA from '../data';

class Table extends Component {
  static defaultProps = {
    perPage: 25,
  }

  state = {
    page: 0,
    airline: 'all',
  };

  nextPage = (e) => {
    e.preventDefault();
    this.setState(function(prevState, props) {
      return {page: prevState.page + 1};
    });
  }

  previousPage = (e) => {
    e.preventDefault();
    this.setState(function(prevState, props) {
      return {page: prevState.page - 1};
    });
  }

  onSelectAirline = (e) => {
    this.setState({
      airline: e.target.value,
      page: 0,
    })
  }

  render() {
    const start = this.state.page * this.props.perPage;

    const headerCells = this.props.columns.map((column) => {
      return <th key={column.name}>{column.name}</th>
    });
    const allRows = this.props.rows.slice();
    const filteredRows = this.state.airline === 'all' ? allRows : allRows.filter((row) => row.airline === +this.state.airline)
    const bodyRows = filteredRows.slice(start, start + this.props.perPage).map((row, i) => {
      return (
        <tr key={Object.values(row).join(':')}>
          {Object.keys(row).map((property) => 
            <td key={property + row[property]}>
              {this.props.format(property, row[property])}
            </td> 
          )}
        </tr>
      )
    });
//debugger;
    return (
      <div>
        <select 
          name='airline'
          onChange={this.onSelectAirline}
          value={this.state.airline}
        >
          <option value="all">All Airlines</option>
          {
            DATA.airlines.map((airline) => {
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
        </select>
        <table className={this.props.className}>
          <thead>
            <tr>
              {headerCells}
            </tr>
          </thead>
          <tbody>
            {bodyRows}
          </tbody>
        </table>

        <p>Showing {start + 1}-{start + this.props.perPage} of {filteredRows.length} routes.</p>
  
        <button
          disabled={this.state.page === 0}
          className='pagination' 
          onClick={this.previousPage}
        >
        Prev Page
        </button>

        <button 
          disabled={start + this.props.perPage >= filteredRows.length}
          className='pagination' 
          onClick={this.nextPage}
        >
        Next Page
        </button>
      </div>
    )
  }
}

export default Table;