import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from 'next/router';
import {useAtom} from 'jotai'
import { favouritesAtom } from '@/store'
import { searchHistoryAtom } from '@/store'
import { getFavourites, getHistory } from '../lib/userData';

//This page has a function that displays the login form
export default function Login(props) {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  //called when the user submits the login form
  async function handleSubmit(e) {
    //prevents the default form submission behaviour
    e.preventDefault();

    try{
      await authenticateUser(user, password);
    //   await updateAtoms();
      router.push("/favourites");
    }catch(err){
      //to display any error messages returned from the authentication function
     setWarning(err.message);
    }
   }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
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

        {warning && <>
          <br />
          <Alert variant='danger'>
            {warning}
          </Alert>
        </>}

        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}