import React from 'react';

const baseURL: string = 'https://www.breakingbadapi.com/api/';

export async function getCharacterList(isFilterApplied: boolean, filterApplied: number) {
    let urlExtension: string = baseURL + 'characters';

    if(isFilterApplied) {
        urlExtension += '?category=';
        if(filterApplied === 1) {
            urlExtension += 'Breaking+Bad';
        }
        else if(filterApplied === 2) {
            urlExtension += 'Better+Call+Saul';
        }
    }
    try {
        const res = await fetch(urlExtension);

        if(!res.ok) {
            throw new Error('Error while fetching data.');
        }

        const response = await res.json();
        console.log('character fetched',response);
        return response;
    } catch (error) {
        alert(error);
    }
}

export async function getCharacterByName(name: string) {
    
    let urlExtension: string = baseURL + 'characters?name=' + name;

    console.log('url=',urlExtension);

    try {
        const res = await fetch(urlExtension);

        if(!res.ok) {
            throw new Error('Error while fetching data.');
        }

        const response = await res.json();
        console.log('inapi',response);
        return response;
    } catch (error) {
        alert(error);
    }
}

export async function getQuotesByAuthor(author: string) {
    
    let urlExtension: string = baseURL + 'quote?author=' + author;

    try {
        const res = await fetch(urlExtension);

        if(!res.ok) {
            throw new Error('Error while fetching data.');
        }

        const response = await res.json();
        console.log('quotes',response);
        return response;
    } catch (error) {
        alert(error);
    }
}