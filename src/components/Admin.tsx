'use client'
import React, { useEffect, useState } from 'react';
import Group from '@/components/Group';
import {Project} from '@/components/Project';
import styles from '../app/page.module.css';

function Admin() {
    const [groups, setGroups] = useState<{ id: string }[]>([]);
    const [projects, setProjects] = useState<{ id: string }[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`)
            .then(response => response.json())
            .then(data => setGroups(data));

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
            .then((response) => response.json())
            .then((data) => setProjects(data));
    }, []);

    const handleCreateProject = () => {
        const projectData = {
            group_id: 1,
            creator_id: 1,
            assigned_id: 1,
            title: "title",
            status: "0-5",
            description: "Project Description"
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
        .then(response => response.json())
        .then(data => setProjects(prevProjects => [...prevProjects, data]));
    };

    const handleUpdateProject = (projectId: string) => {
        const projectData = {
            group_id: 1,
            creator_id: 1,
            assigned_id: 1,
            title: "Updated title",
            status: "0-5",
            description: "Updated Project Description"
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
        .then(response => response.json())
        .then(data => setProjects(prevProjects => prevProjects.map(project => project.id === projectId ? data : project)));
    };

    const handleDeleteProject = (projectId: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
            method: 'DELETE',
        })
        .then(() => setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId)));
    };

    const handleCreateGroup = () => {
        const groupData = {
            admin_id: 1,
            name: "Name"
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData),
        })
        .then(response => response.json())
        .then(data => setGroups(prevGroups => [...prevGroups, data]));
    };

    const handleUpdateGroup = (groupId: string) => {
        const groupData = {
            admin_id: 1,
            name: "Updated Name"
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData),
        })
        .then(response => response.json())
        .then(data => setGroups(prevGroups => prevGroups.map(group => group.id === groupId ? data : group)));
    };

    const handleDeleteGroup = (groupId: string) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`, {
            method: 'DELETE',
        })
        .then(() => setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId)));
    };

    return (
        <div className={styles.container}>
            <div>
            <h2>Groups</h2>
            {groups.map(group => (
                <div key={group.id}>
                    <Group group={group} />
                    <button className={styles.button} onClick={() => handleUpdateGroup(group.id)}>Update Group</button>
                    <button className={styles.button} onClick={() => handleDeleteGroup(group.id)}>Delete Group</button>
                </div>
            ))}
            <button className={styles.button} onClick ={handleCreateGroup}>Create Group</button>
            </div>
            <div>
            <h2>Projects</h2>
            {projects.map(project => (
                <div key={project.id}>
                    <Project projectId={project.id} />
                    <button className={styles.button} onClick={() => handleUpdateProject(project.id)}>Update Project</button>
                    <button className={styles.button} onClick={() => handleDeleteProject(project.id)}>Delete Project</button>
                </div>
            ))}
            <button className={styles.button} onClick={handleCreateProject}>Create Project</button>
            </div>
        </div>
    );
}
export default Admin;