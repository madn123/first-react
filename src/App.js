import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setData as setDataRedux, updateComputed } from './redux-state/reducers/data';
import {Routes, Route} from 'react-router-dom';
import Header from './components/views/global/Header'
import Footer from './components/views/global/Footer';
import Main from './components/pages/Main';
import Stat from './components/pages/Stat';
import Plan from './components/pages/Plan';
import FooterContext from './redux-state/context/footerContext';

import css from './styles/styles.css'

const {Wrapper, Container} = css;

function App() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.dataReducer.data);
  const computedData = useSelector(state => state.dataReducer.computed);

  const [footerText, setFooterText] = useState('Kurs po React!');

  const setData = (param) => {
    dispatch(setDataRedux(param));
    dispatch(updateComputed(param));
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
            path={'/plan/'}
            element={<Plan statData={data}/>}
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
