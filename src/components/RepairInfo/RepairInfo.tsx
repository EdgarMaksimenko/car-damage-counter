import React, { FC } from 'react';
import styles from './RepairInfo.module.css';
import close from '../../static/close-btn.png'
import { useAppSelector, useAppDispatch } from '../../hooks';
import { clearTotal, removePart } from '../../store/slices/totalSlice';
import { useForm } from 'react-hook-form';
import { postToTelegram, postCustomToTelegram } from '../../services/telegram';
import { useNavigate } from 'react-router-dom';
import { removeCustomPart } from '../../store/slices/totalCustomSlice';

interface IRepairInfoProps {
  brand: string | undefined;
  model: string | undefined;
}

const RepairInfo: FC<IRepairInfoProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allItems = useAppSelector(state => state.totalList.carParts);
  const totalPrice = useAppSelector(state => state.totalList.total);
  const opened = useAppSelector(state => state.totalList.isOpened);

  const customItems = useAppSelector(state => state.totalCustomList.carCustomParts);
  const totalCustomPrice = useAppSelector(state => state.totalCustomList.total);
  const customOpened = useAppSelector(state => state.totalCustomList.isOpened);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

 

  if (props.model !== 'custom') {

    const onSubmit = (data: any) => {
      const finalInfo = {
        vin: data.vin,
        car: props.brand + ' ' + props.model,
        parts: allItems,
        total: totalPrice
      }
      postToTelegram(finalInfo);
      reset();
      navigate('car-damage-counter/');
    };

    return (
      <div className={opened ? styles.repair__info + ' ' + styles.active : styles.repair__info}>
        <p className={styles.title__brand}>{props.brand}</p>
        <p className={styles.title__model}>{props.model}</p>
        <div className={styles.repair__parts}>
          {allItems && allItems.map((item, index) =>
            <div className={styles.repair__parts__item} key={index}>
              <button onClick={() => dispatch(removePart(item.name))}><img src={close} alt="close" /></button>
              <div>
                <p>{item.name} ({item.quality}) x{item.count} : {item.partPrice}$</p>
                <p>Работа : {item.workPrice}$</p>
                <p>Всего : {item.totalPrice}$</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.repair__footer}>
          <p>Ремонт : {totalPrice}$</p>
          <form id='order_form' onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('vin', {

              })}
              placeholder="VIN CODE"
              required={false}
              autoComplete='off'
              id='vin'
            />
            <button type='submit'>Отправить</button>
          </form>
        </div>
      </div>
    )
  } else {
    const onSubmit = (data: any) => {
      const finalInfo = {
        vin: data.vin,
        car: props.brand,
        parts: customItems,
        total: totalCustomPrice
      }
      postCustomToTelegram(finalInfo);
      reset();
      navigate('car-damage-counter/');
    };

    return (
      <div className={customOpened ? styles.repair__info + ' ' + styles.active : styles.repair__info}>
        <p className={styles.title__brand}>{props.brand}</p>
        <p className={styles.title__model}>{props.model}</p>
        <div className={styles.repair__parts}>
          {customItems && customItems.map((item, index) =>
            <div className={styles.repair__parts__item} key={index}>
              <button onClick={() => dispatch(removeCustomPart(item.name))}><img src={close} alt="close" /></button>
              <div>
                <p>{item.name} x{item.count} : {item.partPrice}$</p>
                <p>Работа : {item.workPrice}$</p>
                <p>Всего : {item.totalPrice}$</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.repair__footer}>
          <p>Ремонт : {totalCustomPrice}$</p>
          <form id='order_form' onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('vin', {

              })}
              placeholder="VIN CODE"
              required={false}
              autoComplete='off'
              id='vin'
            />
            <button type='submit'>Отправить</button>
          </form>
        </div>
      </div>
    )
  }

};

export default RepairInfo;