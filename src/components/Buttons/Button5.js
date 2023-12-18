import React, { Component } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

const getUsers = () => {
  return axios.get('http://localhost:80/api/users/').then(res => res.data);
}

const headers = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Prelims", key: "prelim" },
  { label: "Midterms", key: "midterm" },
  { label: "Finals", key: "finals" },
  { label: "Final Grade", key: "final_grade" }
];
 
class AsyncCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }
 
  downloadReport = async () => {
    const data = await getUsers();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }
 
  render() {
    const { data } = this.state;
 
    return (
      <div>
        <input type="button" value="Export to CSV" onClick={this.downloadReport} />
        <CSVLink
          headers={headers}
          filename="Student_Records.csv"
          data={data}
          ref={this.csvLinkEl}
        />
      </div>
    );
  }
}
 
export default AsyncCSV;