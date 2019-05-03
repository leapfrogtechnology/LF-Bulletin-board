import PropTypes from 'prop-types';
import React from 'react';
import {isUndefined} from 'lodash';

const Toggle = ({active, toggleActive}) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isUndefined(active) ? 0: active} onChange={() => toggleActive()}/>
      <div className="slider"></div>
    </label>
  );
};

Toggle.propTypes = {
  toggleActive: PropTypes.func,
  active: PropTypes.number
};

export default Toggle;
