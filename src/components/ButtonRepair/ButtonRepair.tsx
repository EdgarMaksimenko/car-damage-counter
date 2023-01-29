import React, { FC } from 'react';
import styles from './ButtonRepair.module.css';
import repair from '../../static/repair-icon.png';
import { useAppDispatch } from '../../hooks';
import { toggleTotal } from '../../store/slices/totalSlice';
import { toggleCustomTotal } from '../../store/slices/totalCustomSlice';

interface IButtonRepairInfoProps {
  buttonType: string | null;
}

const ButtonRepair: FC<IButtonRepairInfoProps> = (props) => {
  const dispatch = useAppDispatch();

  if (props.buttonType === 'normal') {
    return (
      <button className={styles.repair} onClick={() => dispatch(toggleTotal())}><img src={repair} alt="repair-icon" /></button>
    )
  }
  else{
    return (
      <button className={styles.repair} onClick={() => dispatch(toggleCustomTotal())}><img src={repair} alt="repair-icon" /></button>
    )
  }
};

export default ButtonRepair;