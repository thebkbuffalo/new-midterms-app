import React, { Fragment } from 'react';
import {BrowserRouter, Route, Routes, Navigate, useParams, NavLink} from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import MidtermInfo from './components/MidtermInfoContainer';

const App = () => {
  return(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar></NavBar>
        <Fragment>
          <Routes>
            <Route exact path="/" element={<MidtermInfo/>}/>
          </Routes>
        </Fragment>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;

function NavBar(){
  return(
    <div className='navbar'>
      <NavLink to="/">Home</NavLink>
    </div>
  )
}


