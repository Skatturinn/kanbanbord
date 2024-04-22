import useFetch from "react-fetch-hook";
import { group, notandi, project } from "@/types/types";



export function FetchList(
	{ type, token, id }:
		{ type: 'users' | 'groups' | 'projects', token: string, id?: string }) {
	const { isLoading, error, data } = useFetch<notandi | group | project>(`${process.env.NEXT_PUBLIC_API_URL}users/${id}`);

}	