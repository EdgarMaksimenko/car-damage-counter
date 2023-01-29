import React, { FC } from 'react';
import styles from './CarModels.module.css';
import { carData } from '../../data';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { carModels } from '../../data';


const CarModels: FC = () => {
  const { brand } = useParams();
  const currentBrand = carModels.find(item => item.name === brand);
  const models = carData.filter(item => item.brand === brand);
  return (
    <>
      <div className={styles.brands__item}>
        <div className={styles.brands__item__img} style={{ backgroundImage: `url(${currentBrand?.img})` }}></div>
        <p>{currentBrand?.name}</p>
      </div>


      <div className={styles.models}>
        <NavLink to={`car-damage-counter/${brand}/custom`}>CUSTOM</NavLink>
        {models.map((item,index) =>
          <NavLink to={`car-damage-counter/${brand}/${item.model}`} key={index}>{item.model}</NavLink>
        )}
      </div>
    </>
  )
};

export default CarModels;