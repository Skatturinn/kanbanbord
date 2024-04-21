'use client'
import { project } from "@/types/types";
import useFetch from "react-fetch-hook";

export function Verkefni({ id, token }: { id: string, token: string }) {
	const { isLoading, error, data } = useFetch<project>(`${process.env.NEXT_PUBLIC_API_URL}/groups/${id}`);

	if (isLoading) return <p className="loading">Sæki gögn</p>
	if (error) return <div>
		<p>{error.message}</p>
		<p>Villa við að sækja gögn, vinsamlegast reynið aftur</p>
	</div>
	return <>
		<div >
			<h3>{data?.title}</h3>
			<p>Status: {data?.status}</p>
			<p>Description: {data?.description}</p>
		</div>
	</>
}
