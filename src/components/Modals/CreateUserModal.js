import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function CreateUserModal({ onClose }) {

    const [inputs, setInputs] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleKeyPress = (event) => {
        // Allow only numeric characters, Backspace, ArrowLeft, ArrowRight, Delete, Tab, and a single decimal point
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', '.'];

        const value = event.target.value;
        const key = event.key;

        // Check if the pressed key is a decimal point
        const isDecimalPoint = key === '.';

        // Check if a decimal point is already present in the input
        const hasDecimalPoint = value.includes('.');

        // Allow the key if it's in the allowedKeys array or it's a decimal point not already present
        if (!allowedKeys.includes(key) || (hasDecimalPoint && isDecimalPoint)) {
            event.preventDefault();
        }

        // Allow only one decimal point
        if (isDecimalPoint && value.split('.').length > 1) {
            event.preventDefault();
        }

        // Allow only two digits after the decimal point
        const decimalPart = value.split('.')[1];
        if (decimalPart && decimalPart.length >= 2) {
            event.preventDefault();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:80/api/user/save', inputs)
            .then(() => {
                console.log(inputs);
                onClose(); // Close the modal
            })
            .catch((error) => {
                // Handle errors
            });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstname" type="text" placeholder="First Name" onChange={handleChange} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastname" type="text" placeholder="Last Name" onChange={handleChange} required />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPrelims">
                    <Form.Label>Prelims</Form.Label>
                    <Form.Control name="prelim" type="text" placeholder="0-100" onChange={handleChange} onKeyPress={handleKeyPress} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridMidterms">
                    <Form.Label>Midterms</Form.Label>
                    <Form.Control name="midterm" type="text" placeholder="0-100" onChange={handleChange} onKeyPress={handleKeyPress} required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFinals">
                    <Form.Label>Finals</Form.Label>
                    <Form.Control name="finals" type="text" placeholder="0-100" onChange={handleChange} onKeyPress={handleKeyPress} required />
                </Form.Group>
            </Row>

            <div class="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>

        </Form>
    );
}

export default CreateUserModal;