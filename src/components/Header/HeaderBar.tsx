import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SwitchTheme from '../common/SwitchTheme';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { logout } from '../../redux/auth-reducer';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';



const HeaderBar = React.memo(() => {
	const dispatch = useDispatch()
	let redirect = useNavigate();

	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
	const userName = useSelector((state: AppStateType) => state.auth.user)

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		console.log(anchorEl);
		setAnchorEl(null);
		
	};

	const handleLogout = () => {
		setAnchorEl(null);
		redirect(`/signin`)
		dispatch(logout())
	};

	return (
		<AppBar position="static" sx={{ mb: 4 }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						Learning time App
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						Learning time App
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<SwitchTheme />
					</Box>
					{isAuth && (
						<Box sx={{ display: {  xs: 'flex', alignItems: 'center' } }}>
							<Typography
								variant="h6"
								sx={{ m: '0px 10px' }}>
								{userName}
							</Typography>
							<Box >
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
								>
								<ManageAccountsIcon fontSize='large' />
								</IconButton >
								<Menu
									keepMounted={false}
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleLogout}><LogoutIcon />Logout</MenuItem>
								</Menu>
							</Box>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
});
export default HeaderBar;
