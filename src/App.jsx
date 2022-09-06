import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import './styles/styles.css';
import AppContext from './context/AppContext';
import useInitialState from './hooks/useInitialState'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const initialState = useInitialState();
    return(
        <AppContext.Provider value={initialState}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home/>}></Route>
                        <Route path='*' element={<NotFound/>}></Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
