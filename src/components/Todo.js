import React, { useRef, useState } from 'react'
import { MdModeEditOutline, MdDone } from 'react-icons/md';
import { motion } from "framer-motion"

function Todo({ todo, handleTodoClick }) {
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }
    const todoCard = useRef(null)
    const [isCompleted, setIsCompleted] = useState(false)
    const [showTag, setShowTag] = useState(false)
    const handleClick = id => {
        setIsCompleted(!isCompleted)
        setShowTag(!showTag)
        // setTimeout(() => todoCard.current.classList.add('opacity-0'), 1000)
        setTimeout(() => handleTodoClick(id), 2200)
        // handleTodoClick(id)
    }
    return (
        <motion.div
            variants={item}
            ref={todoCard}
            className=" my-2 relative rounded-lg border-2 dark:border-gray-900 border-slate-100 rounder-md flex flex-col justify-center"
        >
            <p className={`font-todo p-4 dark:text-white text-xl break-words font-normal text-gray-800  ${isCompleted && "line-through opacity-30"}`}>{todo.todo}</p>
            <div className='flex bg-slate-50 relative  dark:bg-gray-900 rounded-b-md shadow-sm'>
                <button title='Edit' className='flex-1 p-2 border-r-[1px] dark:border-black hover:shadow-sm hover:bg-slate-100 dark:hover:bg-gray-900'>
                    <MdModeEditOutline className='opacity-50 mx-auto dark:text-white' size='1.5em' />
                </button>
                <button title='Done' className='flex-1 p-2 hover:shadow-sm dark:border-black hover:bg-slate-100 dark:hover:bg-gray-900' onClick={() => handleClick(todo.id)}>
                    <MdDone className='opacity-50 mx-auto dark:text-white' size='1.5em' />
                </button>
            </div>
            {showTag && <motion.div
                className={` absolute w-max bg-slate-600 p-2 rounded-md text-white left-full`}
                initial={{opacity: 0, x: -10}}
                animate={{opacity: 1, x: 10}}
            >
                Done ✅
            </motion.div>}
        </motion.div>
    )
}

export default Todo
