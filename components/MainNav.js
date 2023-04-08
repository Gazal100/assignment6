import React from 'react'
import Container from 'react-bootstrap/Container';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useAtom} from 'jotai'
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

function MainNav() {

    const [searchValue, setSearchValue] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    let token = readToken()

    function logout(){
      setIsExpanded(expand => expand = false);
      removeToken();
      router.push('/login')
    }
  
    async function submitForm(e) {
      e.preventDefault(); // prevent the browser from automatically submitting the form
      console.log(searchValue)
      try{
      setSearchHistory(await addToHistory(`title=true&q=${searchValue}`))
      }
      catch(e){
        console.log(e)
      }
      router.push(`/artwork?title=true&q=${searchValue}`)
      setIsExpanded(false)
    }
    
  return (
    <>
    <Navbar bg="light" expand="lg" className="fixed-top" expanded={isExpanded} >
      <Container>
        <Navbar.Brand>Gazal Garg</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setIsExpanded(!isExpanded)}/>
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
          <Link href="/" passHref legacyBehavior><Nav.Link onClick={()=>setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
          {token ? (<Link href="/search" passHref legacyBehavior >
                                <Nav.Link href="/search" onClick={()=>setIsExpanded(!isExpanded)}>Advanced Search</Nav.Link>
                            </Link>) : ''}
                        </Nav>
                        &nbsp;{token ? (<Form className="d-flex" onSubmit={submitForm}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            
                          />
                            <Button variant="outline-light" type="submit">Search</Button>
                        </Form>) : ''}&nbsp;
                        {token ? (<Nav>
                            <NavDropdown active={router.pathname === "/history"} title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior >
                                    <NavDropdown.Item href="/favourites" onClick={()=>setIsExpanded(!isExpanded)}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior >
                                    <NavDropdown.Item href="/history" onClick={()=>setIsExpanded(!isExpanded)}>Search History</NavDropdown.Item>
                                </Link>
                                <Link href="/" passHref legacyBehavior >
                                    <NavDropdown.Item href="/" onClick={logout}>Logout</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>)
                            :
                            (<Nav>
                                <Link href="/register" passHref legacyBehavior >
                                    <Nav.Link href="/register" onClick={()=>setIsExpanded(!isExpanded)}>Register</Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior >
                                    <Nav.Link href="/login" onClick={()=>setIsExpanded(!isExpanded)}>Log in</Nav.Link>
                                </Link>
                            </Nav>
                    )}
        </Navbar.Collapse>
      </Container>
    </Navbar><br/><br/></>
  );
}

export default MainNav;