import React from 'react';

const dot = (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dot" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  </svg>
);


export const StudentProfile = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12 py-4 px-4 card shadow">
          <h1>Student Details</h1>
          <hr />
          <div className="row lead">
            <div className="col-12 col-md-6 font-weight-bold"><span>{dot} First name: </span></div>
            <div className="col-6 col-md-6"><span>Name</span></div>
          </div>
          <hr />
          <div className="row lead">
            <div className="col-12 col-md-6 font-weight-bold"><span>{dot} Last name: </span></div>
            <div className="col-6 col-md-6"><span>Surname</span></div>
          </div>
          <hr />
          <div className="row lead">
            <div className="col-12 col-md-6 font-weight-bold"><span>{dot} Group: </span></div>
            <div className="col-6 col-md-6"><span>My group</span></div>
          </div>
          <hr />
          <div className="row lead">
            <div className="col-12 col-md-6 font-weight-bold"><span>{dot} Courses: </span></div>
            <div className="col-6 col-md-6"><span>My courses</span></div>
          </div>
          <hr />
          <div className="row lead">
            <div className="col-12 col-md-6 font-weight-bold"><span>{dot} E-mail: </span></div>
            <div className="col-6 col-md-6"><span>My E-mail</span></div>
          </div>
          <hr />
          <div className="row lead">
            <div className="col-12 col-md-6 font-weight-bold"><span>{dot} Phone number: </span></div>
            <div className="col-6 col-md-6"><span>My phone number </span></div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}