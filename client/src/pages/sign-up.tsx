import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from "react";
import DialogBox from "@/comps/DialogBox";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Container from '@mui/material/Container';

interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    retypePassword: string;
}

export default function SignUp() {
    const router = useRouter()
    const [dialogBoxData, setDialogBoxData] = useState({
        title: "",
        open: false,
        message: ""
    });

    const [formData, setFormData] = useState<UserFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypePassword: ''
    });
    const handleClose = () => {
        setDialogBoxData({ ...dialogBoxData, open: false });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password !== formData.retypePassword) {
            setDialogBoxData({
                open: true,
                title: "Error",
                message: "Password do not match, re-try."
            });
            return;
        }

        //const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/post-user`;
        const url = 'http://localhost:8080/post-user';
        axios.post(url, formData)
            .then((response) => {
                console.log(response.data);
                let savedUser = response.data.data.user_data;

                    setDialogBoxData({
                        open: true,
                        title: "Success",
                        message: "New user is created and your request to join the appropriate lab has been raised. You can login anytime and check its status"
                    });
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response && error.response.status === 400) {
                    setDialogBoxData({
                        open: true,
                        title: "Error",
                        message: error.response.data.message
                    });
                } else {
                    setDialogBoxData({
                        open: true,
                        title: "Error",
                        message: "Something went wrong, please try again later"
                    });
                }
                // console.error(error);
                // setMessage(" something went wrong, please try again later");
                // setOpen(true);
            });
    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    autoFocus
                    value={formData.firstName}
                    onChange={(event) => {
                        setFormData({...formData, firstName: event.target.value});
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    autoFocus
                    value={formData.lastName}
                    onChange={(event) => {
                        setFormData({...formData, lastName: event.target.value});
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                    value={formData.email}
                    onChange={(event) => {
                        setFormData({...formData, email: event.target.value});
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    type="password" 
                    autoFocus
                    value={formData.password}
                    onChange={(event) => {
                        setFormData({...formData, password: event.target.value});
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="retypePassword"
                    label="Retype Password"
                    name="retypePassword"
                    type="password"
                    autoFocus
                    value={formData.retypePassword}
                    onChange={(event) => {
                        setFormData({ ...formData, retypePassword: event.target.value });
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Create account
                </Button>
            </form>
            </Container>
            <DialogBox title={dialogBoxData.title} handleClose={handleClose} isOpen={dialogBoxData.open} 
                        message={dialogBoxData.message} />
        </div>
    )

}