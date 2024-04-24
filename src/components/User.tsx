'use client'
import React, { useCallback, useEffect, useState } from 'react';
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
	title: string;
};

export default function User({ id, token }: UserType) {
	const [group, setGroup] = useState<Group | null>(null);
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchProjects = useCallback(async (group: string) => {
		try {
			setLoading(true);
			const authToken = token;
			let allProjects: Project[] = [];
			let next = true;
			let page = 1
			while (next) {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?group_id=${group}&page=${page}`, {
					headers: {
						'Authorization': `Bearer ${authToken}`
					},
				});
				const data = await response.json();
				if (Array.isArray(data)) {
					allProjects = [...allProjects, ...data];
				} else {
					next = false
				}
				page++
			}

			allProjects.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
			setProjects(allProjects);
		} catch (error) {
			console.error('Error fetching projects:', error);
		} finally {
			setLoading(false);
		}
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

	const handleUpdateProjectStatus = (projectId: string, newStatus: string) => {
		const projectData = { status: newStatus };
		const element = document.getElementById(projectId)
		if (element) {
			element.innerHTML = `<p>Breyti status</p>`
		}


		fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(projectData),
		})
			.then(response => response.json())
			.then((updatedProject: Project) => {
				setProjects(currentProjects => {
					return currentProjects.map(project => {
						if (project.id === projectId) {
							return { ...project, status: newStatus };
						}
						return project;
					});
				});
			})
			.catch(e => element?.innerHTML.replace(`Breyti status`, String(e)))
			.finally(() => {
				setLoading(false);
			});
	}

	const statuses = ['0', '1', '2', '3', '4', '5'];

	return (
		<div className={styles.projectContainer}>
			{statuses.map((status) => (
				<div key={status} className={styles.projectColumn}>
					<h2>Status {status}</h2>
					{loading ? (
						<div>Sæki verkefni...</div>
					) : (
						projects
							.filter((project) => Number(project.status) === Number(status))
							.map((project: Project) => (
								<div key={project.id} className={styles.projectCard}>
									<div>
										<h3>{project.title}</h3>
										<p>Status: {project.status}</p>
									</div>
									<div id={project.id}>
										<select value={project.status} onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}>
											{statuses.map((statusOption) => (
												<option key={statusOption} value={statusOption}>{statusOption}</option>
											))}
										</select>
									</div>
								</div>
							))
					)}
				</div>
			))}
		</div>
	);
}
