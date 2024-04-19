'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function GroupForm() {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`)
            .then(response => response.json())
            .then(data => setGroups(data.map((group: any) => ({ value: group.id, label: group.name }))));
    }, []);

    const handleGroupChange = (selectedOption: any) => {
        setSelectedGroup(selectedOption);
        setName(selectedOption.label);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleCreate = () => {
        const groupData = {
            admin_id: 1,
            name: name
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(groupData),
        });
    };

    const handleUpdate = () => {
        if (selectedGroup) {
            const groupData = {
                name: name
            };

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${(selectedGroup as any).value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(groupData),
            });
        }
    };

    return (
        <div>
            <form onSubmit={event => event.preventDefault()}>
                <Select
                    value={selectedGroup}
                    onChange={handleGroupChange}
                    options={groups}
                />
                <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
                <button type="button" onClick={handleCreate}>Create Group</button>
                <button type="button" onClick={handleUpdate}>Update Group</button>
            </form>
        </div>
    );
};

function ProjectForm() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [groupId, setGroupId] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [assignedId, setAssignedId] = useState('');

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
            .then(response => response.json())
            .then(data => setProjects(data.map((project: any) => ({ value: project.id, label: project.title }))));
    }, []);

    const handleProjectChange = (selectedOption: any) => {
        setSelectedProject(selectedOption);
        setTitle(selectedOption.label);
        setDescription(selectedOption.description);
        setStatus(selectedOption.status);
        setGroupId(selectedOption.groupId);
        setCreatorId(selectedOption.creatorId);
        setAssignedId(selectedOption.assignedId);
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const handleCreate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const projectData = {
            group_id: groupId,
            creator_id: creatorId,
            assigned_id: assignedId,
            title: title,
            status: status,
            description: description
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(projectData),
        });
    };

    const handleUpdate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (selectedProject) {
            const projectData = {
                title: title,
                description: description
            };

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${(selectedProject as any).value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(projectData),
            });
        }
    };

    return (
        <div>
            <form onSubmit={event => event.preventDefault()}>
                <Select
                    value={selectedProject}
                    onChange={handleProjectChange}
                    options={projects}
                />
                <input type="text" value={groupId} onChange={handleInputChange(setGroupId)} placeholder="Group ID" />
                <input type="text" value={creatorId} onChange={handleInputChange(setCreatorId)} placeholder="Creator ID" />
                <input type="text" value={assignedId} onChange={handleInputChange(setAssignedId)} placeholder="Assigned ID" />
                <input type="text" value={title} onChange={handleInputChange(setTitle)} placeholder="Title" />
                <input type="text" value={status} onChange={handleInputChange(setStatus)} placeholder="Status" />
                <input type="text" value={description} onChange={handleInputChange(setDescription)} placeholder="Description" />
                <button type="button" onClick={handleCreate}>Create Project</button>
                <button type="button" onClick={handleUpdate}>Update Project</button>
            </form>
        </div>
    );
};

function Admin() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GroupForm />
            <ProjectForm />
        </div>
    );
};

export default Admin;