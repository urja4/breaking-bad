import React from 'react';
import '../css/Character-card.css';
import { Link } from 'react-router-dom';
import {CardDeck, Card, ListGroup, ListGroupItem} from 'react-bootstrap';

export interface Character {
    char_id?: number,
    name?: string,
    birthday?: string,
    occupation?: string [],
    img?: string,
    status?: string,
    appearance?: number [],
    nickname?: string,
    portrayed?: string
}

interface CharacterCardProps {
    character: Character
}

const CharacterCard: React.FunctionComponent<CharacterCardProps> = (props: CharacterCardProps) => {

    if(props.character.name) {
        const url: string = '/character/' + props.character.name.replace(/ /g,"+");;

        return (
            <div className = 'Character-card'>
                <Link to = {url}>
                    <Card style={{ width: '20rem', border: '5px solid' }}>
                        <Card.Img className = 'Character-image' variant="top" src={props.character.img} />
                        <Card.Body>
                            <Card.Title className = 'Character-name'>{props.character.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className="Data">
                            <ListGroupItem className = 'Character-data' style = {{height: '75px'}}>Occupation: {props.character.occupation}</ListGroupItem>
                            <ListGroupItem className = 'Character-data'>Date of Birth: {props.character.birthday}</ListGroupItem>
                            <ListGroupItem className = 'Character-data'>Status: {props.character.status}</ListGroupItem>
                        </ListGroup>
                    </Card>
                </Link>
            </div>
        )
    }
    else return(<></>);
}

interface CharacterCardsSetProps {
    characterList : Character[];
}

const CharacterCardsSet: React.FunctionComponent<CharacterCardsSetProps> = (props: CharacterCardsSetProps) => {
    if(props.characterList.length == 0) return(<></>);

    return (
        <div className = 'Character-list'>
         <CardDeck>
            {props.characterList.map((character, index) => (
                <CharacterCard character = {character} />
            ))}
        </CardDeck>
        </div>
     );
     
}

export default CharacterCardsSet;