import React from "react"
class Header extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand ">ADM Panel</span>
        <form className="form-inline mb-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search Doctor" aria-label="Search Doctor"></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default Header
