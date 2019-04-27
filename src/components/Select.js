import React, { Component } from 'react';

// class Select extends Component {
//   render() {
//     return (
//       <select 
//         name='airline'
//         onChange={this.props.onSelect}
//         value={this.props.value}
//       >
//         <option value="all">{this.props.allTitle}</option>
//         {this.props.options}
//       </select>
//     )
//   }
// }

function Select(props) {
  return (
    <select 
      name='airline'
      onChange={props.onSelect}
      value={props.value}
    >
      <option value="all">{props.allTitle}</option>
      {props.options}
    </select>
  )
}

export default Select;