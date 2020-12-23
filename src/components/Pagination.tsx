import React, {useState, useEffect} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PaginationBarProps {
    characterCount: number;
    limitOnOnePage: number;
    updateStartIndex: (startIndex: number) => void
}

const PaginationBar: React.FunctionComponent<PaginationBarProps> = (props:PaginationBarProps) => {

    const [currentPage, updateCurrentPage] = useState(1);

    const noOfPages: number = Math.ceil(props.characterCount / props.limitOnOnePage);

    const handleClick = (pageNumber: number) => {
        if(pageNumber < 1) pageNumber = 1;
        else if(pageNumber > noOfPages) pageNumber = noOfPages;
        updateCurrentPage(pageNumber);
        const startIndex: number = 10 * (pageNumber - 1);
        props.updateStartIndex(startIndex);
    }

    const fetchPages = () => {
        let pages: number[] = [];

        if(currentPage == 1) {
            pages.push(1);
            if(noOfPages == 1) return pages;
            pages.push(2);
            if(noOfPages == 2) return pages;
            pages.push(3);
        }

        else {
            pages.push(currentPage - 1);
            pages.push(currentPage);
            if(noOfPages == currentPage) return pages;
            pages.push(currentPage + 1);
        }

        return pages;
    }

    let pages: number[] = fetchPages();

    let pageBlock: JSX.Element[] = [];

    pages.map((page, index) => {
        pageBlock.push(<Pagination.Item className = 'Page-unit' onClick = {handleClick.bind(this,page)} >{page}</Pagination.Item>)
    })

    return (
        <>
        <Pagination className = 'Pagination-bar-final' size = 'lg'>
            <Pagination.First className = 'Page-unit' onClick = {handleClick.bind(this,1)} />
            <Pagination.Prev className = 'Page-unit' onClick = {handleClick.bind(this,currentPage - 1)} />
            {pageBlock}
            <Pagination.Next className = 'Page-unit' onClick = {handleClick.bind(this,currentPage + 1)} />
            <Pagination.Last className = 'Page-unit' onClick = {handleClick.bind(this,noOfPages)} />
        </Pagination>
        </>
    )
}

export default PaginationBar;