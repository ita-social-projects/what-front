import React, { useEffect } from 'react';
import { number } from 'prop-types';
import { Badge, Table } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useActions } from '../../shared/index.js';
import { WithLoading } from '../../components/index.js';
import {
  mentorsSelector, mentorsActiveSelector, mentorGroupsSelector, mentorCoursesSelector, fetchMentorGroups,
  fetchMentorCourses, fetchGroups, groupsSelector, fetchCourses,
  coursesSelector
} from '../../models/index.js';
import styles from './group-details.scss';

