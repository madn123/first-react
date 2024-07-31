import React from 'react';
import css from '../../../styles/styles.css';
import HOCButton from '../../comps/HOCHeaderButton';
import Button from '../../comps/Button';
import { selectUser } from '../../../redux-state/data/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux-state/data/userSlice';
import { FaUserAstronaut } from "react-icons/fa";
import { IoLogoOctocat } from "react-icons/io";
import { RiLogoutBoxRFill } from "react-icons/ri";

const HOCButtonComponent = HOCButton(Button);

const {HeaderContainer, HeaderCSS} = css;

const Header = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setUser({}));
    }

    return (
        <>
            <HeaderContainer>
                <HeaderCSS.Logo><IoLogoOctocat /> Finnmanager</HeaderCSS.Logo>
                <HeaderCSS.MenuContainer>
                    <HOCButtonComponent 
                        text={'/'}
                    >
                        Добавить транзакцию
                    </HOCButtonComponent>

                    <HOCButtonComponent 
                        text={'/stat/all'}
                    >
                        Статистика транзакций
                    </HOCButtonComponent>

                    <HOCButtonComponent 
                        text={'/user'}
                    >
                        Список пользователей
                    </HOCButtonComponent>
                </HeaderCSS.MenuContainer>
                <HeaderCSS.PersonalContainer>
                    <FaUserAstronaut fontSize={'32px'} /> {user.name ? user.name : 'Требуется авторизация'} {user.name && <RiLogoutBoxRFill onClick={() => handleClick()} />}
                </HeaderCSS.PersonalContainer>
            </HeaderContainer>
        </>
    )
}

export default Header;