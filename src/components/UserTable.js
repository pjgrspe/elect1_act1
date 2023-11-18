import React, { useEffect, useState } from 'react';
import '../stylesheet/UserTable.css';
import searchIcon from '../img/searchicon.png';
import axios from 'axios';
import EditUserButton from './Buttons/EditButton';
import AddUserButton from './Buttons/AddButton';
import Button1 from './Buttons/Button1';
import Button2 from './Buttons/Button2';
import Button3 from './Buttons/Button3';
import Button4 from './Buttons/Button4';

export default function UserTable() {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.id.toString().includes(searchTerm.toLowerCase()) ||
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (`${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/').then(function (response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    return (
        <div className="container text-center text-white">
            <div className="row pt-3">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-4">Student Records</h1>
                </div>
            </div>
            <div className="container py-2">
                <div className="row">
                    <div className="col-lg-10 mx-auto bg-white rounded shadow">
                        <div className="row text-black mx-auto">
                            {/* SEARCH BAR */}
                            <div className="col-5 mt-3 mb-2">
                                <div className="input-group">
                                    <span className="input-group-text rounded-1" id="basic-addon1"><img id="searchicon" src={searchIcon} alt="Search Icon" /></span>
                                    <input value={searchTerm} onChange={handleSearch} type="text" className="form-control rounded-1" placeholder="Search" />
                                </div>
                            </div>
                            <div className="col-7 d-flex justify-content-end mt-3 mb-2">
                                <EditUserButton /> {/* THIS SHOULD GO TO "/list/edit" */}
                            </div>

                        </div>
                        {/* TABLE */}
                        <div className="table-responsive">
                            <table className="table table-fixed">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-1">ID</th>
                                        <th scope="col" className="col-2">First</th>
                                        <th scope="col" className="col-2">Last</th>
                                        <th scope="col" className="col-1">Prelims</th>
                                        <th scope="col" className="col-2">Midterms</th>
                                        <th scope="col" className="col-1">Finals</th>
                                        <th scope="col" className="col-3">Final Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, key) => (
                                        <tr key={key}>
                                            <td className="col-1">{user.id}</td>
                                            <td className="col-2" >{user.firstname}</td>
                                            <td className="col-2">{user.lastname}</td>
                                            <td className="col-1">{user.prelim}</td>
                                            <td className="col-2">{user.midterm}</td>
                                            <td className="col-1">{user.finals}</td>
                                            <td className="col-3">{user.final_grade}</td>
                                        </tr>
                                    ))};
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center mt-1 pb-2">
                <AddUserButton />
            </div>
            <div className="container text-center mt-1 pb-2">
                <Button1 /> <Button2 /> <Button3 /> <Button4 />
            </div>
        </div>
    );
}