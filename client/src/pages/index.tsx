import * as React from 'react';
import {useContext, useState} from "react";
import {useRouter} from 'next/router';
import axios from "axios";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import DialogBox from "@/comps/DialogBox";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userContext } from '@/comps/UserContext';
interface ISignInFormData {
    email: string;
    password: string;
}

export default function SignIn() {
    // const { setUser } = useUser();
    const [user, setUser] = useContext(userContext);
    const router = useRouter();
    const [signInFormData, setSignInFormData] = useState<ISignInFormData>({
        email: "",
        password: ""
    });
    const [dialogBoxData, setDialogBoxData] = useState({
        title: "",
        open: false,
        message: ""
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const url = 'http://localhost:8080/validate-user';
        axios.post(url, signInFormData)
            .then((response) => {
                console.log(response.data)
                if (response.data.data.user_data === "Failure") {
                    setDialogBoxData({
                        open: true,
                        title: "Sign-in Error",
                        message: "Invalid credentials. Please try again."
                    });
                } else {
                    const userData = response.data.data.user_data;
                    console.log(userData);
                    sessionStorage.setItem("user", JSON.stringify(userData));
                    localStorage.setItem("activeUserName", String(userData.user.firstName));
                    setUser({
                        id: userData.user._id,
                        name: userData.user.firstName,
                        email: userData.user.email,
                    });
                    localStorage.setItem('loggedInUser', JSON.stringify({
                        id: userData.user._id,
                        name: userData.user.firstName,
                        email: userData.user.email,
                    }));
                    setUser({id: userData.user._id,
                        name: userData.user.firstName,
                        email: userData.user.email,});
                    router.push("/Chatroom");
                    console.log("successful");

                }
            })
            .catch((error) => {
                console.error(error);
                setDialogBoxData({
                    title: "Error",
                    open: true,
                    message: "Something went wrong, please try again later."
                });
            });
    };

    const handleClose = () => {
        setDialogBoxData({...dialogBoxData, open: false});
    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={signInFormData.email}
                            onChange={(event) => {
                                setSignInFormData({...signInFormData, email: event.target.value});
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={signInFormData.password}
                            onChange={(event) => {
                                setSignInFormData({...signInFormData, password: event.target.value});
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Link href="/sign-up" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Container>
            <DialogBox title={dialogBoxData.title} handleClose={handleClose} isOpen={dialogBoxData.open}
                       message={dialogBoxData.message}/>

        </div>
    );
}
