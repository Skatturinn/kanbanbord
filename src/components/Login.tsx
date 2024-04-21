'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

export type FormData = {
	username: string;
	password: string;
};
function Login() {
	const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>();
	const router = useRouter();
	const [error, setError] = useState('')
	const [wait, setWait] = useState(false)
	const onSubmit = async ({ username, password }: FormData) => {
		try {
			setWait(true)
			const response = await fetch('/api/login',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password })
				}
			)
			const data = await response.json()
			setWait(false)
			if (data.login) {
				if (data.isAdmin) {
					router.push('/Notandi/Admin');
				} else {
					router.push('/Notandi/User');
				}
			} else {
				setError(`${response.status >= 300}: ${response.statusText} ${data && (data?.error || JSON.stringify(data))}`)
			}
		} catch (err) {
			err && setError(JSON.stringify(err));
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label
				htmlFor='username' >Notendanafn:</label>
			<input
				type="text"
				placeholder=""
				{...register('username', { required: true })}
			/>
			<label
				htmlFor='password' >Lykilorð:</label>
			<input
				type="text"
				placeholder=""
				{...register('password', { required: true })}
			/>
			<button type="submit">Login</button>
			{
				wait ? <p>Reyni að skrá þig inn</p> : ''
			}
			{
				error !== '' && error !== '{}' ?
					<p>{error}</p>
					: ''
			}
			{
				Object.keys(errors).length > 0 ?
					<p>{JSON.stringify(Object.keys(errors))}</p>
					: ''
			}
		</form>
	);
}

export default Login;