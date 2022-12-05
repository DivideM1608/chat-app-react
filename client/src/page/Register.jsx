import {React, useRef, useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom"

import Form from "react-bootstrap/Form"
import axios from "../api/axios"


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
export default function Register() {

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState("")
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatcch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)
  
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  },[user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatcch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2 || !(pwd===matchPwd)) {
      setErrMsg("Invalid Entry")
      return
    }
    try {
      console.log("send")
      console.log(user, pwd)
      const response = await axios.post("/register", JSON.stringify({ user, pwd }), 
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' }
        }
      )
      console.log(response)
      //console.log(response?.data)
      //console.log(response?.accessToken)
      //console.log(JSON.stringify(response))
      //setSuccess(true)
      const userAuth = response?.data?.user
      const tokenAuth = response?.data?.token
      setUser('')
      setPwd("")
      setMatchPwd("")
      navigate("/profile")
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status ===409) {
        setErrMsg("Username Taken")
    } else {
      setErrMsg("Registeration Failed")
    }
      //errRef.current.focus()
    }
  }
  return (
    <div>
        <div>Register</div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <div>
                <Form.Control type="name" placeholder="username" id="username" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}/>
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
                <Form.Control type="password" placeholder="Password" id="password"  onChange={(e) => setPwd(e.target.value)} value={pwd} required onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}/>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div>
                <Form.Control type="password" placeholder="Password Confirm" id="confirm_pwd" onChange={(e) => setMatchPwd(e.target.value)} value={matchPwd} required onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}/>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <button type="submit">Sign Up</button>
          </Form>
    </div>
  )
}
