import React, {useContext} from 'react';
import css from '../../../styles/styles.css';
import FooterContext from '../../../redux-state/context/footerContext';

const { FooterContainer } = css;

const Footer = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [footerText, setFooterText] = useContext(FooterContext);

    return (
        <FooterContainer onClick={() => setFooterText('NOVIY TEKST')}>{footerText}</FooterContainer>
    )
}

export default Footer;