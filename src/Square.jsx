import React from 'react';

export const Square = (props) => {
  return (
    <button 
      className="square" 
      onClick={() => {props.handleClick(props.index)}}
    >
      {props.value}
    </button>
  )
}