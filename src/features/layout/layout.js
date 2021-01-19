import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

import { paths, homepages } from '@/shared';
import { currentUserSelector } from '@/models';
import {
  ListOfStudents, ListOfMentors, ListOfSecretaries,
  ListOfLessons, ListOfGroups, ListOfCourses,
  AddLesson, AddCourse, EditLesson, LessonDetails,
  UnAssignedList, Support, MyProfile, ChangePassword,
  Header, Schedule, AlertBox, Sidebar
} from '@/features';
import { ProtectedRoute } from '@/components';
import { CoursesTabs, GroupsTabs, MentorTabs, SecretariesTabs, StudentsTabs } from '@/screens';

export const Layout = () => {
  const { currentUser } = useSelector(currentUserSelector, shallowEqual);

  return (
    <>
      <Header />
      <Sidebar />
      <AlertBox />
      <div className="pt-5 position-relative">
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
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.LESSONS} component={ListOfLessons} />
          <ProtectedRoute roles={[2, 4]} exact path={paths.LESSON_ADD} component={AddLesson} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.LESSON_DETAILS}/:id`} component={LessonDetails} />
          <ProtectedRoute roles={[2, 4]} exact path={`${paths.LESSON_EDIT}/:id`} component={EditLesson} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={paths.GROUPS} component={ListOfGroups} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUPS_DETAILS}/:id`} render={() => <GroupsTabs index={0} />} />
          <ProtectedRoute roles={[2, 3, 4]} exact path={`${paths.GROUP_EDIT}/:id`} render={() => <GroupsTabs index={1} />} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.COURSES} component={ListOfCourses} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.COURSE_ADD} component={AddCourse} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={`${paths.COURSE_DETAILS}/:id`} component={() => <CoursesTabs index={0} />} />
          <ProtectedRoute roles={[3, 4]} exact path={`${paths.COURSE_EDIT}/:id`} component={() => <CoursesTabs index={1} />} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.MY_PROFILE} component={MyProfile} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.SCHEDULE} component={Schedule} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.CHANGE_PASSWORD} component={ChangePassword} />
          <ProtectedRoute roles={[3, 4]} exact path={paths.UNASSIGNED_USERS} component={UnAssignedList} />
          <ProtectedRoute roles={[1]} exact path={paths.SUPPORT} component={Support} />
          <ProtectedRoute roles={[1, 2, 3, 4]} exact path={paths.HOME} render={() => <Redirect to={homepages[currentUser.role]} />} />
          <Redirect to={paths.NOT_FOUND} />
        </Switch>
      </div>
    </>
  );
};
