'use client'
import { notandi } from "@/types/types";
import { useState, useEffect } from "react";
import { PatchUser } from "./PatchUser";
import useFetch from "react-fetch-hook";
import Image from "next/image";
import styles from "./Notandi.module.scss"

export function Notandi({ id, token }: { id: string, token: string }) {
	const [refresh, setRefresh] = useState(0);
	const { isLoading, error, data } = useFetch<notandi>(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}?refresh=${refresh}`);
	const [group, setGroup] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState(200)

	const [avatarUrl, setAvatarUrl] = useState('');

	const updateUserProfile = () => {
		// Increment the refresh state to trigger a re-fetch of the user data
		setRefresh(refresh + 1);
	};

	if (isLoading) return <p className="loading">Sæki gögn</p>
	if (error) {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
			.then(test => {
				setStatus(test.status)
				return test.json()
			}
			).then(result => setMessage(JSON.stringify(result)))
		console.log(message)
		// const result = await test.json();
		return message ? <div>
			<p>{status}</p>
			<p>{message}</p>
		</div> : <div>
			<p>error</p>
		</div>
	}
	if (data) {
		Number(data.group_id) && fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${data.group_id}`,
			{
				method: 'GET'
			}
		).then(
			response =>
				response.json().then(group => setGroup(group?.name)
				))
		return <>
			<div className={styles.notandi}>
				<div className={styles.mynd}>
					{data?.avatar ? <Image src={data?.avatar} alt="Avatar" width={75} height={75} /> :
						<p>Til að bæta við mynd vinsamlegast settu hana inn í formið.</p>}
				</div>
				<div className="styles.uppl">
					<h1>{data.username}</h1>
					<p>{`Hópur ${data.group_id}: ${group}`}</p>
					<p>{'admin: ' + data.isadmin}</p>
				</div>
			</div>
			<h1>Breyta Aðgangi</h1>
			<PatchUser type='users' token={token} id={id} onSuccess={updateUserProfile} />
		</>
	}
}