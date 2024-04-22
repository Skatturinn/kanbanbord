'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { Project as ProjectComponent } from '@/components/Project';
import styles from "./User.module.scss";

type UserType = {
	id: string;
	token?: string;
	group_id?: string;
};

type Group = {
	id?: string;
};

type Project = {
	id: string;
	group_id: string;
	status: string;
};

export default function User({ id, token }: UserType) {
	const [group, setGroup] = useState<Group | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [refreshProjects, setRefreshProjects] = useState(false);
	const fetchProjects = useCallback(async (group: string) => {
		const authToken = token;
		let allProjects: Project[] = [];

		for (let page = 1; page <= 2; page++) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?group_id=${group}&page=${page}`, {
				headers: {
					'Authorization': `Bearer ${authToken}`
				},
			});
			const data = await response.json();
			if (Array.isArray(data)) {
				allProjects = [...allProjects, ...data];
			}
		}

		allProjects.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

		setProjects(allProjects);
	}, [token]);

	useEffect(() => {
		const fetchUser = async () => {
			if (id) {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
				const data: UserType = await response.json();
				setGroup({ id: data.group_id });
			}
		};

		fetchUser();
	}, [id]);

	useEffect(() => {
		if (group && group.id) {
			fetchProjects(group.id);
		}
	}, [fetchProjects, group]);

	const handleUpdateProjectStatus = (projectId: string, status: string) => {
		const projectData = { status };

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(projectData),
		})
			.then(response => response.json())
			.then((data: Project) => {
				setRefreshProjects(prev => !prev);
			});
	}

	const statuses = ['0', '1', '2', '3', '4', '5'];

	return (
		<div className={styles.projectContainer}>
			{statuses.map((status) => (
				<div key={status} className={styles.projectColumn}>
					<h2>Status {status}</h2>
					{projects.filter((project) => Number(project.status) === Number(status)).map((project: Project) => (
						<div key={project.id} className={styles.projectCard}>
							<ProjectComponent id={project.id} />
							<select value={project.status} onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}>
								{statuses.map((statusOption) => (
									<option key={statusOption} value={statusOption}>{statusOption}</option>
								))}
							</select>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
