import React from "react"
const axios = require('axios');
class Header extends React.Component {
  constructor(){
    super();
    this.searchDoctor = this.searchDoctor.bind(this)
  }
  searchDoctor(e){
    let target = $(e.target).siblings("input");
    let context = this.props.panelContext;
    if(target.val().trim().length>0){
      axios.get('/doctors/search', { params: {term: target.val()}})
        .then(function (response) {
          if (response.status == 200)
            context.setState({ doctors: response.data })
        });
    }else{
      context.loadDoctorsAndSpecialties();
    }
  }
  render () {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand "></span>
        <form className="form-inline mb-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search Doctor" aria-label="Search Doctor"></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.searchDoctor}>Search</button>
        </form>
      </nav>
    );
  }
}

export default Header
