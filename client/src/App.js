import React, {useState,useEffect} from 'react';
import { Container ,Grow } from "@material-ui/core";
import Navbar from "./components/Navbar/navbar"
import Home from "./components/Home/Home"
import Auth from "./components/auth/auth"
import Post from "./components/postDetails/postDetails"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { Navigate } from "react-router-dom";



const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element:		<Navigate to="/posts" />
      
    },
    {
      path: "/posts",
      element: <> 
      <Navbar/>
       <Home/>
       </>
    },
    {
      path:"/auth",
      element:<Auth/>
    },
    {
      path:"/posts/:id",
      element:
      <> 
      <Navbar/>
      <Post/>
      </>
    }
  ]);

  return (
    <>
       <GoogleOAuthProvider clientId="815033792645-lsv9fv3nmght2p80nm9qm18oqeqn293a.apps.googleusercontent.com">
      <Container maxWidth="xl">
      <RouterProvider router={router} />
      </Container>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;

//clientId :- 815033792645-lsv9fv3nmght2p80nm9qm18oqeqn293a.apps.googleusercontent.com