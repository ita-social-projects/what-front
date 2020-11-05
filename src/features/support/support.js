import React from 'react';

export const Support = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card shadow col-md-6 col-sm-8">
                    <form className="form m-3">
                        <div className="form-group">
                            <label htmlFor="emailTitle"
                                   className="font-weight-bold">Title</label>
                            <input type="text"
                                   className="form-control"
                                   id="emailTitle"
                                   placeholder="Input title"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailBody"
                                   className="font-weight-bold">Text</label>
                            <textarea className="form-control"
                                      id="emailBody"
                                      placeholder="Input email text"
                                      rows="7"
                                      cols="50"/>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Send</button>
                        <button type="cancel" className="btn btn-danger">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
        );
};
