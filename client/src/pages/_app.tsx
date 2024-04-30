import type { AppProps } from 'next/app';
import UserContext  from '@/comps/UserContext';
import '../styles/globals.css';
import Navbar from "@/comps/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserContext>
            <Component {...pageProps} />
        </UserContext>
    );
}

export default MyApp;
