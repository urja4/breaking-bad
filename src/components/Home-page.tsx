import React, { useEffect, useState } from 'react';
import '../css/Home-page.css';
import * as apiCalls from '../utility-functions/api-calls';
import PaginationBar from './Pagination';
import Filter from './Filter';
import CharacterCardsSet from './Character-cards';
import {Character} from './Character-cards';

const HomePage : React.FunctionComponent = () => {
    const [isFilterApplied, applyFilter] = useState(false);
    const [filterApplied, changeAppliedFilter] = useState(0);
    const limitOnOnePage = 10;
    const [startIndex, updateStartIndex] = useState(0);
    const [characterList, updateCharacterList] = useState<Character[]>([]);
    const [currentPageCharacter, updateCurrentPageCharacter] = useState<Character[]>([]);

    useEffect(() => {
        (async function() {
            const data = await apiCalls.getCharacterList(isFilterApplied, filterApplied);
            updateCharacterList(data);
            const endIndex: number = ((startIndex + 10) <= data.length) ? startIndex + 9 : data.length - 1;
            const newCharacterList = data.slice(startIndex,endIndex);
            updateCurrentPageCharacter(newCharacterList);
        })();
    }, [startIndex]);

    useEffect(() => {
        (async function() {
            const data = await apiCalls.getCharacterList(isFilterApplied, filterApplied);
            updateCharacterList(data);
            updateStartIndex(0);
            const endIndex = (10 <= data.length) ? 10 : data.length;
            const newCharacterList = data.slice(startIndex, endIndex);
            updateCurrentPageCharacter(newCharacterList);
        })();
    }, [filterApplied]);

    return (
        <div className = 'Home-page'>
            <div className = 'Home-page-header'>
                Breaking Bad
            </div>
            <div className = 'Taskbar'>
                <PaginationBar characterCount = {characterList.length} limitOnOnePage = {limitOnOnePage} updateStartIndex = {updateStartIndex} />
                <Filter applyFilter = {applyFilter} changeAppliedFilter = {changeAppliedFilter} />
            </div>
            <CharacterCardsSet characterList = {currentPageCharacter} />
        </div>
    )
}

export default HomePage;