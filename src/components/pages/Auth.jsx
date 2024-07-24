import React from 'react';
import css from '../../styles/dataList.css';
import { useNavigate } from 'react-router-dom';

const {DataContainer, ContentLine, ContentCell, ButtonsLine, ButtonItem} = css;

const Auth = () => {
    const navigate = useNavigate();
    
    const handleCLick = () => {
        navigate('/user');
    }

    return (
        <DataContainer>
            Доступ закрыт. Необхдима авторизация под пользователем.

            <ButtonItem  onClick={() => handleCLick()}>На страницу пользователей</ButtonItem>
        </DataContainer>
    )
}

export default Auth;