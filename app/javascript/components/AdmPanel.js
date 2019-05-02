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
    this.loadDoctorsAndSpecialties = this.loadDoctorsAndSpecialties.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.destroyDoctor = this.destroyDoctor.bind(this);
  }
  componentDidMount(){
    this.loadDoctorsAndSpecialties();
  }
  componentDidUpdate() {
    $("select").selectpicker()
  }
  loadDoctorsAndSpecialties(){
    let context = this;
    axios.get('/specialties')
      .then(function (response) {
        if (response.status == 200) {
          context.setState({ specialties: response.data })
          axios.get('/doctors')
            .then(function (response) {
              if (response.status == 200)
                context.setState({ doctors: response.data })
            });
        }
      });
  }
  submitForm(e){
    e.preventDefault();
    let context = this;
    let target = $(e.target);
    let form = target.parents("form")
    let specialty_ids =  form.find('select[name="doctor[specialty_ids]"]').val();
    specialty_ids = specialty_ids.map(function(e){return parseInt(e)});
    let data = {
      doctor: {
        name: form.find('input[name="doctor[name]"]').val(),
        crm: form.find('input[name="doctor[crm]"]').val(),
        phone: form.find('input[name="doctor[phone]"]').val(),
        specialty_ids: specialty_ids
      }
    }
    if(form.attr("method")=="post"){
      axios.post('/doctors', data, { responseType: 'json' })
        .then(function (response) {
          context.loadDoctorsAndSpecialties();
          form.parents(".modal").modal("hide")
        }).catch(function(error){
          alert(error.response.data.join(", "))
        })
    }
    else if(form.attr("method") == "put"){
      data.doctor.id = form.find('input[name="doctor[id]"]').val()
      axios.put('/doctors/' + form.attr("data-id"), data, { responseType: 'json' })
        .then(function (response) {
          context.loadDoctorsAndSpecialties()
          form.parents(".modal").modal("hide")
        }).catch(function (error) {
          alert(error.response.data.join(", "))
        })
    }

  }
  destroyDoctor(e){
    e.preventDefault();
    let target = $(e.target);
    let doctor_id = target.parents("tr").attr("data-id")
    let context = this;
    if (confirm('Do you really want to destroy Doctor "' + doctor_id + '"?')){
      axios.delete('/doctors/' + doctor_id)
        .then(function (response) {
          context.loadDoctorsAndSpecialties()
        })
    }
    
  }
  render () {
    return (
      <div className="container">
        <Header/>
        <div className="mt-5">
          <h1>Doctors <button type="button" href="#new-doctor" data-toggle="modal" className="btn btn-primary btn-sm m-0 p-1 ml-2">+ New Doctor</button></h1>
          <div className="modal fade" id="new-doctor" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" >New Doctor</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form method="post">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Name" name="doctor[name]" />
                      </div>
                      <div className="form-group col-md-6">
                        <label>CRM</label>
                        <input type="text" className="form-control" placeholder="CRM" name="doctor[crm]"  />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone" name="doctor[phone]" />
                      </div>
                      <div className="form-group col-md-6">
                        <label>Specialties</label>
                        <select data-id="new-doctor-specialties" className="form-control" multiple data-live-search="true" name="doctor[specialty_ids]" >
                          {this.state.specialties.map(function (specialty) {
                            return (<option key={specialty.id} value={specialty.id}>{specialty.name}</option>)
                          })}
                        </select>
                      </div>
                      <div className="col-md-12">
                        <div className="row justify-content-center">
                          <button className="btn btn-primary " type="submit" onClick={this.submitForm}> Send</button>
                        </div>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
                  <tr key={doctor.id} data-id={doctor.id}>
                    <th scope="row" >{doctor.id}</th>
                    <td>{doctor.name}</td>
                    <td>{doctor.crm}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.described_specialties}</td>
                    <td>
                      <button type="button" className="btn btn-secondary btn-sm m-0 p-0 mr-2" href={"#edit-doctor-" + doctor.id} data-toggle="modal">Edit</button>
                      <a className="btn btn-danger btn-sm m-0 p-0" href={"/doctors/" + doctor.id} onClick={this.destroyDoctor}>Destroy</a>
                    </td>
                  </tr>
                );
              }.bind(this))}
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
                        <form data-id={doctor.id} method="put">
                          <div className="form-row">
                            <input type="text" className="form-control" name="doctor[id]" value={doctor.id} readOnly hidden/>
                            <div className="form-group col-md-6">
                              <label>Name</label>
                              <input type="text" className="form-control" placeholder="Name" name="doctor[name]" defaultValue={doctor.name} />
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
                              <select data-id={doctor.id} className="form-control" multiple defaultValue={doctor.specialty_ids} data-live-search="true" name="doctor[specialty_ids]" >
                                {this.state.specialties.map(function(specialty){
                                  return (<option key={specialty.id} value={specialty.id}>{specialty.name}</option>)
                                })}
                              </select>
                            </div>
                            <div className="col-md-12">
                              <div className="row justify-content-center">  
                                <button className="btn btn-primary " type="submit" onClick={this.submitForm}> Send</button>
                              </div>
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
