import React, {useCallback} from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import classNames from 'classnames';

import { paths, homepages } from '@/shared';
import { currentUserSelector } from '@/models';
import {
  ListOfStudents, ListOfMentors, ListOfSecretaries,
  ListOfLessons, ListOfGroups, ListOfCourses,
  AddLesson, AddCourse, EditLesson, LessonDetails,
  UnAssignedList, Support, MyProfile, ChangePassword,
  DownloadThemes, Header, AlertBox, AllSchedules, ScheduleGroup, StartGroup, Sidebar,
  DownloadStudents, DownloadGroups, HomeworkAdd, StudentLessons, StudentLessonDetails,
} from '@/features';
import { ProtectedRoute } from '@/components';
import { CoursesTabs, GroupsTabs, MentorTabs, SecretariesTabs, StudentsTabs, HomeworkTabs } from '@/screens';
import styles from './layout.scss';

export const Layout = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);
  const lessonsListComponent = useCallback(() => currentUser.role === 1 ? <StudentLessons /> : <ListOfLessons/>, [currentUser]);
  const lessonDetailsComponent = useCallback(() => currentUser.role === 1 ? <StudentLessonDetails /> : <LessonDetails/>, [currentUser]);

  return (
    <>
      <Header />
      <AlertBox />
      <div className={classNames(styles.container)}>
        <Sidebar />
        <Switch>
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.STUDENTS} component={ListOfStudents} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.STUDENTS_DETAILS}/:id`} component={() => <StudentsTabs index={0} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.STUDENT_EDIT}/:id`} component={() => <StudentsTabs index={1} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.MENTORS} component={ListOfMentors} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.MENTORS_DETAILS}/:id`} render={() => <MentorTabs index={0} />} />
          <ProtectedRoute roles={[3, 4]} exact path={`${paths.MENTOR_EDIT}/:id`} render={() => <MentorTabs index={1} />} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.SECRETARIES} component={ListOfSecretaries} />
          <ProtectedRoute roles={[3, 4]} exact path={`${paths.SECRETARIES_DETAILS}/:id`} render={() => <SecretariesTabs index={0} />} />
          <ProtectedRoute roles={[4]} exact path={`${paths.SECRETARY_EDIT}/:id`} render={() => <SecretariesTabs index={1} />} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.LESSONS} render={lessonsListComponent} />
          <ProtectedRoute roles={[2, 4]} exact path={paths.LESSON_ADD} component={AddLesson} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={`${paths.LESSON_DETAILS}/:id`} render={lessonDetailsComponent} />
          <ProtectedRoute roles={[2, 4]} exact path={`${paths.LESSON_EDIT}/:id`} component={EditLesson} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.GROUPS} component={ListOfGroups} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.GROUP_ADD} component={StartGroup} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUPS_DETAILS}/:id`} render={() => <GroupsTabs index={0} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUP_EDIT}/:id`} render={() => <GroupsTabs index={1} />} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.COURSES} component={ListOfCourses} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.COURSE_ADD} component={AddCourse} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={`${paths.COURSE_DETAILS}/:id`} component={() => <CoursesTabs index={0} />} />
          <ProtectedRoute roles={[3, 4]} exact path={`${paths.COURSE_EDIT}/:id`} component={() => <CoursesTabs index={1} />} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.MY_PROFILE} component={MyProfile} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.SCHEDULE} component={AllSchedules} />
          <ProtectedRoute roles={[3, 4]} exact path={`${paths.SCHEDULE_BY_GROUP_ID}/:id`} component={ScheduleGroup} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.CHANGE_PASSWORD} component={ChangePassword} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.UNASSIGNED_USERS} component={UnAssignedList} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.GROUPS_DOWNLOAD} component={DownloadGroups} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.THEMES_DOWNLOAD} component={DownloadThemes} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.STUDENTS_BY_GROUP_ID} component={DownloadStudents} />
          <ProtectedRoute roles={[2]} exact path={paths.HOMEWORK_DETAILS} component={() => <HomeworkTabs index={0} />} />
          <ProtectedRoute roles={[2]} exact path={paths.HOMEWORK_EDIT} component={() => <HomeworkTabs index={1} />} />
          <ProtectedRoute roles={[2]} exact path={paths.HOMEWORK_ADD} component={() => <HomeworkAdd />} />
          <ProtectedRoute roles={[1]} exact path={paths.SUPPORT} component={Support} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.HOME} render={() => <Redirect to={homepages[currentUser.role]} />} />
          <Redirect to={paths.NOT_FOUND} />
        </Switch>
      </div>
    </>
  );
};
