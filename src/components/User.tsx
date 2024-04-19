'use client'
import React, { useEffect, useState } from 'react';
import { Project as ProjectComponent } from '@/components/Project';
import styles from '../app/page.module.css';

type UserType = {
    id: string;
    group_id: string;
};

type Group = {
    id: string;
};

type Project = {
    id: string;
    group_id: string;
    status: string;
};

export default function User() {
    const [group, setGroup] = useState<Group | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [refreshProjects, setRefreshProjects] = useState(false);

    const fetchProjects = async (group: string) => {
        const authToken = localStorage.getItem('authToken');
        let allProjects: Project[] = [];

        for (let page = 1; page <= 2; page++) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?group_id=${group}&page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            });
            const data = await response.json();
            allProjects = [...allProjects, ...data];
        }

        allProjects.sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

        setProjects(allProjects);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId'); 
            if (userId) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
                const data: UserType = await response.json();
                setGroup({ id: data.group_id });
                console.log(data.group_id);
        
                fetchProjects(data.group_id);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (group) {
            fetchProjects(group.id);
        }
    }, [group, refreshProjects]);

    const handleUpdateProjectStatus = (projectId: string, status: string) => {
        const projectData = { status };
        const authToken = localStorage.getItem('authToken');
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(projectData),
        })
            .then(response => response.json())
            .then((data: Project) => {
                setRefreshProjects(!refreshProjects);
            });
    }

    return (
        <div className={`${styles.container} ${styles.projectGrid}`}>
            {projects.map((project: Project) => (
                <div key={project.id} className={styles.card}>
                    <ProjectComponent key={project.id + project.status} projectId={project.id} />
                    <select value={project.status} onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            ))}
        </div>
    );
}