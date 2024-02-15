import React, { useState } from "react";

interface item {
    id: number;
    text: string;
    completed: boolean; 
}

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<item[]>([
        {id:1, text: "Apprendre Typescript", completed: false},
        {id:2, text: "Sortir les poubelles", completed: false},
    ])
const [input, setInput] = useState<string>("")
const [editing, setEditing] = useState<{ id: number; text: string } | null>(null);

// fonction pour changer l'état de la todo
    const handleToggle = (id:number) => {
        setTodos(
            todos.map((todo)=> {
                if(todo.id === id){
                    return {...todo, completed: !todo.completed };
                }
                return todo
            })
        )
    }

// fonction pour ajouter des todos à la liste
    const handleClick = () => {
        const newTodo: item = {id: Date.now(), text:input, completed:false }
        setTodos([...todos,newTodo])
    }
// fonction pour supprimer une todo
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
// fonction pour modifier une todo
    const handleEdit = (id: number) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        if(todoToEdit) {
            setEditing({id, text:todoToEdit.text});
        }
    };
// fonction pour confirmer la modification de la todo
    const handleEditConfirm = () => {
        if(editing) {
            setTodos(
                todos.map((todo) => {
                    if (todo.id === editing.id) {
                        return { ...todo, text: editing.text};
                    }
                    return todo;
                })
            );
        }
        setEditing(null);
    }

    return <div className="main-container">
        <h1>Todo List</h1>
        <ul>
            {todos.map((todo)=> (
                <li key={todo.id} style={{textDecoration: todo.completed ? "line-through" : "none"}}>
                    <div className="todoDiv">
                    {editing && editing.id === todo.id ? (
                                <input
                                    type="text"
                                    value={editing.text}
                                    onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                                />
                            ) : (
                                todo.text
                            )}
                        <div className="todoList">
                            <button id="toggleBtn" onClick={() => handleToggle(todo.id)}>Terminé</button>
                            <button id="deleteBtn" onClick={() => handleDelete(todo.id)}>Supprimer</button>
                            {editing && editing.id === todo.id ? (
                                    <button id="editBtn" onClick={handleEditConfirm}>
                                        Confirmer
                                    </button>
                                ) : (
                                    <button id="editBtn" onClick={() => handleEdit(todo.id)}>
                                        Modifier
                                    </button>
                                )}
                        </div>
                    </div>
                </li>
                ))}
        </ul>
        <input type="text" placeholder="Ajouter un item" onChange={(e)=> setInput(e.currentTarget.value)} />
        <button id="addBtn" onClick={handleClick}>Ajouter</button>
    </div>
}