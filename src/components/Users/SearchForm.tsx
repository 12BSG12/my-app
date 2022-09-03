import style from './Users.module.css'
import { FC, useState } from 'react';
import { ISearchForm } from '../../models/usersType';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const SearchForm: FC<ISearchForm> = ({usersSearchQuery, setSearchParams, usersIsFriendQuery}) => { 
  const[checked, setChecked] = useState(usersIsFriendQuery);
  const[searchText, setSearchText] = useState<string>(usersSearchQuery)
    
  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setSearchParams({term: e.target.value})
  }

  const handleOnClick = (e: SelectChangeEvent) => {
    setChecked(e.target.value)
    setSearchParams({friend: e.target.value})
  }

  return(
    <div className={style.formSearch}>
      <input className={style.search} type="text" placeholder="search" value={searchText} onChange={handleOnChangeInput}/>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={checked}
          onChange={handleOnClick}
          autoWidth
          label="Select"
        >
          <MenuItem value="null">All</MenuItem>
          <MenuItem value="true">Friends</MenuItem>
          <MenuItem value="false">Not Friends</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchForm;
