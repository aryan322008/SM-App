import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import memories from "../../images/memoriesLogo.png"
import memoriesTxt from "../../images/memoriesText.png"
import Styles from "./styles"
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const classes = Styles()
    const [user, setUser] = useState({ name: "", email: "", id: "" });
    const dispatch = useDispatch()

    useEffect(() => {
        const User = localStorage.getItem("user")
        if (User) {
            const user = JSON.parse(User)
            setUser(user.newUser)
        } else {
            console.log("not signed up")
        }

    }, []);

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        setUser({})
        googleLogout()

        navigate("/auth")
    }

    return (
        <AppBar
            position="static"
            color="inherit"
            className={classes.appBar}>

            <Link to="/" className={classes.brandContainer}>
                <img component={Link} to="/" src={memoriesTxt} alt="icon" height="35px" />
                <img className={classes.image} src={memories} alt="icon" height="30px" />
            </Link>

            <Toolbar className={classes.toolbar}>
                {user.name.length ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user?.email}
                            src={user?.picture}
                        >{user?.name.charAt(0)}</Avatar>
                        <Typography
                            className={classes.userName}
                            variant="h6"
                        >{user?.name}</Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={logout}
                        >Logout</Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >Sign In</Button>
                )}

            </Toolbar>
        </AppBar>

    )
}

export default Navbar


// 