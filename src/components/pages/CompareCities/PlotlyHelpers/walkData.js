import React from 'react';
import Loader from '../../../common/Loader';
export default function WalkData(props) {
  return (
    <>
      {!props.walk.walkFill[props.walk.number] ? ( // if the walkFill[index] does not exist
        // display a Loader
        <Loader />
      ) : (
        // else display the walkFill if the index exists
        props.walk.walkFill[props.walk.number]
      )}
    </>
  );
}
