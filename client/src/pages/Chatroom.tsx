import {useContext, useEffect, useState} from "react";
import WebSocketCall from "../comps/WebSocketCall";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import {userContext} from '@/comps/UserContext';
import Navbar from "@/comps/Navbar";

export default function Chatroom() {
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [user, setUser] = useContext(userContext);

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }
        const socket = io("http://localhost:4000/", {
            transports: ["websocket"],
            query: {
                origin: "http://localhost:3000/"
            }
        });

        setSocketInstance(socket);

        socket.on("connect", () => {
            console.log("Connected to server");
        });

        setLoading(false);
        console.log("37")
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        return () => {
            socket.disconnect();
        };

    }, [ router]);

    return (
        <div className="App" style={{ }}>
            <Navbar/>
            <h1>ChatRoom</h1>
            <div className="line">
                {!loading && socketInstance && (
                    <WebSocketCall socket={socketInstance} />
                )}
            </div>

        </div>
    );
}
