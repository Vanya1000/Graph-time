import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/auth-reducer';
import { SignInFormType } from '../types';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Link, Stack } from '@mui/material'
import { AppStateType } from '../redux/redux-store';




const SignIn = React.memo(() => {
	const dispatch = useDispatch()
	const loginErrorMessage = useSelector((state: AppStateType) => state.auth.loginErrorMessage)

	const { register, handleSubmit, formState: { errors } } = useForm<SignInFormType>();

	const onSubmit: SubmitHandler<SignInFormType> = data => {
		dispatch(login(data))
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
				{loginErrorMessage &&
					<Stack sx={{ width: '100%' }} spacing={2}>
						<Alert severity="error">{loginErrorMessage}</Alert>
					</Stack>}
				
				
				<Box >
					<form onSubmit={handleSubmit(onSubmit)}>
						{errors?.username && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">{errors?.username?.message || "Error"}</Alert></Stack>}
						<TextField
							error={errors.username && true}
							margin="normal"
							fullWidth
							label="Login"
							autoComplete="email"
							autoFocus
							{...register("username", {
								required: 'Field login is required', pattern: {
									value: /^[^А-Яа-я]+$/i,
									message: 'Use only English characters'
								}
							})}
						/>
						{errors?.password && <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="error">{errors?.password?.message || "Error"}</Alert></Stack>}
						<TextField
							error={errors.password && true}
							margin="normal"
							fullWidth
							label="Password"
							type="password"
							autoComplete="current-password"
							{...register("password", {
								required: 'Field password is required', pattern: {
									value: /^[^А-Яа-я]+$/i,
									message: 'Use only English characters'
								}
							})}
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
							<Link component={RouterLink} to="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
})
export default SignIn;