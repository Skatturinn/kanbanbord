'use client'

export function Logout({ className }: { className?: string }) {
	const logout = () => {
		fetch('/api/login', { method: 'DELETE' })
			.finally(() => {
				if (typeof window !== 'undefined') {
					window.location.href = '/';
				}
			});
	};

	return <button className={className} onClick={logout}>Logout</button> || '';
}