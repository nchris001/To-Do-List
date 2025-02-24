import React from "react";
import { useState } from "react";
import { ITask } from "../interface";

interface Props {
    task: ITask
    completeTask(taskNameToDelete: string): void;
    editTask(oldTaskName: string, newTaskName: string): void;
}

const TodoTask = ({task, completeTask, editTask}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskName, setNewTaskName] = useState(task.taskName);

    const handleSave = () => {
        if (newTaskName.trim() === "") return;
        editTask(task.taskName, newTaskName);
        setIsEditing(false);
    };

    return <div className="task">
    <div className="content">
        {isEditing ? (
            <>
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                />
                <button onClick={handleSave}>
                    Save
                </button>
                <button onClick={() => setIsEditing(false)}>X</button>
            </>
        ) : (
            <>
                <span>{task.taskName}</span>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => completeTask(task.taskName)}>X</button>
            </>
        )}
    </div>
</div>

}

export default TodoTask;