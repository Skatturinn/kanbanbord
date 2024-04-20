'use client'
import { notandi } from "@/types/types";
import { useState } from "react";
import useFetch from "react-fetch-hook";

export function Notandi({ id, token }: { id: string, token: string }) {
	const { isLoading, error, data } = useFetch<notandi>(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
	const [group, setGroup] = useState('')
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
		return <div>
			<p>{`Notendanafn: ${data.username}`}</p>
			<p>{`Avatar: ${data.avatar}`}</p>
			{<p>{'Hópur: ' + group}</p>}
			<p>{'admin: ' + data.isadmin}</p>
		</div>
	}
}