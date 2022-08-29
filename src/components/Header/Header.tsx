import style from './Header.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {FC, useState} from 'react'
import { NavLink } from "react-router-dom";

interface IHeader {
  login: string | null,
  isAuth: boolean | null,
  photo: string | null,
  onClickLogOut(): void
}

const Header: FC<IHeader> = ({isAuth, login, photo, onClickLogOut}) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className={style.header}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: {md: 'flex' }, justifyContent: 'space-between'}}>
          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img className={style.logo} src="https://via.placeholder.com/50" alt=''/>
          </Typography>
          <Box sx={{ flexGrow: 0}}>
            {
              isAuth ? <>
                <Tooltip title={login??''} >
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                    <Avatar alt="" src={photo??''} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={onClickLogOut}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
              : (<MenuItem onClick={handleCloseUserMenu}>
                <NavLink to="/login">Login</NavLink>
              </MenuItem>)
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

