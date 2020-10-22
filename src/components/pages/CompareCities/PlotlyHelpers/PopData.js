import React from 'react';
import Loader from '../../../common/Loader';
export default function PopData(props) {
  return (
    <>
      {!props.population.popFill[props.population.number] ? ( // if the weatherFill[index] does not exist
        // display a Loader
        <Loader />
      ) : (
        // else display the weatherFill if the index exists
        props.population.popFill[props.population.number]
      )}
    </>
  );
}
