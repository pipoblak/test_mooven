import React from "react"
import Header from './Header'
const axios = require('axios');

class AdmPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      doctors: []
    }
  }
  componentDidMount(){
    let context = this;
    axios.get('/doctors')
      .then(function (response) {
        if(response.status == 200)
          context.setState({doctors: response.data})
        console.log(response)
    });
  }
  render () {
    return (
      <div className="container">
        <Header/>
        <div className="mt-5">
          <h1>Doctors</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CRM</th>
                <th scope="col">Phone</th>
                <th scope="col">Specialties</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.doctors.map(function(doctor){
                return(
                  <tr key={doctor.id}>
                    <th scope="row" >{doctor.id}</th>
                    <td>{doctor.name}</td>
                    <td>{doctor.crm}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.described_specialties}</td>
                    <td>
                      <button type="button" className="btn btn-secondary btn-sm m-0 p-0 mr-2">Edit</button>
                      <button type="button" className="btn btn-danger btn-sm m-0 p-0">Destroy</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdmPanel
