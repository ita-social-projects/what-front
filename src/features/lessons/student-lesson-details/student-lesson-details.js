import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { paths, useActions } from '@/shared';
import { shallowEqual, useSelector } from 'react-redux';
import {
    fetchMentors,
    loadStudentGroupById,
    loadStudentGroupByIdSelector,
    fetchLessonById,
    lessonByIdSelector, studentLessonsSelector
} from '@/models';
import {commonHelpers} from "@/utils";
import { Badge } from 'react-bootstrap';
import { WithLoading } from '@/components';
import classNames from 'classnames';
import styles from './student-lesson-details.scss';


export const StudentLessonDetails = () => {
    const history = useHistory();
    const { id } = useParams();

    const [studentsGroup, setStudentsGroup] = useState({});
    const [lessonData, setLessonData] = useState('');
    const { data, isLoading } = useSelector(studentLessonsSelector, shallowEqual);

    // const {
    //     data: lesson,
    //     isLoading: lessonIsLoading,
    //     isLoaded: lessonIsLoaded
    // } = useSelector(lessonByIdSelector, shallowEqual);

    const {
        data: group,
        isLoading: groupIsLoading,
        isLoaded: groupIsLoaded,
    } = useSelector(loadStudentGroupByIdSelector, shallowEqual);

    const [
        loadLessonById,
        loadMentors,
        loadGroupById ] = useActions([fetchLessonById, loadStudentGroupById]);

    useEffect(() => {
        if(!data) loadLessonById();
        if(!groupIsLoaded) loadGroupById(id);
    }, [data, groupIsLoaded]);

    // console.log(lesson);

    useEffect(() => {
        if (lessonIsLoaded && groupIsLoaded) {
            // if (!lesson) {
            //     history.push(paths.NOT_FOUND);
            // } else {
                setStudentsGroup(group.name);
                const {date, time} = commonHelpers.transformDateTime({dateTime: data.lessonDate});
                const lessonsData = {
                    lessonShortDate: date,
                    lessonTime: time,
                    group: studentsGroup,
                    ...data,
                };
                setLessonData(lessonsData);
            }
        // }
    }, [data]);


    const handleCancel = useCallback(() => {
        history.push(`${paths.LESSON_BY_STUDENT_ID}/${id}`)
    }, [history]);

    return (
        <div className="container">
            <h1>HELLO</h1>
            <div className={classNames(styles.page, 'mx-auto', 'col-12')}>
                <div className="d-flex flex-row">
                    <WithLoading
                        isLoading={lessonIsLoading || groupIsLoading
                        || !lesson }
                        className={styles['loader-centered']}
                    >
                        <div className="col-6">
                            <h3>Lesson details</h3>
                            <hr />
                            <div className="d-flex flex-row w-100">
                                <div className="col-12">
                                    <div className="mt-3 mb-4 row">
                                        <div className="col-sm-6 font-weight-bolder"><span>Lesson Theme: </span></div>
                                        <div className="col-sm-6"><span>{lessonData.themeName}</span></div>
                                    </div>
                                    {/*<div className="row mb-4">*/}
                                    {/*    <div className="col-sm-6 font-weight-bolder d-flex align-items-center">*/}
                                    {/*        <span>Mentor name: </span>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-sm-6 lead">*/}
                                    {/*        <Badge pill className={styles.bg_colour}>*/}
                                    {/*            <Link*/}
                                    {/*                to={`${paths.MENTORS_DETAILS}/${mentor.id}`}*/}
                                    {/*                className="text-decoration-none text-white"*/}
                                    {/*            >{`${mentor.firstName} ${mentor.lastName}`}*/}
                                    {/*            </Link>*/}
                                    {/*        </Badge>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row mb-4">
                                        <div className="col-sm-6 font-weight-bolder d-flex align-items-center">
                                            <span>Group name: </span>
                                        </div>
                                        <div className="col-sm-6 lead">
                                            <Badge pill className={styles.bg_colour}>
                                                <Link
                                                    to={`${paths.GROUPS_DETAILS}/${studentsGroup?.id}`}
                                                    className="text-decoration-none text-white"
                                                >{studentsGroup?.name}
                                                </Link>
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-sm-6 font-weight-bolder">
                                            <span>Lesson Date: </span>
                                        </div>
                                        <div className="col-sm-6">
                                            {lessonData.lessonShortDate}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 font-weight-bolder">
                                            <span>Lesson Time: </span>
                                        </div>
                                        <div className="col-sm-6">
                                            {lessonData.lessonTime}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    {/*<table className="table table-bordered table-hover">*/}
                                    {/*    <thead>*/}
                                    {/*    <tr>*/}
                                    {/*        <th scope="col" aria-label="first_col" />*/}
                                    {/*        <th scope="col">Full Student`s Name</th>*/}
                                    {/*        <th scope="col" className="text-center">Mark</th>*/}
                                    {/*        <th scope="col" className="text-center">Presence</th>*/}
                                    {/*    </tr>*/}
                                    {/*    </thead>*/}
                                    {/*    <tbody>*/}
                                    {/*    </tbody>*/}
                                    {/*</table>*/}
                                </div>
                            </div>
                        </div>
                    </WithLoading>
                </div>
                <div className="col-12 mt-3">
                    <button
                        form="form"
                        type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={handleCancel}
                    >Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
