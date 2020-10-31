import React from 'react';
import { connect, useSelector, shallowEqual } from 'react-redux';

import { addOne, subtractOne } from './redux/test-actions';
import { counterSelector } from './redux/test-selectors';

const TestFeature = ({ addOne, subtractOne }) => {
  const counter = useSelector(counterSelector, shallowEqual);
  return (
    <div>
      <h2>Test counter: {counter}</h2>
      <button onClick={addOne}>Add</button>
      <button onClick={subtractOne}>Subtract</button>
    </div>
  );
};

const mapDispatchToProps = {
  addOne,
  subtractOne,
};

export default connect(null, mapDispatchToProps)(TestFeature);
