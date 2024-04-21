'use client'
import { useEffect, useState, useCallback } from "react";
import { notandi, group, project } from "@/types/types";

export function Delete({ token }: { token: string }) {
    const [users, setUsers] = useState<notandi[]>([]);
    const [groups, setGroups] = useState<group[]>([]);
    const [projects, setProjects] = useState<project[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [selectedProject, setSelectedProject] = useState<string>('');

    const fetchData = useCallback(async (url: string, setter: (data: any[]) => void, page: number = 1, data: any[] = []) => {
        const response = await fetch(`${url}?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData = await response.json();

        if (responseData.message === "Engar niðurstöður" || responseData.length === 0) {
            setter(data);
        } else {
            fetchData(url, setter, page + 1, [...data, ...responseData]);
        }
    }, [token]);

    useEffect(() => {
        fetchData(`${process.env.NEXT_PUBLIC_API_URL}/users`, setUsers);
        fetchData(`${process.env.NEXT_PUBLIC_API_URL}/groups`, setGroups);
        fetchData(`${process.env.NEXT_PUBLIC_API_URL}/projects`, setProjects);
    }, [fetchData]);


    const deleteItem = async (type: string, id: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            if (type === 'users') {
                fetchData(`${process.env.NEXT_PUBLIC_API_URL}/users`, setUsers);
                setSelectedUser('');
            } else if (type === 'groups') {
                fetchData(`${process.env.NEXT_PUBLIC_API_URL}/groups`, setGroups);
                setSelectedGroup('');
            } else if (type === 'projects') {
                fetchData(`${process.env.NEXT_PUBLIC_API_URL}/projects`, setProjects);
                setSelectedProject('');
            }
        } else {
            console.error(`Failed to delete ${type}`);
        }
    };

    return (
        <div>
            <h1>Users</h1>
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                ))}
            </select>
            <button onClick={() => deleteItem('users', selectedUser)}>Delete</button>

            <h1>Groups</h1>
            <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
                {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
            <button onClick={() => deleteItem('groups', selectedGroup)}>Delete</button>

            <h1>Projects</h1>
            <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.title}</option>
                ))}
            </select>
            <button onClick={() => deleteItem('projects', selectedProject)}>Delete</button>
        </div>
    );
}