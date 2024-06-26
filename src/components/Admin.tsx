'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { group, notandi, project } from "@/types/types";
import styles from './Admin.module.scss';

export function UsersComponent({ token }: { token: string }) {

	const [usersPage, setUsersPage] = useState(1);
	const [users, setUsers] = useState<notandi[] | undefined>();
	const [totalUsers, setTotalUsers] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadPrevious = () => {
		setUsersPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
	}

	const handleLoadMore = () => {
		setUsersPage(prevPage => prevPage + 1);
	}

	const fetchData = useCallback(async () => {
		if (token !== undefined) {
			try {
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
				setUsers(info);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setIsLoading(false);
			}
		}
	}, [token, usersPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<section className={styles.container}>
			<h2><a href="/Notandi/Admin/users">Users</a> page: {usersPage}</h2>
			{(
				<>
					{(
						<ul>
							{users && users.length ? (
								users.map(user => (
									<li key={user.id} className={styles.user}>
										<a href={`/Notandi/Admin/users/${user.id}`}>
											<h3>{user.username}</h3>
											<p>Admin: {user.isadmin ? 'Yes' : 'No'}</p>
											<p>Group ID: {user.group_id}</p>
										</a>
									</li>
								))
							) : (
								isLoading ? <p>Engir fleiri notendur farðu til baka.</p> : <p>Sæki gögn...</p>
							)}
						</ul>
					)}
				</>
			)}
			<div className={styles.takkar}>
				<button onClick={handleLoadPrevious}>Previous</button>
				<button onClick={handleLoadMore}>Next</button>
			</div>
		</section>
	)
}


export function GroupsComponent({ token }: { token: string }) {

	const [groupsPage, setGroupsPage] = useState(1);
	const [groups, setGroups] = useState<group[] | undefined>();
	const [totalGroups, setTotalGroups] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadPrevious = () => {
		setGroupsPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
	}

	const handleLoadMore = () => {
		setGroupsPage(prevPage => prevPage + 1);
	}

	const fetchData = useCallback(async () => {
		if (token !== undefined) {
			setIsLoading(true);

			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups?page=${groupsPage}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					}
				);
				const info = await response.json();
				setGroups(info);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setIsLoading(false);
			}
		}
	}, [token, groupsPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<section className={styles.container}>
			<h2><a href="/Notandi/Admin/groups">Groups</a> page: {groupsPage}</h2>
			{(
				<>
					{isLoading ? (
						<p>Sæki gögn..</p>
					) : (
						<ul>
							{groups && groups.length ? (
								groups.map(group => (
									<li key={group.id} className={styles.user}>
										<a href={`/Notandi/Admin/groups/${group.id}`}>
											<h3>{group.name}</h3>
											<p>Admin ID: {group.admin_id}</p>
										</a>
									</li>
								))
							) : (
								<p>Engir fleiri hópar farðu til baka</p>
							)}
						</ul>
					)}
				</>
			)}
			<div className={styles.takkar}>
				<button onClick={handleLoadPrevious}>Previous</button>
				<button onClick={handleLoadMore}>Next</button>
			</div>
		</section>
	)
}

export function ProjectsComponent({ token }: { token: string }) {

	const [projectsPage, setProjectsPage] = useState(1);
	const [projects, setProjects] = useState<project[] | undefined>();
	const [totalProjects, setTotalProjects] = useState(0);
	const [isHydrated, setIsHydrated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = useCallback(async () => {
		if (token !== undefined) {
			setIsLoading(true);

			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?page=${projectsPage}`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					}
				);
				const info = await response.json();
				setProjects(info);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setIsLoading(false);
			}
		}
	}, [token, projectsPage]);

	const handleLoadPrevious = () => {
		setProjectsPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
	}

	const handleLoadMore = () => {
		setProjectsPage(prevPage => prevPage + 1);
	}

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<section className={styles.container}>
			<h2><a href="/Notandi/Admin/projects">Projects</a> page: {projectsPage}</h2>
			{(
				<>
					{isLoading ? (
						<p>Sæki gögn..</p>
					) : (
						<ul>
							{projects && projects.length ? (
								projects.map(project => (
									<li key={project?.id} className={styles.user}>
										<a href={`/Notandi/Admin/projects/${project?.id}`}>
											<h3>{project.title}</h3>
											<p>Status: {project.status}</p>
											<p>Description: {project.description}</p>
										</a>
									</li>
								))
							) : (
								<p>Enginn fleiri verkefni farðu til baka</p>
							)}
						</ul>
					)}
				</>
			)}
			<div className={styles.takkar}>
				<button onClick={handleLoadPrevious}>Previous</button>
				<button onClick={handleLoadMore}>Next</button>
			</div>
		</section>
	)
}
