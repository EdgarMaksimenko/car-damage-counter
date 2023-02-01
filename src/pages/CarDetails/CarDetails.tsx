import React, { FC } from 'react';
import styles from './CarDetails.module.css';
import { useParams } from 'react-router';
import { carData } from '../../data';
import ButtonRepair from '../../components/ButtonRepair/ButtonRepair';
import RepairInfo from '../../components/RepairInfo/RepairInfo';
import Search from '../../components/Search/Search';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addPart, addSamePart, addWork, clearTotal } from '../../store/slices/totalSlice';

const CarDetails: FC = () => {
  const { brand } = useParams();
  const { model } = useParams();
  const dispatch = useAppDispatch();
  const allItems = useAppSelector(state => state.totalList.carParts);
  const car = carData.find(item => item.brand === brand && item.model === model);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    dispatch(clearTotal());
  }, [dispatch]);

  const addItem = (name: string, quality: string, partPrice: number) => {
    if (!allItems.find(item => item.name === name)) {
      const newItem = {
        name,
        quality,
        count: 1,
        partPrice,
        workPrice: 0,
        totalPrice: partPrice,
      };
      dispatch(addPart(newItem));
    } else if (allItems.find(item => item.name === name && item.quality === quality)) {
      dispatch(addSamePart(name));
    }
  };

  return (
    <>
      <Search setSearchValue={setSearchValue} />
      {car &&
        <>
          <ButtonRepair buttonType={'normal'} />
          <RepairInfo brand={brand} model={model} />
          <div className={styles.parts}>
            {car.parts
              .filter(item => item.name.toUpperCase().includes(searchValue.toUpperCase()))
              .map((item, index) =>
                <div className={styles.parts__item} key={index}>
                  <p>{item.name}</p>
                  <div className={styles.button__block}>
                    <button onClick={() => addItem(item.name, 'Нов', item.priceUsed)}>Новое</button>
                    <button onClick={() => addItem(item.name, 'БУ', item.priceUsed)}>БУ</button>
                    <button onClick={() => addItem(item.name, 'Альт', item.priceUsed)}>Альтернатива</button>
                  </div>
                  <div className={styles.button__more}>
                    <button onClick={() => dispatch(addWork({ name: item.name, price: 10 }))}>+10</button>
                    <button onClick={() => dispatch(addWork({ name: item.name, price: 50 }))}>+50</button>
                    <button onClick={() => dispatch(addWork({ name: item.name, price: 100 }))}>+100</button>
                    <button onClick={() => dispatch(addWork({ name: item.name, price: 500 }))}>+500</button>
                  </div>
                </div>
              )
            }
          </div>
        </>
      }
    </>
  )
};

export default CarDetails;