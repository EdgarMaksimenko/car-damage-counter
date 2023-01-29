import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo: FC = () => {
  return (
    <NavLink to='/'><div className={styles.logo}></div></NavLink>
  )
};

export default Logo;