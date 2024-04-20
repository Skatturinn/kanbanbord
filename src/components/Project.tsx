'use client'
import React, { useEffect, useState } from 'react';

export interface Project {
	title: string;
	status: string;
}

export function Project({ id }: { id: string }) {
	const [project, setProject] = useState<Project | null>(null);

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`)
			.then((response) => response.json())
			.then((data) => setProject(data));
	}, [id]);

	if (!project) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h3>{project.title}</h3>
			<p>Status: {project.status}</p>
		</div>
	);
}