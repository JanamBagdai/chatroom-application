import { createContext, useState, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

// Create a context with a default value of type User and a function to update it
export const userContext = createContext<[User, React.Dispatch<React.SetStateAction<User>>]>([{ id: "", name: "", email: "" }, () => {}]);

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = (props) => {
    // This state will be shared with all components
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: ""
    });

    return (
        // This is the provider providing state
        <userContext.Provider value={[user, setUser]}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserProvider;
