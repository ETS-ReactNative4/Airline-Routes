import React, { Component } from 'react';
import DATA from '../data';

class Table extends Component {
  static defaultProps = {
    perPage: 25,
  }

  state = {
    page: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState){
   return { page: 0};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.rows !== this.props.rows) {
      this.setState({page: 0});
    } 
  }

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

  render() {
    const start = this.state.page * this.props.perPage;

    const headerCells = this.props.columns.map((column) => {
      return <th key={column.name}>{column.name}</th>
    });
    
    const bodyRows = this.props.rows.slice(start, start + this.props.perPage).map((row, i) => {
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

    return (
      <div>
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

        <p>Showing {start + 1}-{start + this.props.perPage} of {this.props.rows.length} routes.</p>
  
        <button
          disabled={this.state.page === 0}
          className='pagination' 
          onClick={this.previousPage}
        >
        Prev Page
        </button>

        <button 
          disabled={start + this.props.perPage >= this.props.rows.length}
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