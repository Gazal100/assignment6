import React from 'react'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link'
import {useAtom} from 'jotai'
import {favouritesAtom} from '@/store'
import { addToFavourites, removeFromFavourites } from '@/lib/userData';


const ArtworkCardDetail = ({ objectID }) => {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])

    const favouritesClicked = async()=>{
        
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID))
            setShowAdded(false)
        }
        else{
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded(true)
        }
   
    }

    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
    );

    if (error) {return <Error statusCode={404} />}
    if (!data) {return null}

    const {
        primaryImage,
        title,
        objectDate,
        classification,
        medium,
        artistDisplayName,
        artistWikidata_URL,
        creditLine,
        dimensions,
    } = data;

  return (
    <Card>
        {primaryImage && (
            <Card.Img variant="top" src={primaryImage} alt={title || 'N/A'} />
        )}
        <Card.Body>
            <Card.Title>{title || 'N/A'}</Card.Title>
            <Card.Text>
                <span>{`Date: ${objectDate || 'N/A'}`}</span>
                <br />
                <span>{`Classification: ${classification || 'N/A'}`}</span>
                <br />
                <span>{`Medium: ${medium || 'N/A'}`}</span>
                <br />
                <br />
                <span>{`Artist: ${artistDisplayName || 'N/A'}`}</span>
                {artistWikidata_URL && (
                    <a
                    href={artistWikidata_URL}
                    target="_blank"
                     style={{ marginLeft: '5px' }}
                    >
                    wiki
                    </a>
                )}
                <br />
                <span>{`Credit Line: ${creditLine || 'N/A'}`}</span>
                <br />
                <span>{`Dimensions: ${dimensions || 'N/A'}`}</span><br/>
                <Button 
                    onClick={favouritesClicked} 
                    variant = {showAdded ? "primary" : "outline-primary"}>
                        {showAdded ? "+ Favourite (added)" : "+ Favourite"}
                </Button>
            </Card.Text>
            <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="primary">{objectID}</Button>
            </Link>
        </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;