import React, { FC } from 'react';
import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
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
            <Route path='/car-damage-counter' element={<CarBrands />} />
            <Route path='/:brand' element={<CarModels />} />
            <Route path='/:brand/custom' element={<Custom/>} />
            <Route path='/:brand/:model' element={<CarDetails />} />
          </Routes>
        </div>
      </div>
      {/* <Route path='*' element={<Navigate to='/404' />} />
          <Route path ='/404' element={<NotFound/>}/>  */}
    </div>
  )
};

export default App;
