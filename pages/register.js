import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { registerUser } from "../lib/authenticate";
import { useRouter } from 'next/router';

//This page has a function that displays the login form
export default function Register(props) {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const router = useRouter();

  //called when the user submits the login form
  async function handleSubmit(e) {
    //prevents the default form submission behaviour
    e.preventDefault();

    try{
      await registerUser(user, password, password2);
      router.push("/login");
    }catch(err){
      //to display any error messages returned from the authentication function
     setWarning(err.message);
    }
   }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register</h2>
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group  >
        <br/>
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" value={password2} id="password2" name="password2" onChange={e => setPassword2(e.target.value)} />
        </Form.Group  >
        {warning && <>
          <br />
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
    </>
  );
}