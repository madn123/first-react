import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData as setDataRedux } from './redux-state/data/dataSlice';
import {Routes, Route} from 'react-router-dom';
import Header from './components/views/global/Header'
import Footer from './components/views/global/Footer';
import Main from './components/pages/Main';
import Stat from './components/pages/Stat';
import User from './components/pages/User';
import Auth from './components/pages/Auth';
import FooterContext from './redux-state/context/footerContext';
import { selectUser } from './redux-state/data/selectors';

import css from './styles/styles.css'

const {Wrapper, Container} = css;

function App() {
  const dispatch = useDispatch();

  const [footerText, setFooterText] = useState('Kurs po React!');

  const user = useSelector(selectUser);

  const setData = (param) => {
    dispatch(setDataRedux(param));
  };

  return (
    <Wrapper>
      <Header></Header>
      <Container>
        <Routes>
          <Route
            path={'/main'}
            element={user.id ? <Main action={setData}/> : <Auth />}
          />
          <Route
            path={'/stat/:viewType'}
            element={user.id ? <Stat /> : <Auth />}
          />
          <Route
            path={'/user/'}
            element={<User />}
          />
          <Route
            path={'*'}
            element={<Main action={setData}/>}
          />
        </Routes>
      </Container>

      <FooterContext.Provider value={[footerText, setFooterText]}>
        {/* <FooterContext.Consumer>
          {value => <Footer>{value}</Footer>}
        </FooterContext.Consumer> */}
        <Footer/>
      </FooterContext.Provider>
    </Wrapper>
  );
}

export default App;
