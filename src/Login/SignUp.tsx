import React, { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../redux/auth-reducer';
import { SignUpFormType } from '../types';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Link, Stack } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { AppStateType } from '../redux/redux-store';


const SignUp = React.memo(() => {
	const dispatch = useDispatch()
	const isSuccessRegistration = useSelector((state: AppStateType) => state.auth.isSuccessRegistration)
	const regErrorMessage = useSelector((state: AppStateType) => state.auth.regErrorMessage)

	const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<SignUpFormType>({ mode: "onBlur" });

	const password = useRef({});
	password.current = watch("password", "");

	const onSubmit: SubmitHandler<SignUpFormType> = data => {
		dispatch(registration(data));
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
					<AppRegistrationIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{regErrorMessage && !isSuccessRegistration &&
					<Stack sx={{ width: '100%' }} spacing={2}>
						<Alert severity="error">{regErrorMessage}</Alert>
					</Stack>}
				{isSuccessRegistration &&
					<>
						<Stack sx={{ width: '100%' }} spacing={2}>
							<Alert severity="success">User has been successfully registered! Please Sign in to continue</Alert>
							<Button component={RouterLink} to="/signin" variant="contained" color="success">Sigh in</Button>
						</Stack>
					</>}
				{!isSuccessRegistration &&
					<Box >
						<form onSubmit={handleSubmit(onSubmit)}>
							<TextField
								margin="normal"
								fullWidth
								id="Login"
								label="Login"
								autoFocus
								error={errors.username && true}
								{...register("username", {
									required: 'Field login is required', pattern: {
										value: /^[^А-Яа-я]+$/i,
										message: 'Use only English characters'
									}
								})}
							/>
							{errors?.username &&
								<Stack sx={{ width: '100%' }} spacing={2}>
									<Alert severity="error">{errors?.username?.message || "Error"}</Alert>
								</Stack>}
							<TextField
								margin="normal"
								fullWidth
								label="Password"
								type="password"
								id="password"
								error={errors.password && true}
								{...register("password", {
									required: 'Field password is required', pattern: {
										value: /^[^А-Яа-я]+$/i,
										message: 'Use only English characters'
									},
									minLength: {
										value: 4,
										message: 'Minimum length password: 4'
									}
								})}
							/>
							{errors?.password &&
								<Stack sx={{ width: '100%' }} spacing={2}>
									<Alert severity="error">{errors?.password?.message || "Error"}</Alert>
								</Stack>}
							<TextField
								margin="normal"
								fullWidth
								label="Confirm password"
								type="password"
								id="confirmPassword"
								error={errors.password && true}
								//@ts-ignore
								{...register("confirmPassword", { validate: value => value === password.current || "The passwords do not match" })}
							/>
							{errors?.confirmPassword &&
								<Stack sx={{ width: '100%' }} spacing={2}>
									<Alert severity="error">{errors?.confirmPassword?.message || "Error"}</Alert>
								</Stack>}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign Up
							</Button>
						</form>
						<Grid container>
							<Grid item xs>
								<Link component={RouterLink} to="/signin" variant="body2">
									"Already have an account? Sign in"
								</Link>
							</Grid>
						</Grid>
					</Box>
				}
			</Box>
		</Container>
	);
})
export default SignUp;