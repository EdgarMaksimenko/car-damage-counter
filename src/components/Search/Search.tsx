import React, {FC} from 'react';
import styles from './Search.module.css';

interface ISearchProps {
  setSearchValue: Function;
}

const Search: FC<ISearchProps> = (props) => {
  return (
    <input
        type="text"
        onChange={e => props.setSearchValue(e.target.value)}
        className={styles.search}
        placeholder='Поиск ...'
      />
  )
};

export default Search;