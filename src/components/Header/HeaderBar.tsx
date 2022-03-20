import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SwitchTheme from '../common/SwitchTheme';



const HeaderBar = () => {

	return (
		<AppBar position="static" sx={{mb: 4}}>
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
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default HeaderBar;
