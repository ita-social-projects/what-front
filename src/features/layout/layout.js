import React, { useCallback } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';

import { paths, homepages } from '@/shared';
import { currentUserSelector } from '@/models';
import {
  ListOfStudents,
  ListOfMentors,
  ListOfSecretaries,
  ListOfLessons,
  ListOfGroups,
  ListOfCourses,
  AddLesson,
  AddCourse,
  EditLesson,
  LessonDetails,
  UnAssignedList,
  Support,
  MyProfile,
  ChangePassword,
  DownloadThemes,
  Header,
  AlertBox,
  AllSchedules,
  ScheduleGroup,
  StartGroup,
  Sidebar,
  DownloadStudents,
  DownloadGroups,
  HomeworkAdd,
  StudentLessons,
  StudentLessonDetails,
  AddSchedule,
} from '@/features';
import { ProtectedRoute } from '@/components';
import {
  CoursesTabs,
  GroupsTabs,
  MentorTabs,
  SecretariesTabs,
  StudentsTabs,
  HomeworkTabs,
} from '@/screens';
import styles from './layout.scss';
import { STUD, MENTOR, ADMIN, SCRTARY } from './roles';
import { ListOfHomework } from '../homework/list-of-homework';

export const Layout = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const lessonsListComponent = useCallback(
    () => (currentUser.role === STUD ? <StudentLessons /> : <ListOfLessons />),
    [currentUser]
  );
  const lessonDetailsComponent = useCallback(
    () =>
      currentUser.role === STUD ? <StudentLessonDetails /> : <LessonDetails />,
    [currentUser]
  );

  return (
    <>
      <Header />
      <AlertBox />
      <div className={classNames(styles.container)}>
        <Sidebar />
        <Switch>
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.STUDENTS}
            component={ListOfStudents}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.STUDENTS_DETAILS}/:id`}
            component={() => <StudentsTabs index={0} />}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.STUDENT_EDIT}/:id`}
            component={() => <StudentsTabs index={1} />}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.MENTORS}
            component={ListOfMentors}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.MENTORS_DETAILS}/:id`}
            render={() => <MentorTabs index={0} />}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={`${paths.MENTOR_EDIT}/:id`}
            render={() => <MentorTabs index={1} />}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={paths.SECRETARIES}
            component={ListOfSecretaries}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={`${paths.SECRETARIES_DETAILS}/:id`}
            render={() => <SecretariesTabs index={0} />}
          />
          <ProtectedRoute
            roles={[ADMIN]}
            exact
            path={`${paths.SECRETARY_EDIT}/:id`}
            render={() => <SecretariesTabs index={1} />}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.LESSONS}
            render={lessonsListComponent}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN]}
            exact
            path={paths.LESSON_ADD}
            component={AddLesson}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.LESSON_DETAILS}/:id`}
            render={lessonDetailsComponent}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN]}
            exact
            path={`${paths.LESSON_EDIT}/:id`}
            component={EditLesson}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.GROUPS}
            component={ListOfGroups}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.GROUP_ADD}
            component={StartGroup}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.GROUPS_DETAILS}/:id`}
            render={() => <GroupsTabs index={0} />}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.GROUP_EDIT}/:id`}
            render={() => <GroupsTabs index={1} />}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.COURSES}
            component={ListOfCourses}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={paths.COURSE_ADD}
            component={AddCourse}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={`${paths.COURSE_DETAILS}/:id`}
            component={() => <CoursesTabs index={0} />}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={`${paths.COURSE_EDIT}/:id`}
            component={() => <CoursesTabs index={1} />}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.MY_PROFILE}
            component={MyProfile}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={paths.SCHEDULE}
            component={AllSchedules}
          />
           <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact path={paths.SCHEDULE_ADD}
            component={AddSchedule}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={`${paths.SCHEDULE_BY_GROUP_ID}/:id`}
            component={ScheduleGroup}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.CHANGE_PASSWORD}
            component={ChangePassword}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={paths.UNASSIGNED_USERS}
            component={UnAssignedList}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={paths.GROUPS_DOWNLOAD}
            component={DownloadGroups}
          />
          <ProtectedRoute
            roles={[MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.THEMES_DOWNLOAD}
            component={DownloadThemes}
          />
          <ProtectedRoute
            roles={[ADMIN, SCRTARY]}
            exact
            path={paths.STUDENTS_BY_GROUP_ID}
            component={DownloadStudents}
          />
          <ProtectedRoute
            roles={[MENTOR]}
            exact
            path={paths.HOMEWORK_DETAILS}
            component={() => <HomeworkTabs index={0} />}
          />
          <ProtectedRoute
            roles={[MENTOR]}
            exact
            path={paths.HOMEWORK_EDIT}
            component={() => <HomeworkTabs index={1} />}
          />
          <ProtectedRoute
            roles={[MENTOR]}
            exact
            path={paths.HOMEWORK_ADD}
            component={() => <HomeworkAdd />}
          />
          <ProtectedRoute
            roles={[STUD]}
            exact
            path={paths.SUPPORT}
            component={Support}
          />
          <ProtectedRoute
            roles={[STUD, MENTOR, ADMIN, SCRTARY]}
            exact
            path={paths.HOME}
            render={() => <Redirect to={homepages[currentUser.role]} />}
          />
          <Redirect to={paths.NOT_FOUND} />
        </Switch>
      </div>
    </>
  );
};
