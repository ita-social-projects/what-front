import React from 'react';
import './student-profile.css';

const arrow = (
  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </svg>
);

export const StudentProfile = () => {
  return (
    <div className="container mt-4 mb-4 border rounded bg-light">
      <h1 className="text-center pt-4 pb-4">Student Details</h1>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8"><span>{arrow} First Name: </span></div>
        <div className="col-6 col-md-4"><span>Maksym</span></div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8"><span>{arrow} Last Name: </span></div>
        <div className="col-6 col-md-4"><span>Mozdolevskyi</span></div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8"><span>{arrow} Group: </span></div>
        <div className="col-6 col-md-4"><span>My group</span></div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8"><span>{arrow} Courses: </span></div>
        <div className="col-6 col-md-4"><span>My courses</span></div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8"><span>{arrow} E-mail: </span></div>
        <div className="col-6 col-md-4"><span>My E-mail</span></div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 col-md-8"><span>{arrow} Phone number: </span></div>
        <div className="col-6 col-md-4"><span>My phone number: </span></div>
      </div>
      <hr />
    </div>
  );
}