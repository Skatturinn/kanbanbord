'use client'
import { Form, useForm } from "react-hook-form";
import useFetch from 'react-fetch-hook';
import { group, notandi, project } from "@/types/types";
import { useState } from "react";
import styles from "./Post.module.scss";
import { Placeholder } from "react-select/animated";
import { b64hex } from "@/util/breytamynd";
import { filterEmptyStrings } from "@/util/filterempty";


export function Post({ type, token, id }: { type: 'users' | 'groups' | 'projects', token: string, id?: string }) {
	const { register, handleSubmit, control, formState: { errors } } = useForm<FormData | notandi | group | project>();
	const [error, setError] = useState('')
	function Input({ label, type, field, required = false }: { label: string, type: string, field: keyof notandi | keyof group | keyof project, required?: boolean }) {
		return <label>
			{label}
			<input type={type}
				{...register(field, { required })}
			/>
		</label>
	}
	const FormPost = async (data: FormData | notandi | group | project) => {
		if (type === 'users') {
			data = b64hex(data as notandi)
		}
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(filterEmptyStrings(data))
				}
			)
			const message = await response.json()
			if (response.status >= 200 && response.status < 300) {
				setError(`Tókst að búa til ${message && message?.id || 'lið'} í ${type}`)
			} else {
				setError(`${response.status}: ${response.statusText} ${message && (message?.error || JSON.stringify(message))}`)
			}
		} catch (err) {
			err && setError(JSON.stringify(err));
		}
	}
	return <>
		<form
			onSubmit={handleSubmit(FormPost)}
			className={styles.post}
		>
			{
				type === 'users' &&
				<>
					<Input label="Notendanafn" type="text" field="username" required={true} />
					<Input label="Lykilorð" type="text" field="password" required={true} />
					<Input label="Admin" type="checkbox" field="isadmin" />
					<Input label="Group" type="number" field="group_id" />
					<label>
						Mynd:
						<input type="file"
							accept=".png,.jpg,.jpeg"
							id="imageInput"
						/>
						<input type="text"
							{...register('avatar', { required: false })
							}
						/>
					</label>
				</>
			}
			{
				type === 'groups' &&
				<>
					<Input label="admin id" type="number" field="admin_id" />
					<Input label="Nafn" type="text" field="name" />
				</>

			}
			{
				type === 'projects' &&
				<>
					<Input label="Heiti" type="text" field="title" required={true} />
					<Input label="Hópur" type="number" field="group_id" required={true} />
					<label>
						Sköpuður
						<input type="number"
							placeholder={id}
							{...register('creator_id')} />
					</label>
					<Input label="Staða" type="number" field="status" required={true} />
					<Input label="Ábyrgðaraðili" type="number" field="assigned_id" required={false} />
					<Input label="Lýsing" type="text" field="description" required={false} />
				</>

			}
			{
				error ?
					<p>{error}</p>
					: ''
			}
			{
				Object.keys(errors).length ?
					<p>{JSON.stringify(errors.root?.message)}</p>

					: ''
			}
			<button>Submit</button>
		</form>
	</>
}