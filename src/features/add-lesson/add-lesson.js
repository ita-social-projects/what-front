import React from 'react';
import styles from './add-lesson.module.scss';


export const AddLesson = () => {
    
    return (
        <div className={`container  ${styles.page}`}>
            <div className="row">
                <form id='form'>
                    <div className="col-lg-6">
                        <h3>Lesson's starting</h3>
                        <hr />
                        <form>
                            <div className="mt-5 form-group row">
                                <label htmlFor="inputLessonTheme" className="col-sm-4 col-form-label">Lesson Theme:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="inputLessonTheme" placeholder="Lesson Theme" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputGroupName" className="col-sm-4 col-form-label">Group Name:</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="inputGroupName" placeholder="Group Name" required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label" htmlFor="choose-date/time">Choose date / time:</label>
                                <div className="col-md-8">
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="choose-date/time"
                                        id="choose-date/time"
                                        required
                                        defaultValue={'2020-09-05'}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Full Student's Name</th>
                                <th scope="col" className='text-center'>Mark</th>
                                <th scope="col" className='text-center'>Presence</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">8</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">9</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">10</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">11</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            <tr>
                                <th scope="row">12</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2' required/></td>
                                <td><input className={`${styles.align}`} type="checkbox"/></td>
                            </tr>
                            <tr>
                                <th scope="row">13</th>
                                <td><a href="#">Taras Tarasov</a></td>
                                <td><input className={`${styles.align}`} type="number" max='5' min='2'/></td>
                                <td><input className={`${styles.align}`} type="checkbox" required/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
               
            </div>
            <div className={`${styles.display}`}>
                <button form="form" type="button" className="btn btn-secondary mx-5 btn-lg">Cancel</button>
                <button form="form" type="button" className="btn btn-success btn-lg">Save</button>
            </div>
        </div>
    )
};