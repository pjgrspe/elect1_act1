import React, { useEffect, useState } from 'react';
import '../stylesheet/UserTable.css';
import searchIcon from '../img/searchicon.png';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function EditTable() {

    const [inputs, setInputs] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/').then(function (response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmitUpdate = (event) => {
        event.preventDefault();

        // Assuming you have an array of user data to update
        const usersToUpdate = users.map(user => ({
            id: user.id,
            firstname: document.getElementById(`firstname-${user.id}`).value,
            lastname: document.getElementById(`lastname-${user.id}`).value,
            prelim: document.getElementById(`prelim-${user.id}`).value,
            midterm: document.getElementById(`midterm-${user.id}`).value,
            finals: document.getElementById(`finals-${user.id}`).value,
        }));


        axios.put('http://localhost:80/api/users/edit', { users: usersToUpdate })
            .then(() => {
                console.log("Update successful");
                getUsers();
                navigate('/'); 
            })
            .catch((error) => {
                console.error("Error updating users", error);
                // Handle errors
            });
    };

    const handleSubmitDelete = (userId) => {
        axios.delete(`http://localhost:80/api/user/delete?id=${userId}`)
            .then(() => {
                console.log(`User ${userId} deleted successfully`);
                getUsers();
            })
            .catch((error) => {
                // Handle errors
            });
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


    return (
        <div className="container text-center text-white">
            <div className="row pt-3">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-4">Edit Student Records</h1>
                </div>
            </div>
            <div className="container py-2">
                <div className="row">
                    <div className="col-lg-10 mx-auto bg-white rounded shadow">
                        <div className="row text-black mx-auto text-align-right">
                        </div>
                        {/* TABLE */}
                        <div className="table-responsive">
                            <table className="table table-fixed">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-1">ID</th>
                                        <th scope="col" className="col-3">First</th>
                                        <th scope="col" className="col-3">Last</th>
                                        <th scope="col" className="col-1">Prelims</th>
                                        <th scope="col" className="col-1">Midterms</th>
                                        <th scope="col" className="col-1">Finals</th>
                                        <th scope="col" className="col-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, key) => (
                                        <tr key={key}>
                                            <td className="col-1">
                                                <Form.Group as={Col} controlId={`formGridFirstName-${user.id}`}>
                                                    <Form.Control id={`id-${user.id}`} defaultValue={user.id} name="id" type="text" placeholder="ID" readOnly style={{ textAlign: 'center' }} />
                                                </Form.Group>
                                            </td>
                                            <td className="col-3">
                                                <Form.Group as={Col} controlId={`formGridFirstName-${user.id}`}>
                                                    <Form.Control id={`firstname-${user.id}`} onChange={handleChange} defaultValue={user.firstname} name="firstname" type="text" placeholder="First Name" required />
                                                </Form.Group>
                                            </td>
                                            <td className="col-3">
                                                <Form.Group as={Col} controlId={`formGridLastName-${user.id}`}>
                                                    <Form.Control id={`lastname-${user.id}`} onChange={handleChange} defaultValue={user.lastname} name="lastname" type="text" placeholder="Last Name" required />
                                                </Form.Group>
                                            </td>
                                            <td className="col-1">
                                                <Form.Group as={Col} controlId={`formGridPrelim-${user.id}`}>
                                                    <Form.Control id={`prelim-${user.id}`} onKeyPress={handleKeyPress} onChange={handleChange} defaultValue={user.prelim} name="prelim" type="text" placeholder="0-99" required style={{ textAlign: 'center' }} />
                                                </Form.Group>
                                            </td>
                                            <td className="col-1">
                                                <Form.Group as={Col} controlId={`formGridMidterm-${user.id}`}>
                                                    <Form.Control id={`midterm-${user.id}`} onKeyPress={handleKeyPress} onChange={handleChange} defaultValue={user.midterm} name="midterm" type="text" placeholder="0-99" required style={{ textAlign: 'center' }} />
                                                </Form.Group>
                                            </td>
                                            <td className="col-1">
                                                <Form.Group as={Col} controlId={`formGridFinals-${user.id}`}>
                                                    <Form.Control id={`finals-${user.id}`} onKeyPress={handleKeyPress} onChange={handleChange} defaultValue={user.finals} name="finals" type="text" placeholder="0-99" required style={{ textAlign: 'center' }} />
                                                </Form.Group>
                                            </td>
                                            <td className="col-2">
                                                <Button variant="danger" type="submit" onClick={() => handleSubmitDelete(user.id)} >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))};
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-2 d-flex justify-content-center"> {/* After UPDATING it should go back to index (home) */}
                <Form onSubmit={handleSubmitUpdate}>
                    <Link to="/">
                        <Button className='m-2 p-2' variant="danger" type="button">
                            Cancel
                        </Button>
                    </Link>
                    <Button className='p-2' variant="success" type="submit">
                        Update
                    </Button>
                </Form>
            </div>
        </div>
    );
}