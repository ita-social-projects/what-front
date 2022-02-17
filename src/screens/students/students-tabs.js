import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import {
  globalLoadStudentGroups,
  loadStudentById,
  loadStudentGroups,
  fetchLessonsByStudentId,
} from '@/models';
import { Link } from 'react-router-dom';

export const StudentsTabs = ({ index }) => {
  const { id } = useParams();

  const [
    fetchStudentById,
    fetchGroups,
    fetchStudentGroups,
    fetchStudentLessons,
  ] = useActions([
    loadStudentById,
    globalLoadStudentGroups,
    loadStudentGroups,
    fetchLessonsByStudentId,
  ]);

  useEffect(() => {
    fetchStudentById(id);
    fetchGroups();
    fetchStudentGroups(id);
    fetchStudentLessons(id);
  }, [
    fetchGroups,
    fetchStudentById,
    fetchStudentGroups,
    fetchStudentLessons,
    id,
  ]);

  const arrow = (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-left"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
      />
    </svg>
  );

  return (
    <section
      defaultIndex={index}
      className="container w-50 pt-5"
      linkBack="/students"
    >
      <Link
        className="nav-item nav-link d-flex align-items-center"
        to={{
          pathname: '/students',
        }}
      >
        {arrow}
      </Link>
      <StudentDetails />
    </section>
  );
};
