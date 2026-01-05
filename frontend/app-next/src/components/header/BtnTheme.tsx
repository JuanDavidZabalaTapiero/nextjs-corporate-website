"use client";

import { useEffect, useState } from "react"

export default function BtnTheme() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    })

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setDark(isDark);
    }

    return (
        <button onClick={toggleTheme}>
            {dark ? "☀️" : "🌙"}
        </button>
    )
}