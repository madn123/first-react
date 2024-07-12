import React from 'react';
import { useNavigate } from 'react-router-dom';

const HOCButton = (ButtonComponent) => {
    return (props) => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();

        const onClick = () => {
            navigate(props.text);
        }

        return <ButtonComponent {...props} onClick={onClick}/>
    }
}

export default HOCButton;