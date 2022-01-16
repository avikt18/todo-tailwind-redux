import React from 'react'
import Todo from './Todo';
import { useSelector } from 'react-redux'
import { selectTodoList} from '../Redux/Slices/todoSlice';


function TodoList({ handleTodoClick }) {
    const todoList = useSelector(selectTodoList);
    return (
        <div>
            {todoList.map(todo => <Todo todo={todo} handleTodoClick={handleTodoClick} key={todo.id} />)}
        </div>
    )
}

export default TodoList
