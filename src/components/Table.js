import React, { Component } from 'react';

class Table extends Component {
  render() {
    const headerCells = this.props.columns.map((column) => {
      return <th key={column.name}>{column.name}</th>
    });

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            {headerCells}
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

export default Table;