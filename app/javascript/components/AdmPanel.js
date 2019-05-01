import React from "react"
import Header from './Header'
class AdmPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      doctors: []
    }
  }
  componentDidMount(){

  }
  render () {
    return (
      <div class="container">
        <Header/>
        <div className="mt-5">
          <h1>Doctors</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">CRM</th>
                <th scope="col">Phone</th>
                <th scope="col">Specialties</th>
              </tr>
            </thead>
            <tbody>
              {this.state.doctors.map(function(doctor){
                return(
                  <tr>
                    <th scope="row">{doctor.id}</th>
                    <td>{doctor.name}</td>
                    <td>{doctor.crm}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.specialties}</td>
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
