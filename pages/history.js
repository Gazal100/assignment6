import {useAtom} from 'jotai'
import { searchHistoryAtom, favouritesAtom } from '@/store'
import { useRouter } from 'next/router';
import { Card, ListGroup, Button, Col } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

const History = () =>{

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    const [favouritesList] = useAtom(favouritesAtom);
    
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    if (!favouritesList) return null;

    const historyClicked = (e, index) =>{
        // e.stopPropagation(); 
        router.push(`/artwork?${searchHistory[index]}`);
    }

    async function removeHistoryClicked(e, index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    }

    if (parsedHistory.length === 0) {
        return (
          <Card className="mb-3">
            <Card.Body><strong>Nothing Here</strong><br/> Try searching for some artwork.</Card.Body>
          </Card>
        );
    }

    return(
        <>
        <ListGroup>
            {parsedHistory.map((historyItem, index)=>(
                <ListGroup.Item 
                    key={index} 
                    onClick={e=>historyClicked(e, index)} 
                    className={styles.historyListItem}>
                    {Object.keys(historyItem).map(key => 
                        (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                    <Button className="float-end" variant="danger" size="sm"
                    onClick={e => removeHistoryClicked(e, index)}>
                        &times;
                    </Button>
                </ListGroup.Item>
            ))}

        </ListGroup>
        </>
    )

}

export default History;