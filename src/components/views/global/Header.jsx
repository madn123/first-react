import React from 'react';
import css from '../../../styles/styles.css';
import HOCButton from '../../comps/HOCHeaderButton';
import Button from '../../comps/Button';


const HOCButtonComponent = HOCButton(Button);

const {HeaderContainer, HeaderCSS} = css;

const Header = () => {
    return (
        <>
            <HeaderContainer>
                <HeaderCSS.Logo>Finnmanager</HeaderCSS.Logo>
                <HeaderCSS.MenuContainer>
                    <HOCButtonComponent 
                        text={'/main'} 
                        onClick={() => console.log('main')}
                    >
                        Главная
                    </HOCButtonComponent>

                    <HOCButtonComponent 
                        text={'/stat/расход'} 
                        onClick={() => console.log('stat/расход')}
                    >
                        Статистика
                    </HOCButtonComponent>

                    <HOCButtonComponent 
                        text={'/plan'} 
                        onClick={() => console.log('plan')}
                    >
                        Планирование
                    </HOCButtonComponent>
                </HeaderCSS.MenuContainer>
            </HeaderContainer>
        </>
    )
}

export default Header;