import React, { FC } from 'react';
import styles from './App.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import CarBrands from '../../pages/CarBrands/CarBrands';
import CarModels from '../../pages/CarModels/CarModels';
import CarDetails from '../../pages/CarDetails/CarDetails';
import Logo from '../Logo/Logo';
import Custom from '../../pages/Custom/Custom';



const App: FC = () => {
  return (
    <div className='body-wrapper'>
      <Logo />
      <div className='container'>
        <div className={styles.content}>
          <Routes>
            <Route path='*' element={<Navigate to='/'/>} />
            <Route path='/' element={<CarBrands />} />
            <Route path='/:brand' element={<CarModels />} />
            <Route path='/:brand/custom' element={<Custom/>} />
            <Route path='/:brand/:model' element={<CarDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  )
};

export default App;
