import { useState, useEffect } from "react"
import HomePage from './components/Homepage.js'
import AuthProvider from './AuthProvider.js'


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [role, setRole] = useState("")
    const [user, setUser] = useState();

    return (
        <div className="main-container">
            <main>
                {isLoggedIn && <HomePage /*add props*/ />}
                {!isLoggedIn && <AuthProvider  /*add props*/ />}
            </main>
        </div>
    )
}