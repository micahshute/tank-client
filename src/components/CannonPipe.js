import React from 'react';
import { pathFromBezierCurve } from '../utils/formulas';

const CannonPipe = (props) => {
  const cannonPipeStyle = {
    fill: '#999',
    stroke: '#666',
    strokeWidth: '2px',
  };
  const transform = `rotate(${props.rotation}, 0, 0)`;

  const muzzleWidth = 20;
  const halfMuzzle = 10;
  const height = 140;
  const yBasis = 100;

  const cubicBezierCurve = {
    initialAxis: {
      x: -halfMuzzle,
      y: -yBasis,
    },
    initialControlPoint: {
      x: 0,
      y: height * 1.7,
    },
    endingControlPoint: {
      x: muzzleWidth,
      y: height * 1.7,
    },
    endingAxis: {
      x: muzzleWidth,
      y: 0,
    },
  };

  return (
    <g transform={transform}>
        <rect 
            style={cannonPipeStyle}
            x={-halfMuzzle}
            y={-yBasis}
            width={muzzleWidth}
            height={height}
        />
    </g>
  );
};


export default CannonPipe;