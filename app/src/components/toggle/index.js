import PropTypes from 'prop-types';
import React from 'react';
import { isUndefined } from 'lodash';

/**
 *
 *
 * @param {*} Params { active, toggleActive }.
 * @returns
 */
const Toggle = ({ active, toggleActive }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isUndefined(active) ? false : active} onChange={() => toggleActive()} />
      <div className="slider"></div>
    </label>
  );
};

Toggle.propTypes = {
  toggleActive: PropTypes.func,
  active: PropTypes.bool
};

export default Toggle;
