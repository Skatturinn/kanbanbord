'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { Project as ProjectComponent } from '@/components/Project';
import styles from "./User.module.scss";
import { useCookies } from 'react-cookie';

type UserType = {
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

export default function User({ token }: UserType) {
    const [group, setGroup] = useState<Group | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [refreshProjects, setRefreshProjects] = useState(false);
    const [cookies] = useCookies(['id']);
    const fetchProjects = useCallback(async (group: string) => {
        console.log(`fetchProjects is being called with group id: ${group}`);
        const authToken = token;
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
    }, [token]);

    useEffect(() => {
        console.log('id:', cookies.id);
        console.log('fetchProjects:', fetchProjects);

        const fetchUser = async () => {
            console.log('fetchUser is being called');
            const userId = cookies.id;
            if (userId) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
                const data: UserType = await response.json();
                console.log('user data:', data);
                setGroup({ id: data.group_id });
                data.group_id && fetchProjects(data.group_id);
            }
        };

        fetchUser();
    }, [cookies.id, fetchProjects]);

    useEffect(() => {
        if (group) {
            group.id && fetchProjects(group.id);
        }
    }, [fetchProjects, group, refreshProjects]);

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
                setRefreshProjects(!refreshProjects);
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