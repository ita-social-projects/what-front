import React from 'react';

export const EditGroup = () => {
  const courses = [
    { id: 0, name: 'WebUI' },
    { id: 1, name: 'Java' },
    { id: 2, name: '.Net' },
    { id: 3, name: 'Kotlin' },
  ];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 card shadow">
          <form className="px-2 py-4 " name="start-group">
            <h3>Group Editing</h3>
            <hr />
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <label className="mb-0" htmlFor="name">Group name</label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  name="group-name"
                  id="name"
                  required
                  placeholder="group name"
                  defaultValue="Current name"/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <label className="mb-0" htmlFor="course">Course</label>
              </div>
              <div className="col-md-8">
                <select className="custom-select" name="group-course" id="course" required>
                  { courses.map(({ id, name }) => <option value={id}>{name}</option>) }
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <label className="mb-0" htmlFor="start-date">Start date</label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="date"
                  name="start-date"
                  id="start-date"
                  required
                  defaultValue={'2020-10-08'}/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <label className="mb-0" htmlFor="finish-date">Finish date</label>
              </div>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="date"
                  name="end-date"
                  id="finish-date"
                  required
                  defaultValue={'2020-11-21'}/>
              </div>
            </div>
            <div className="row justify-content-around mt-4">
              <input type="reset" name="reset-btn" className="btn btn-danger w-25" value="Clear all" />
              <input type="submit" name="submit-btn" className="btn btn-success w-25" value="Confirm" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};
