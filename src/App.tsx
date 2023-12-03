import React from 'react';
import { Layout } from './components/Layout';
import './main.global.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TemplatePage } from './pages/TemplatePage';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import { Login } from './pages/AuthPage/Login';
import { Register } from './pages/AuthPage/Register';
import { Recovery } from './pages/AuthPage/Recovery';
import { Profile } from './pages/AuthPage/Profile';


 export function App() {

  return(
    <Provider store={store}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/recovery' element={<Recovery/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/templates' element={<TemplatePage/>}></Route>
            <Route path='/templates/:idParam' element={<TemplatePage/>}></Route>
            <Route path='/' element={ <Navigate to='/templates'/> }/>
          </Routes>
        </BrowserRouter>
      </Layout>
    </Provider>
  );
};

