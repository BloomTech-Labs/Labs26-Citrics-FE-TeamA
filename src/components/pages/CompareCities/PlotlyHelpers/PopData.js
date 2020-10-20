import React from 'react';
import Loader from '../../../common/Loader';
export default function PopData(props) {
  return (
    <>
      {!props.population.popFill[props.population.number] ? (
        <Loader />
      ) : (
        props.population.popFill[props.population.number]
      )}
    </>
  );
}