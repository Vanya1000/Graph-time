import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth-reducer';
import { SignInFormType } from '../types';

//! Обязательно обработку ошибок!!!


const SignIn = () => {

	const dispatch = useDispatch()

	const { register, handleSubmit, reset, formState: { errors } } = useForm<SignInFormType>();
	
	const onSubmit: SubmitHandler<SignInFormType> = data => {
		dispatch(login(data))		
		reset();
		}


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1 }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box >
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="Login"
							label="Login"
							autoComplete="email"
							autoFocus
						{...register("username", { required: true })}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						{...register("password", { required: true })}
						/>
						<FormControlLabel
							control={<Checkbox checked color="primary" {...register("rememberMe")} />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
					</form>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
export default SignIn;