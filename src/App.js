import { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import TodoList from './components/TodoList';
import { motion } from "framer-motion"
// import useLocalStorage from './Hooks/useLocalStorage';
import ThemeToggler from './ThemeToggler';
import { useDispatch } from 'react-redux'
import {  addTodo, removeTodo } from './Redux/Slices/todoSlice';


function App() {
  // const initialTodoState = {
  //   id: 0,
  //   todo: "Add Redux, dark mode",
  //   completed: false,
  // }

  const container = {
    hidden: { opacity: 1, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.3,
      }
    }
  }
    
  const todoInput = useRef(null);
  const [todoText, setTodoText] = useState("");
  // const [todos, setTodos] = useLocalStorage("todos", initialTodoState);
  // const todoList = useSelector(selectTodoList);
  const dispatch = useDispatch();
  // const [todos, setTodos] = useState([initialTodoState]);
  const [inputClicked, setInputClicked] = useState(false);

  const handleOverlay = () => setInputClicked(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uniqid(),
      todo: todoText,
      completed: 'false',
    }
    // const newTodoList = [...todoList, newTodo];
    dispatch(addTodo(newTodo))
    // console.log(newTodoList);
    // setTodos(newTodoList);
    setTodoText('');
  }

  const handleTodoClick = (id) => {
    // const newTodoList = todoList.filter(todo => todo.id !== id);
    dispatch(removeTodo(id))
    // setTodos(newTodoList);
  }

  const handleInputClick = (event) => event.stopPropagation();
  


  useEffect(() => {
    if (inputClicked) {
      window.addEventListener("click", handleOverlay);
      todoInput.current.addEventListener("click", handleInputClick);
    }
    const todoInputRef = todoInput.current;
    return () => {
      window.removeEventListener("click", handleOverlay)
      todoInputRef.removeEventListener("click", handleInputClick);
    }
  }, [inputClicked])


  return (
    <div className="min-h-screen dark:bg-gray-900 overflow-x-hidden flex py-8 justify-center bg-gray-50 relative">
      <div className={`min-h-screen w-screen bg-gray-500 dark:opacity-30 absolute ${!inputClicked && "invisible"} z-10 top-0 opacity-50`}></div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative  max-w-3xl flex flex-col align-center h-min dark:bg-slate-800 bg-white px-8 py-4 rounded-lg shadow-md w-screen"
      >
        <h1 className="font-medium dark:text-white opacity-80 text-black text-center text-2xl">Todos</h1>
        <ThemeToggler />
        <form className="flex flex-col dark:text-white sm:flex-row my-3" onSubmit={handleSubmit}>
          <input ref={todoInput} type='text' onClick={() => setInputClicked(!inputClicked)} onChange={(e) => setTodoText(e.target.value)} value={todoText} className='sm:w-4/5 w-full shadow-sm dark:bg-gray-900 border-slate-400 p-3 rounded-md focus-visible:outline-none z-20 focus-visible:shadow-lg relative' placeholder='Write a todo' />
          <input type="submit" value="Add+" className={`bg-slate-600 dark:bg-gray-900 ${inputClicked ? "shadow-md" : "shadow-sm" } mt-4 sm:mt-0 text-white flex-grow rounded-md z-20 p-3 sm:p-0 sm:ml-4 cursor-pointer dark:disabled:bg-zinc-400 disabled:bg-gray-400 disabled:text-black`} onClick={handleSubmit} disabled={!todoText} />
        </form>
        <TodoList handleTodoClick={handleTodoClick} />
      </motion.div>
    </div>
  );
}

export default App;

