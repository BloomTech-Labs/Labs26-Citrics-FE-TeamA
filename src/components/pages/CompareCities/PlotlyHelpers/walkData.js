import React from 'react';
import Loader from '../../../common/Loader';
export default function WalkData(props) {
  return (
    <>
      {!props.props.walkFill[props.props.number] ? (
        <Loader />
      ) : (
        props.props.walkFill[props.props.number]
      )}
    </>
  );
}
