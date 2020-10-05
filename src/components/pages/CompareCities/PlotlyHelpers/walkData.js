import React from 'react';
import Loader from '../../../common/Loader';
export default function WalkData(props) {
  return (
    <>
      {!props.walk.walkFill[props.walk.number] ? (
        <Loader />
      ) : (
        props.walk.walkFill[props.walk.number]
      )}
    </>
  );
}
