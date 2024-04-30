import React, { useEffect, useState, useRef, useContext } from 'react';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {userContext} from "@/comps/UserContext";

export default function Navbar() {
    const router = useRouter();
    const [user] = useContext(userContext);

    // Assuming user details are available in context or some other state management solution
    useEffect(() => {
        console.log("user");
        console.log(user);
    }, []);

    const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        try {

            sessionStorage.clear();
            router.push('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return router.pathname !== '/' ? (
        <header className={styles.header}>
            <nav className={styles.navbar} style={{ backgroundColor: '#1E3877', color: '#255555' }}>
                <Link href="/Chatroom" style={{ color: 'white', paddingRight: '20px' }}>CHATROOM</Link>
                <Link href="/" style={{ color: 'white', marginRight: '300px' }} onClick={handleLogout}>LOGOUT</Link>
                {user && (
                    <div style={{ color: 'white', display: 'inline-block', marginLeft: 'auto' }}>
                        HELLO!: {user.name}
                    </div>
                )}
            </nav>
        </header>
    ) : null;
}
