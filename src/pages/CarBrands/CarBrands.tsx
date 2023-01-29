import React, { FC } from 'react';
import styles from './CarBrands.module.css';
import { carModels } from '../../data';
import { NavLink } from 'react-router-dom';

const CarBrands: FC = () => {
  return (
    <div className={styles.brands}>
      {carModels.map((car, index) =>
        <NavLink to={`/car-damage-counter/${car.name}`} className={styles.brands__item} key={index}>
          <div className={styles.brands__item__img} style={{backgroundImage: `url(${car.img})`}}></div>
          <p>{car.name}</p>
        </NavLink>
      )}
    </div>
  )
};

export default CarBrands;