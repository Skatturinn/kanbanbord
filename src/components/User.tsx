'use client'
import React, { useState } from 'react';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './User.css';

type Task = { id: string; content: string };
type Tasks = { [key: string]: Task[] };

function User() {
    const [groups, setGroups] = useState([{ value: 1, label: 'Group 1' }]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [projects, setProjects] = useState([{ value: 1, label: 'Project 1' }]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [tasks, setTasks] = useState<Tasks>({
        '1': [{ id: 'task1', content: 'Task 1' }],
        '2': [],
        '3': [],
        '4': [],
        '5': [],
    });

    const statusText = {
        '1': 'Not Started',
        '2': 'Working On It',
        '3': 'Waiting for Review',
        '4': 'Pending Deploy',
        '5': 'Done',
    };

    const handleGroupChange = (selectedOption: any) => {
        setSelectedGroup(selectedOption);
    };

    const handleProjectChange = (selectedOption: any) => {
        setSelectedProject(selectedOption);
    };

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (result: any) => {
        console.log(result);
        setIsDragging(false);

        if (!result.destination) {
            console.log('No destination found');
            return;
        }

        const { source, destination } = result;
        const sourceTasks = [...tasks[source.droppableId]];
        const destinationTasks = [...tasks[destination.droppableId]];
        const [removed] = sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, removed);

        setTasks((prevTasks) => ({
            ...prevTasks,
            [source.droppableId]: sourceTasks,
            [destination.droppableId]: destinationTasks,
        }));
    };

    return (
        <div>
            <Select
                value={selectedGroup}
                onChange={handleGroupChange}
                options={groups}
                placeholder="Select a group"
            />
            <Select
                value={selectedProject}
                onChange={handleProjectChange}
                options={projects}
                placeholder="Select a project"
            />

            <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="status-columns">
                    {Object.keys(statusText).map((status) => (
                        <Droppable droppableId={status} key={status}>
                            {(provided) => (
                                <div className="status-column" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h2>{statusText[status as keyof typeof statusText]}</h2>
                                    {tasks[status].map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div className="task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {task.content || 'No content'}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

export default User;