import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
    onSubmit: null
}

function PostFilterForm(props) {
    const { onSubmit } = props;
    const [search, setSearch] = useState("");
    const typingTimeoutRef = useRef(null);
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (!onSubmit) return;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };
        typingTimeoutRef.current = setTimeout(() => {
            const formValue = search;
            onSubmit(formValue);
        }, 300);
    }
    return (
        <div>
            <form>
                <input type="text"
                    value={search}
                    onChange={handleSearchChange} />
            </form>
        </div>
    );
}

export default PostFilterForm;