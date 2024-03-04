import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import Login from './pages/Login';
import Register from "./pages/Register";

import './App.css';
import { UserProvider } from "./UserContext";


function App() {

  const [user, setUser] = useState({ access: localStorage.getItem("token") });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    // console.log(user);
    // console.log(localStorage);

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {

      console.log(data);

      if (typeof data.user !== "undefined"){

        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });

      } else {

        setUser({
          id: null,
          isAdmin: null
        })

      }

    })


  }, []);

  return (
    <>
    <h1>hello</h1>
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>

        <Container fluid>     
          <Routes>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
    </>
    

  );
}

export default App;
