'use client'
import { useRouter } from 'next/navigation';

export function Logout() {
	const router = useRouter();
	return <button onClick={
		() => fetch('/api/login',
			{ method: 'DELETE' }
		).finally(() => router.refresh())
	}>Logout</button> || ''
}