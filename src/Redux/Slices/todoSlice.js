import { createSlice } from '@reduxjs/toolkit'

const initialState = {  
    todoList: []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
        }, 
        removeTodo: (state, action) => {
            state.todoList.filter(todo => todo.id !== action.payload)
        } 
    }
});

export const { addTodo, removeTodo } = todoSlice.actions
export const selectTodoList = state => state.todo.todoList
export default todoSlice.reducer