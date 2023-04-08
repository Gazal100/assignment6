import react from 'react'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';

const ArtworkCard = ({objectID}) => {

    //fetch data using swr
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    //Check if the valid data is read 
    if (error) {return <Error statusCode={404} />}

    //Check if SWR request doesn't return data
    if (!data) {return null}

    //If SWR request returns good data
    const {
        primaryImageSmall,
        title,
        objectDate,
        classification,
        medium,
    } = data;

    return(
        <Card>
            <Card.Img
                variant="top"
                src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
                alt={title ? title: 'N/A'}
            />

            <Card.Body>
                <Card.Title>{title ? title : 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate ? objectDate : 'N/A'}<br/>
                    <strong>classification:</strong> {classification ? classification : 'N/A'}<br/>
                    <strong>Medium:</strong> {medium ? medium : 'N/A'}<br/>
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">{`View Artwork (${objectID})`}</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default ArtworkCard