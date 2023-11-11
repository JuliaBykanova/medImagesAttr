import React from 'react';
import { Layout } from './components/Layout';
import './main.global.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TemplatePage } from './pages/TemplatePage';
import { Provider } from 'react-redux';
import store from './redux/redux-store';


 export function App() {

  return(
    <Provider store={store}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/templates' element={<TemplatePage/>}></Route>
            <Route path='/templates/:idParam' element={<TemplatePage/>}></Route>
            <Route path='/' element={ <Navigate to='/templates'/> }/>
          </Routes>
        </BrowserRouter>
      </Layout>
    </Provider>
  );
};

