'use client'
import { project } from "@/types/types";
import useFetch from "react-fetch-hook";

export function Verkefni({ id, token }: { id: string, token: string }) {
	const { isLoading, error, data } = useFetch<project>(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`);

	if (isLoading) return <p className="loading">Sæki gögn</p>
	if (error) return <div>
		<p>{(error.status)}</p>
		<p>Villa við að sækja gögn, verkefni fannst ekki á skrá með id={id}, id þarf að vera heiltala stærri en 0</p>
	</div>
	return <>
		<div >
			<h3>{data?.title}</h3>
			<p>Status: {data?.status}</p>
			<p>Description: {data?.description}</p>
		</div>
	</>
}
