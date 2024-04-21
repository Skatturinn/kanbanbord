'use client'
import React, { useState, useEffect } from 'react';
import { group, notandi, project } from "@/types/types";
import styles from './Admin.module.scss';

export function UsersComponent({ token }: { token: string }) {

	const [usersPage, setUsersPage] = useState(1);
	const [users, setUsers] = useState<notandi[] | undefined>();
	const [totalUsers, setTotalUsers] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);

	const fetchData = async () => {
		if (token !== undefined) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?page=${usersPage}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				}
			)
			const info = await response.json();
			setTotalUsers(info.total);
			setUsers(info);
		}
	}

	useEffect(() => {
		fetchData();
	});

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<section className={styles.container}>
			<h2><a href="/Notandi/Admin/users">Users</a> page: {usersPage}</h2>
			{isHydrated && token?.valueOf() ?
				<ul>
					{users?.map(user => (
						<li key={user.id} className={styles.user}>
							<a href={`/Notandi/Admin/users/${user.id}`}>
								<h3>{user.username}</h3>
								<p>Admin: {user.isadmin ? 'Yes' : 'No'}</p>
								<p>Group ID: {user.group_id}</p>
							</a>
						</li>
					))}
				</ul>
				:
				<p>Loading...</p>
			}
			<button onClick={() => setUsersPage(usersPage - 1)}>Previous</button>
			<button onClick={() => setUsersPage(usersPage + 1)}>Next</button>
		</section>
	)
}

export function GroupsComponent({ token }: { token: string }) {

	const [groupsPage, setGroupsPage] = useState(1);
	const [groups, setGroups] = useState<group[] | undefined>();
	const [totalGroups, setTotalGroups] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);

	const fetchData = async () => {
		if (token !== undefined) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups?page=${groupsPage}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				}
			)
			const info = await response.json();
			setTotalGroups(info.total);
			setGroups(info);
		}
	}

	useEffect(() => {
		fetchData();
	});

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<section className={styles.container}>
			<h2><a href="/Notandi/Admin/groups">Groups</a> page: {groupsPage}</h2>
			{isHydrated && token?.valueOf() ?
				<ul>
					{groups?.map(group => (
						<li key={group.id} className={styles.user}>
							<a href={`/Notandi/Admin/groups/${group.id}`}>
								<h3>{group.name}</h3>
								<p>Admin ID: {group.admin_id}</p>
							</a>
						</li>
					))}
				</ul>
				:
				<p>Loading...</p>
			}
			<button onClick={() => setGroupsPage(groupsPage - 1)}>Previous</button>
			<button onClick={() => setGroupsPage(groupsPage + 1)}>Next</button>
		</section>
	)
}

export default function ProjectsComponent({ token }: { token: string }) {

	const [projectsPage, setProjectsPage] = useState(1);
	const [projects, setProjects] = useState<project[] | undefined>();
	const [totalProjects, setTotalProjects] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);

	const fetchData = async () => {
		if (token !== undefined) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?page=${projectsPage}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				}
			)
			const info = await response.json();
			setTotalProjects(info.total);
			setProjects(info);
		}
	}

	useEffect(() => {
		fetchData();
	});

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<section className={styles.container}>
			<h2><a href="/Notandi/Admin/projects">Projects</a> page: {projectsPage}</h2>
			{isHydrated && token?.valueOf() ?
				<ul>
					{projects?.map(project => (
						<li key={project?.id} className={styles.user}>
							<a href={`/Notandi/Admin/users/${project?.id}`}>
								<h3>{project.title}</h3>
								<p>Status: {project.status}</p>
								<p>Description: {project.description}</p>
							</a>
						</li>
					))}
				</ul>
				:
				<p>Loading...</p>
			}
			<button onClick={() => setProjectsPage(projectsPage - 1)}>Previous</button>
			<button onClick={() => setProjectsPage(projectsPage + 1)}>Next</button>
		</section>
	)
}