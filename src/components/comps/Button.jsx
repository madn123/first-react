import React, { Children } from 'react';

const buttonCss = {
    display: 'block',
    padding: '10px 14px 12px',
    borderRadius: '6px',
    backgroundColor: '#b0f347',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit'
}

const Button = (props) => {
    const {children, onClick} = props;

    return (
        <button style={buttonCss} onClick={onClick}>{children}</button>
    )
}

export default Button;