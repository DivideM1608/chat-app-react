import {React, useRef, useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import axios from "../api/axios"
import useRefreshToken from '../hooks/useRefreshToken'
import cookies from "js-cookies"
import authContext from '../context/authContext'

export default function Login() {
  const {setAuthenticated} = useContext(authContext)
  const refresh = useRefreshToken()

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/login",
            JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                "Access-Control-Allow-Origin": "*"
            }
        );
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        //const accessToken = response?.data?.accessToken;
        //const roles = response?.data?.roles;
        //const userAuth = response?.data?.user
        //const tokenAuth = response?.data?.token
        setAuthenticated(response?.data?.accessToken)
        localStorage.setItem('session', response?.data?.accessToken)
        setUser('');
        setPwd('');
        setSuccess(true);
        navigate("/profile")
        return response
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        //errRef.current.focus();
    }
  }
  return (
    <div>
        <div>Login</div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <div>
                <Form.Control type="name" placeholder="username" id="username" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required/>
              </div>
              <div>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </div>

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div>
                <Form.Control type="password" placeholder="Password" id="password"  onChange={(e) => setPwd(e.target.value)} value={pwd} required />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <button type="submit">Login</button>
          </Form>
          <button onClick={() => refresh()}>Refresh</button>
    </div>

  )
}
