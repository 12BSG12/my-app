import style from './Users.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setIsFriends, setSearch } from '../../redux/reducers/users';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const SearchForm = () => {  
  const isFriends = useAppSelector(state => state.usersPage.isFriends)
  const search = useAppSelector(state => state.usersPage.search)
  const[checked, setChecked] = useState(isFriends);
  const[searchText, setSearchText] = useState<string>(search)
  const dispatch = useAppDispatch()
  dispatch(setIsFriends(checked))
  dispatch(setSearch(searchText))
  return(
    <div className={style.formSearch}>
      <input className={style.search} type="text" placeholder="search" value={search} onChange={(e) => setSearchText(e.target.value)}/>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => setChecked(null)}>All</Button>
        <Button onClick={() => setChecked(true)}>Friends</Button>
        <Button onClick={() => setChecked(false)}>Not friends</Button>
      </ButtonGroup>
    </div>
  );
}

export default SearchForm;
