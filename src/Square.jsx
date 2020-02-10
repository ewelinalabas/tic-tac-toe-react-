import React from 'react';

export const Square = (props) => {
  let className = "square"
  if(props.winning) {className += " square-win"}
  return (
    <button 
      className={className} 
      onClick={() => {props.handleClick(props.index)}}
    >
      {props.value}
    </button>
  )
}