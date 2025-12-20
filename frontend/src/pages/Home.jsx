import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const Home=() => {
    const { isAuthenticated, user }=useSelector((state) => state.auth)

    const displayText="Parking Management System"
    const [text, setText]=useState("")
    const [index, setIndex]=useState(0)

    useEffect(() => {
        if(index<displayText.length){
            const timeout=setTimeout(() => {
                setText((curr) => curr + displayText[index])
                setIndex((curr) => curr + 1)
            }, 100)

            return () => clearTimeout(timeout)
        }
    }, [index])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
                <p className="mb-4 text-xl text-pure-greys-200">
                    Hi, welcome{" "}
                    {isAuthenticated &&<span className="text-yellow-50 font-semibold">
                        {user?.name}
                    </span>}
                </p>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-yellow-50">
                    {text.slice(0, 7)}
                </span>

                <span className="text-white">
                    {text.slice(7)}
                </span>
            </h1>

            <p className="mt-6 max-w-xl text-pure-greys-200 text-base sm:text-2xl">
                Simple parking space management for modern buildings.
            </p>

            {!isAuthenticated && (
                <Link
                to="/login"
                className="mt-8 inline-block rounded-lg bg-yellow-50 px-8 py-3 text-lg font-semibold text-richblack-900 hover:bg-yellow-25 transition"
                >
                Login
                </Link>
            )}
        </div>
    )
}
