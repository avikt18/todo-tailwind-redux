import { useEffect } from 'react'
import useLocalStorage from './Hooks/useLocalStorage';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';


function ThemeToggler() {
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    const [currentTheme, setCurrentTheme] = useLocalStorage("theme", theme);

    const handleThemeToggler = () => {
        setCurrentTheme(!currentTheme);
    }

    const styles = 'absolute right-8 top-5 opacity-40 dark:text-white cursor-pointer';
    const size = '1.7rem';
    //For theme toggle
    useEffect(() => {
        if (currentTheme) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [currentTheme])


    return (
        <AnimatePresence>
            {currentTheme
                ? (<motion.div key='light' initial={{ opacity: 0, scale: 0 }} animate={{opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 0 }}>
                    <MdLightMode
                        onClick={handleThemeToggler}
                        className={styles}
                        size={size}
                    />
                </motion.div>
                )
                : (<motion.div key='dark' initial={{ opacity: 0, scale: 0 }} animate={{opacity: 1, scale: 1}} exit={{ opacity: 0, scale: 0 }}>
                    <MdDarkMode
                        onClick={handleThemeToggler}
                        className={styles}
                        size={size}
                    />
                </motion.div>
                )}
        </AnimatePresence>
    )


}

export default ThemeToggler
