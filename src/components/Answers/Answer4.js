import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Answer4() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/')
            .then(function (response) {
                console.log(response.data);
                const filteredUsers = response.data.filter(user => user.final_grade >= 87);
                setUsers(filteredUsers);
                console.log(filteredUsers);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
    return (
        <div className="table-responsive">
            {users.length > 0 ? (
                <table className="table table-fixed-1">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">ID</th>
                            <th scope="col" className="col-2">First</th>
                            <th scope="col" className="col-2">Last</th>
                            <th scope="col" className="col-1">Prelims</th>
                            <th scope="col" className="col-1">Midterms</th>
                            <th scope="col" className="col-1">Finals</th>
                            <th scope="col" className="col-2">Final Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, key) => (
                            <tr key={key}>
                                <td className="col-1">{user.id}</td>
                                <td className="col-2">{user.firstname}</td>
                                <td className="col-2">{user.lastname}</td>
                                <td className="col-1">{user.prelim}</td>
                                <td className="col-1">{user.midterm}</td>
                                <td className="col-1">{user.finals}</td>
                                <td className="col-2">{user.final_grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h4 className='text-center'>No data matched.</h4>
            )}
        </div>
    );
}