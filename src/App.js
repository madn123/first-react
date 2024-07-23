import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData as setDataRedux } from './redux-state/data/dataSlice';
import {Routes, Route} from 'react-router-dom';
import Header from './components/views/global/Header'
import Footer from './components/views/global/Footer';
import Main from './components/pages/Main';
import Stat from './components/pages/Stat';
import User from './components/pages/User';
import FooterContext from './redux-state/context/footerContext';
import { selectComputedData, selectAllData } from './redux-state/data/selectors';

import css from './styles/styles.css'

const {Wrapper, Container} = css;

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllData);
  const computedData = useSelector(selectComputedData);

  const [footerText, setFooterText] = useState('Kurs po React!');

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
            element={<Main action={setData}/>}
          />
          <Route
            path={'/stat/:viewType'}
            element={<Stat statData={data} computedData={computedData}/>}
          />
          <Route
            path={'/user/'}
            element={<User statData={data}/>}
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
