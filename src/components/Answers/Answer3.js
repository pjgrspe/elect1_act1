import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Answer3() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/')
            .then(function (response) {
                console.log(response.data);
                const sortedUsers = response.data.sort((a, b) => {
                    // Sort by final grade first, then by first name
                    if (a.final_grade !== b.final_grade) {
                        return b.final_grade - a.final_grade; // Descending order by final grade
                    }
                    return a.firstname.localeCompare(b.firstname); // Ascending order by first name
                });
                setUsers(sortedUsers);
                console.log(sortedUsers);
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
                            <th scope="col" className="col-2">Prelims</th>
                            <th scope="col" className="col-2">Midterms</th>
                            <th scope="col" className="col-2">Finals</th>
                            <th scope="col" className="col-1">Final Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, key) => (
                            <tr key={key}>
                                <td className="col-1">{user.id}</td>
                                <td className="col-2">{user.firstname}</td>
                                <td className="col-2">{user.lastname}</td>
                                <td className="col-2">{user.prelim}</td>
                                <td className="col-2">{user.midterm}</td>
                                <td className="col-2">{user.finals}</td>
                                <td className="col-1">{user.final_grade}</td>
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