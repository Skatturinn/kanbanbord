'use client'
import { Post } from '@/components/Post';
import React, { useState, useEffect } from 'react';
import { group, notandi, project } from "@/types/types";
import Cookies from 'js-cookie';

export default function Admin() {
	const token = Cookies.get('token');
	const id = Cookies.get('id');

	const [usersPage, setUsersPage] = useState(1);
	const [groupsPage, setGroupsPage] = useState(1);
	const [projectsPage, setProjectsPage] = useState(1);

	const [users, setUsers] = useState<notandi[] | undefined>();
	const [groups, setGroups] = useState<group[] | undefined>();
	const [projects, setProjects] = useState<project[] | undefined>();

	const [totalUsers, setTotalUsers] = useState(0);
	const [totalGroups, setTotalGroups] = useState(0);
	const [totalProjects, setTotalProjects] = useState(0);

	const [isHydrated, setIsHydrated] = useState(false);

	const fetchData = async (type: 'users' | 'groups' | 'projects', page: number) => {
		if (token !== undefined && id !== undefined) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}?page=${page}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				}
			)
			const info = await response.json();
			if (type === 'users') setTotalUsers(info.total);
			if (type === 'groups') setTotalGroups(info.total);
			if (type === 'projects') setTotalProjects(info.total);
			return info;
		}
	}

	useEffect(() => {
		fetchData('users', usersPage).then(data => setUsers(data));
		fetchData('groups', groupsPage).then(data => setGroups(data));
		fetchData('projects', projectsPage).then(data => setProjects(data));
	}, [usersPage, groupsPage, projectsPage]);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<div>
			<section>
				<h2>Users (Total: {totalUsers})</h2>
				{isHydrated && token?.valueOf() ? (
					users?.map(user => (
						<div key={user.id}>
							<h3>{user.username}</h3>
							<p>Admin: {user.isadmin ? 'Yes' : 'No'}</p>
							<p>Group ID: {user.group_id}</p>
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
				<button onClick={() => setUsersPage(usersPage - 1)}>Previous</button>
				<button onClick={() => setUsersPage(usersPage + 1)}>Next</button>
			</section>
			<section>
				<h2>Groups (Total: {totalGroups})</h2>
				{isHydrated && token?.valueOf() ? (
					groups?.map(group => (
						<div key={group.id}>
							<h3>{group.name}</h3>
							<p>Admin ID: {group.admin_id}</p>
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
				<button onClick={() => setGroupsPage(groupsPage - 1)}>Previous</button>
				<button onClick={() => setGroupsPage(groupsPage + 1)}>Next</button>
			</section>
			<section>
				<h2>Projects (Total: {totalProjects})</h2>
				{isHydrated && token?.valueOf() ? (
					projects?.map(project => (
						<div key={project.id}>
							<h3>{project.title}</h3>
							<p>Status: {project.status}</p>
							<p>Description: {project.description}</p>
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
				<button onClick={() => setProjectsPage(projectsPage - 1)}>Previous</button>
				<button onClick={() => setProjectsPage(projectsPage + 1)}>Next</button>
			</section>
		</div>
	)
}