import { createContext } from 'react'
import { useReducer } from 'react';

import AuthReducer from './AuthReducer';
// initialising state of user 
const INITIAL_STATE = {
    user: 
        { "_id": "61f3dd6c1ec28ff0acc6586c" , "username": "hareesh", "email": "hareesh@gmail.com", "password": "$2b$10$SVQpjVn2N2qNx2pzvLoFOu8hcjVL68tpb3j54rEX6CqhPfEXGQOUu", "profilePicture": "", "coverPicture": "", "followers": [], "following": ["61f3dd901ec28ff0acc6586f", "61f3dda21ec28ff0acc65872"], "isAdmin": false, "createdAt": { "$date": { "$numberLong": "1643371884325" } }, "updatedAt": { "$date": { "$numberLong": "1643372029724" } }, "__v": { "$numberInt": "2" }, "desc": "hello hareesh here my friends" }
    ,
    isFetching: false,
    error: false
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}

        >
            {children}
        </AuthContext.Provider>

    )
}