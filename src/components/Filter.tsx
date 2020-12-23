import React, {useState} from 'react';
import '../css/Filter.css';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FilterProps {
    applyFilter: (isFilterApplied: boolean) => void; 
    changeAppliedFilter: (filterApplied: number) => void;
}

const Filter: React.FunctionComponent<FilterProps> = (props: FilterProps) => {

    const [show, setShow] = useState(false);
    const [selected, changeSelected] = useState(3);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let selectedCategory: number;

    const handleClick = (category: number) => {
        selectedCategory = category;
        changeSelected(category);
    }

    const handleSave = () => {
        if(typeof(selectedCategory) == 'undefined') {
            return;
        }
        if(selectedCategory) {
            props.applyFilter(true);
        }
        else {
            props.applyFilter(false);
        }
        props.changeAppliedFilter(selectedCategory);
        setShow(false);
    }

    return (
        <>
        <Button className = 'Filter-button' onClick={handleShow}>
          Filter
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header style ={{justifyContent: 'center'}}>
            <Modal.Title className = 'Title'>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body className = 'Body'>
                <Button className = 'Option' style = {{backgroundColor: (selected == 1)? '#6b5e62': '#c9f0ff', color: (selected == 1)? 'white': 'black'}} onClick= {handleClick.bind(this,1)} >Breaking Bad</Button>
                <Button className = 'Option' style = {{backgroundColor: (selected == 2)? '#6b5e62': '#c9f0ff', color: (selected == 1)? 'white': 'black'}} onClick = {handleClick.bind(this,2)} >Better Call Saul</Button>
                <Button className = 'Option' style = {{backgroundColor: (selected == 0)? '#6b5e62': '#c9f0ff', color: (selected == 1)? 'white': 'black'}} onClick = {handleClick.bind(this,0)} >None</Button>
          </Modal.Body>
          <Modal.Footer className = 'Footer'>
            <Button className = 'Cancel-button' variant="secondary" onClick = {handleClose} >
                Cancel
            </Button>
            <Button className = 'Save-button' variant="primary" onClick = {handleSave} >
                Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Filter;