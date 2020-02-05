import React, { useState } from 'react';

export const Square = (props) => {
  return (
    <button 
      className="square" 
      onClick={() => {props.handleClick('x', props.index)}}
    >
      {props.value}
    </button>
  )
}