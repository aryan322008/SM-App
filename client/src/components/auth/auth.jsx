import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import Styles from "./styles"
import LockIcon from '@mui/icons-material/Lock';
import Input from "./input"
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../states/actions/auth-actions"

const Auth = () => {
  const classes = Styles()
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [type, setType] = useState("password");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", firstName: "", lastName: "", password: "", confirmPassword: "" });

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignedUp) {
      dispatch(login({ email: formData.email, password: formData.password, userFromGoogle: false }))
        setTimeout(() => {
        navigate("/");
      }, 100);

    } else {
      dispatch(register({ ...formData, userFromGoogle: false }))
          setTimeout(() => {
            navigate("/");
          }, 100);
  
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleShowPassword = () => {
    setType((pre) => {
      return pre === "text" ? "password" : "text"
    })
  }

  const switchMode = () => {
    setIsSignedUp((pre) => {
      return !pre
    })
  }

  const createOrGetUser = async (res) => {
    const decoded = await jwt_decode(res.credential);
    const picture = decoded?.picture
    const name = decoded?.name
    const email = decoded?.email



    const action = {
      type: "AUTH", data: {
        token: res.credential,
        newUser: { name, email, picture }
      }
    }

    if (isSignedUp) {
      dispatch(login({ userFromGoogle: true, email }))

      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      dispatch(register({ userFromGoogle: true, name, email }))

      setTimeout(() => {
        navigate("/");
      }, 100);
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>

        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>

        <Typography
          variant="h5"
        >{isSignedUp ? "Login" : "Sign Up"}</Typography>

        <form className={classes.form} onSubmit={(e) => { handleSubmit(e) }}>

          <Grid container spacing={2}>
            {
              !isSignedUp && (
                <>
                  <Input
                    name="firstName"
                    handleChange={handleChange}
                    label="First Name"
                    half
                    type="text"
                  />
                  <Input
                    name="lastName"
                    handleChange={handleChange}
                    label="Last Name"
                    half
                    type="text"
                  />
                </>
              )
            }
            <Input
              name="email"
              handleChange={handleChange}
              label="Email"
              type="text"
            />
            <Input
              name="password"
              handleChange={handleChange}
              label="Password"
              type={type}
              handleShowPassword={handleShowPassword}
            />

            {!isSignedUp && (
              <Input
                name="confirmPassword"
                handleChange={handleChange}
                label="Confirm Password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? "Login" : "Sign Up"}
          </Button>
        </form>

        <GoogleLogin
          onSuccess={response => {
            createOrGetUser(response)
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {!isSignedUp ? "Already have an account : Login" : "Don't have an account : Sign In"}
            </Button>
          </Grid>
        </Grid>

      </Paper>
    </Container>
  )
}

export default Auth

