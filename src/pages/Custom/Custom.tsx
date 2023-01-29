import React, { FC } from 'react';
import styles from './Custom.module.css';
import ButtonRepair from '../../components/ButtonRepair/ButtonRepair';
import RepairInfo from '../../components/RepairInfo/RepairInfo';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addCustomPart, changeCustomPartPrice, changeCustomPartCount, changeCustomPartRepair, clearCustomTotal } from '../../store/slices/totalCustomSlice';
import { dataCustom } from '../../data';

const Custom: FC = () => {
  const { brand } = useParams();
  const dispatch = useAppDispatch();
  const [category, setCategory] = React.useState(dataCustom[0].category);
  const allItems = useAppSelector(state => state.totalCustomList.carCustomParts);


  React.useEffect(() => {
    dispatch(clearCustomTotal());
  }, [dispatch]);

  const addItem = (name: string, price: number, action: string) => {
    switch (action) {
      case 'changeCount':
        if (!allItems.find(item => item.name === name)) {
          const newItem = {
            name,
            count: 1,
            partPrice: price,
            workPrice: 0,
            totalPrice: price,
          };
          dispatch(addCustomPart(newItem));
        } else {
          dispatch(changeCustomPartCount({ name, price }));
        };
        break;
      case 'changePart':
        if (!allItems.find(item => item.name === name)) {
          const newRepair = {
            name,
            count: 0,
            partPrice: price,
            workPrice: 0,
            totalPrice: price,
          };
          dispatch(addCustomPart(newRepair));
        } else {
          dispatch(changeCustomPartPrice({ name, price }));
        }
        break;
      case 'changeRepair':
        if (!allItems.find(item => item.name === name)) {
          const newItem = {
            name,
            count: 0,
            partPrice: 0,
            workPrice: price,
            totalPrice: price,
          };
          dispatch(addCustomPart(newItem));
        } else {
          dispatch(changeCustomPartRepair({ name, price }));
        }
        break;
      default:
        return
    }
  };


  return (
    <>
      <div className={styles.category}>
        {dataCustom.map(item =>
          <button key={item.id}
            onClick={() => setCategory(item.category)}
            className={item.category === category ? styles.active : ' '}
          >{item.name}</button>
        )}
      </div>

      <div className={styles.part__custom}>
        <ButtonRepair buttonType={'custom'} />
        <RepairInfo brand={brand} model={'custom'} />
        {dataCustom.find(el => el.category === category)?.items.map((item, index) =>
          <div className={styles.part__custom__item} key={index}>
            <p>{item}</p>
            <div className={styles.add__block}>
              <div className={styles.add__btn}>
                <button onClick={() => addItem(item, 0, 'changeCount')}>Добавить</button>
              </div>
              <div>
                <p className={styles.add__info}>Кол-во: {allItems.find(el => el.name === item)?.count || 0}</p>
                <p className={styles.add__info}>Цена: {allItems.find(el => el.name === item)?.partPrice || 0}</p>
              </div>
            </div>

            <div className={styles.buttons__main}>
              <button onClick={() => addItem(item, 10, 'changePart')}>+10</button>
              <button onClick={() => addItem(item, 50, 'changePart')}>+50</button>
              <button onClick={() => addItem(item, 100, 'changePart')}>+100</button>
              <button onClick={() => addItem(item, 250, 'changePart')}>+250</button>
              <button onClick={() => addItem(item, 500, 'changePart')}>+500</button>
              <button onClick={() => addItem(item, 1000, 'changePart')}>+1000</button>
            </div>
            <p className={styles.repair}>Работа: {allItems.find(el => el.name === item)?.workPrice || 0}</p>
            <div className={styles.buttons__extra}>
              <button onClick={() => addItem(item, 10, 'changeRepair')}>+10</button>
              <button onClick={() => addItem(item, 50, 'changeRepair')}>+50</button>
              <button onClick={() => addItem(item, 100, 'changeRepair')}>+100</button>
              <button onClick={() => addItem(item, 200, 'changeRepair')}>+200</button>
              <button onClick={() => addItem(item, 300, 'changeRepair')}>+300</button>
              <button onClick={() => addItem(item, 500, 'changeRepair')}>+500</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
};

export default Custom;