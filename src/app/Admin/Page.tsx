import React, { useEffect, useState } from 'react';
import Group from '../../components/Group';
import { Project } from '../../components/Project';
import styles from '../page.module.css';

export function AdminView() {
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
        // Implement create project functionality here
    };

    const handleUpdateProject = (projectId: string) => {
        // Implement update project functionality here
    };

    const handleDeleteProject = (projectId: string) => {
        // Implement delete project functionality here
    };

    const handleCreateGroup = () => {
        // Implement create group functionality here
    };

    const handleUpdateGroup = (groupId: string) => {
        // Implement update group functionality here
    };

    const handleDeleteGroup = (groupId: string) => {
        // Implement delete group functionality here
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

