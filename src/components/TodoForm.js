import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    value: PropTypes.string
};

TodoForm.defaultProps = {
    onSubmit: null,
    value: null
}
function TodoForm(props) {
    const { onSubmit, handleChange, value } = props;
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={e => handleChange(e)}
            />
            <button onClick={onSubmit}>add</button>

        </div>
    );
}

export default TodoForm;