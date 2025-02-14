// import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Login, Register, HomePage, DashboardPage} from "./pages"
import { checkIsLoggedIn } from './redux/actionCreators/authActionCreator';
import DashboardPage1 from './pages/DashboardPage1/DashboardPage1';

function App () {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkIsLoggedIn());
  },[])
 
  return (
    <>
      <div className='App'>
        <Router>
          <Routes >
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/dashboard1' element={<DashboardPage1 />} />
          </Routes>
        </Router> 
      </div>
    </>
  )
}

export default App
