import React from "react"
import Header from './Header'
const axios = require('axios');

class AdmPanel extends React.Component {
  constructor(){
    super();
    this.state = {
      doctors: [],
      specialties: []
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
    axios.get('/specialties')
      .then(function (response) {
        if (response.status == 200)
          context.setState({ specialties: response.data })
        console.log(response)
      });
  }
  render () {
    return (
      <div className="container">
        <Header/>
        <div className="mt-5">
          <h1>Doctors <button type="button" className="btn btn-primary btn-sm m-0 p-1 ml-2">+ New Doctor</button></h1>
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
                      <button type="button" className="btn btn-secondary btn-sm m-0 p-0 mr-2" href={"#edit-doctor-" + doctor.id} data-toggle="modal">Edit</button>
                      <button type="button" className="btn btn-danger btn-sm m-0 p-0">Destroy</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {this.state.doctors.map(function (doctor) {
            return (
              <div key={doctor.id} className="doctor-modals">
                <div className="modal fade" id={"edit-doctor-" + doctor.id} tabIndex="-1" role="dialog" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" >Edit Doctor - {doctor.id}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label>Name</label>
                              <input type="email" className="form-control" placeholder="Name" name="doctor[name]" defaultValue={doctor.name} />
                            </div>
                            <div className="form-group col-md-6">
                              <label>CRM</label>
                              <input type="text" className="form-control" placeholder="CRM" name="doctor[crm]" defaultValue={doctor.crm} />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Phone</label>
                              <input type="text" className="form-control" placeholder="Phone" name="doctor[phone]" defaultValue={doctor.crm} />
                            </div>
                            <div className="form-group col-md-6">
                              <label>Specialties</label>
                              <select className="form-control">
                                {this.state.specialties.map(function(specialty){
                                  return (<option key={specialty.id} value={specialty.id}>{specialty.name}</option>)
                                })}
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }.bind(this))}
        </div>
      </div>
    );
  }
}

export default AdmPanel
