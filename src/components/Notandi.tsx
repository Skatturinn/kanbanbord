'use client'
import { notandi } from "@/types/types";
import { useState, useEffect } from "react";
import useFetch from "react-fetch-hook";
import styles from '@/app/page.module.css';

export function Notandi({ id, token }: { id: string, token: string }) {
	const { isLoading, error, data } = useFetch<notandi>(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
	const [group, setGroup] = useState('')
	const [avatarUrl, setAvatarUrl] = useState('');

	useEffect(() => {
		if (data?.avatar) {
			fetch(`/api/avatar?avatar=${data.avatar}`)
				.then(response => response.json())
				.then(data => setAvatarUrl(data.avatarUrl))
				.catch(err => console.error(err));
		}
	}, [data?.avatar]);

	if (isLoading) return <p className="loading">Sæki gögn</p>
	if (error) return <p>Villa við að sækja gögn, vinsamlegast reynið aftur</p>
	if (data) {
		Number(data.group_id) && fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${data.group_id}`,
			{
				method: 'GET'
			}
		).then(
			response =>
				response.json().then(group => setGroup(group?.name)
				))
		return (
			<div className={styles.profile}>
				<div className={styles.avatarContainer}>
					<img className={styles.avatar} src={avatarUrl} alt="Avatar" />
				</div>
				<div className={styles.info}>
					<h1 className={styles.username}>{data.username}</h1>
					<p className={styles.group}>{'Hópur: ' + group}</p>
					<p className={styles.admin}>{'admin: ' + data.isadmin}</p>
				</div>
			</div>
		);
	}
}