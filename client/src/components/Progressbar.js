import React from 'react';
import styled from 'styled-components';

// Progressbar styling
const Track = styled.div`
position: relative;
width: 100%;
height: 20px;
background-color: #95bed6;
border-radius: 10px;
// box-shadow: inset 0 0 5px #000;
`;
const Thumb = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: #0253a9;
  border-radius: 6px;
  transition: width 1s ease-in-out;
  //box-shadow: inset 0 0 5px #000;
  `;
const Number = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0%;
color: white;
font-weight: bold;`
export default function Progressbar(props) {

  const clamp = function(min, value, max) {
    return Math.min(Math.max(min, value), max);
  }

  return(
    <>
    <Track>
      <Thumb percentage={clamp(0, props.percentage, 100)}></Thumb>
      <Number>{props.percentage}%</Number>
    </Track>
    </>
  )
}