'use client'
import { group } from "@/types/types";
import useFetch from "react-fetch-hook";

export function Hopur({ id, token }: { id: string, token: string }) {
	const { isLoading, error, data } = useFetch<group>(`${process.env.NEXT_PUBLIC_API_URL}groups/${id}`);

	if (isLoading) return <p className="loading">Sæki gögn</p>
	if (error) return <div>
		<p>{error.message}</p>
		<p>Villa við að sækja gögn, vinsamlegast reynið aftur</p>
	</div>
	return <>
		<div >
			<h3>{data?.name}</h3>
			<p>Admin ID: {data?.admin_id}</p>
		</div>
	</>
}
