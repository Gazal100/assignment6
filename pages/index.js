/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Gazal Garg       Student ID: 107140212        Date: April 08
*
* Vercel App (Deployed) Link: https://assignment6-delta.vercel.app/
*
********************************************************************************/ 
import React from 'react';
import { Container, Image } from 'react-bootstrap';


const Home = () => {

  return (
    <Container>
      <Image fluid rounded src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" />
      
          <p>The Metropolitan Museum of Art of New York City, colloquially The Met, is the largest art museum in the 
            Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. 
            The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on
             Upper East Side of Manhattan, is by area one of the largest art museums in the world. A much smaller second location, The Cloisters 
             at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from 
             medieval Europe.</p>
          <p>The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American
             people. The permanent collection in the museum consists of works of art from classical antiquity and ancient Egypt, 
             paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern
              art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is
               home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons 
               and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern 
               American design, are installed in its galleries.</p>
          <p>The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, 
            the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.</p>
          <p>To learn more about the Metropolitan Museum of Art, please visit its <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.</p>
        
    </Container>
  );
};

export default Home;

