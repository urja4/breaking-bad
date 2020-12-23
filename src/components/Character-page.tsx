import React, {useState, useEffect} from 'react';
import '../css/Character-page.css';
import {useParams} from 'react-router-dom';
import * as apiCalls from '../utility-functions/api-calls';
import {Character} from './Character-cards';

interface Quotes {
    quote_id?: number,
    quote?: string,
    author?: string,
    series?: string
}

interface Params {
    id: string;
}

const CharacterPage : React.FunctionComponent = () => {

    const id: Params = useParams();
    const name = id.id;
    const [characterData, updateCharacterData] = useState<Character[]>([]);
    const [quotes, saveQuotes] = useState<Quotes[]>([]);

    useEffect(() => {
        (async function() {
            const data = await apiCalls.getCharacterByName(name);
            updateCharacterData(data);
            const quoteData = await apiCalls.getQuotesByAuthor(name);
            saveQuotes(quoteData);
        })();
    });

    let character: Character = {};
    if(characterData) {
        character = characterData[0];
    }

    let quoteList: JSX.Element[] = [];
    for(let i = 0; i < quotes.length; i++ ) {
        quoteList.push(<div className = 'Quotes'>
                            {quotes[i].quote}
                        </div>);
    }

    if(character && quoteList) {
        return (
            <div className = 'Character-page'>
                <div className = 'Character-data'>
                    <div className = 'Character-name'>
                        {character.name}
                    </div>
                    <div className = 'Details'>
                        <div className = 'Data'>
                            Date of Birth: {character.birthday}
                        </div>
                        <div className = 'Data'>
                            Occupation: {character.occupation}
                        </div>
                            Status: {character.status}
                        <div className = 'Data'>
                            Nickname: {character.nickname}
                        </div>
                        <div className = 'Data'>
                            Portrayed: {character.portrayed}
                        </div>
                        <div className = 'Data'>
                            Appearance: {character.appearance}
                        </div>
                    </div>
                    <div className = 'Quote-title'>
                        Quotes
                        {quoteList}
                    </div>
                </div>
                <div className = 'Image'>
                    <img src = {character.img} alt = "" />
                </div>
            </div>
        )
    }
    else return (<></>);
}

export default CharacterPage;