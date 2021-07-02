import React from "react";
import {
  groupsMock,
  coursesMock,
  allGroupsMock,
  allCoursesMock,
  deletedGroupsMock,
  deletedCoursesMock
} from './mockedData.js';

const useStates = {
  groups: {
    groups: groupsMock || 0,
    setGroups: jest.fn()
  },
  courses: {
    courses: coursesMock || 0,
    setCourses: jest.fn()
  },
  groupInput: {
    groupInput: 'Type name of a group',
    setGroupInputValue: jest.fn()
  },
  courseInput: {
    courseInput: 'Type name of a course',
    setCourseInputValue: jest.fn()
  },
  errorGroup: {
    mentorInput: null,
    setErrorGroup: jest.fn()
  },
  errorCourse: {
    btnSave: null,
    setErrorCourse: jest.fn()
  },
  toShowModal: {
    toShowModal: false,
    setShowModal: jest.fn()
  },
  formIsChanged: {
    formIsChanged: false,
    setFormIsChanged: jest.fn()
  }
};

const useStateMock = {
  default: jest.fn()
    .mockReturnValueOnce([useStates.groups.groups, useStates.groups.setGroups])
    .mockReturnValueOnce([useStates.courses.courses, useStates.courses.setCourses])
    .mockReturnValueOnce([useStates.groupInput.groupInput, useStates.groupInput.setGroupInputValue])
    .mockReturnValueOnce([useStates.courseInput.courseInput, useStates.courseInput.setCourseInputValue])
    .mockReturnValueOnce([useStates.errorGroup.errorGroup, useStates.errorGroup.setErrorGroup])
    .mockReturnValueOnce([useStates.errorCourse.errorCourse, useStates.errorCourse.setErrorCourse])
    .mockReturnValueOnce([useStates.toShowModal.toShowModal, useStates.toShowModal.setShowModal])
    .mockReturnValueOnce([useStates.formIsChanged.formIsChanged, useStates.formIsChanged.setFormIsChanged]),
  setGroupAdd: jest.fn()
    .mockReturnValueOnce([useStates.groups.groups, useStates.groups.setGroups])
    .mockReturnValueOnce([useStates.courses.courses, useStates.courses.setCourses])
    .mockReturnValueOnce([allGroupsMock[0].name, useStates.groupInput.setGroupInputValue])
    .mockReturnValueOnce([useStates.courseInput.courseInput, useStates.courseInput.setCourseInputValue])
    .mockReturnValueOnce(['', useStates.errorGroup.setErrorGroup])
    .mockReturnValueOnce([useStates.errorCourse.errorCourse, useStates.errorCourse.setErrorCourse])
    .mockReturnValueOnce([useStates.toShowModal.toShowModal, useStates.toShowModal.setShowModal])
    .mockReturnValueOnce([true, useStates.formIsChanged.setFormIsChanged]),
  setCourseAdd: jest.fn()
    .mockReturnValueOnce([useStates.groups.groups, useStates.groups.setGroups])
    .mockReturnValueOnce([useStates.courses.courses, useStates.courses.setCourses])
    .mockReturnValueOnce([useStates.groupInput.groupInput, useStates.groupInput.setGroupInputValue])
    .mockReturnValueOnce([allCoursesMock[0].name, useStates.courseInput.setCourseInputValue])
    .mockReturnValueOnce([useStates.errorGroup.errorGroup, useStates.errorGroup.setErrorGroup])
    .mockReturnValueOnce([useStates.errorCourse.errorCourse, useStates.errorCourse.setErrorCourse])
    .mockReturnValueOnce([useStates.toShowModal.toShowModal, useStates.toShowModal.setShowModal])
    .mockReturnValueOnce([true, useStates.formIsChanged.setFormIsChanged]),
  setSubmit: jest.fn()
    .mockReturnValueOnce([groupsMock, useStates.groups.setGroups])
    .mockReturnValueOnce([coursesMock, useStates.courses.setCourses])
    .mockReturnValueOnce([useStates.groupInput.groupInput, useStates.groupInput.setGroupInputValue])
    .mockReturnValueOnce([useStates.courseInput.courseInput, useStates.courseInput.setCourseInputValue])
    .mockReturnValueOnce([useStates.errorGroup.errorGroup, useStates.errorGroup.setErrorGroup])
    .mockReturnValueOnce([useStates.errorCourse.errorCourse, useStates.errorCourse.setErrorCourse])
    .mockReturnValueOnce([useStates.toShowModal.toShowModal, useStates.toShowModal.setShowModal])
    .mockReturnValueOnce([true, useStates.formIsChanged.setFormIsChanged]),
  setGroupDelete: jest.fn()
    .mockReturnValueOnce([deletedGroupsMock, useStates.groups.setGroups])
    .mockReturnValueOnce([useStates.courses.courses, useStates.courses.setCourses])
    .mockReturnValueOnce([useStates.groupInput.groupInput, useStates.groupInput.setGroupInputValue])
    .mockReturnValueOnce([useStates.courseInput.courseInput, useStates.courseInput.setCourseInputValue])
    .mockReturnValueOnce([useStates.errorGroup.errorGroup, useStates.errorGroup.setErrorGroup])
    .mockReturnValueOnce([useStates.errorCourse.errorCourse, useStates.errorCourse.setErrorCourse])
    .mockReturnValueOnce([useStates.toShowModal.toShowModal, useStates.toShowModal.setShowModal])
    .mockReturnValueOnce([true, useStates.formIsChanged.setFormIsChanged]),
  setCourseDelete: jest.fn()
    .mockReturnValueOnce([useStates.groups.groups, useStates.groups.setGroups])
    .mockReturnValueOnce([deletedCoursesMock, useStates.courses.setCourses])
    .mockReturnValueOnce([useStates.groupInput.groupInput, useStates.groupInput.setGroupInputValue])
    .mockReturnValueOnce([useStates.courseInput.courseInput, useStates.courseInput.setCourseInputValue])
    .mockReturnValueOnce([useStates.errorGroup.errorGroup, useStates.errorGroup.setErrorGroup])
    .mockReturnValueOnce([useStates.errorCourse.errorCourse, useStates.errorCourse.setErrorCourse])
    .mockReturnValueOnce([useStates.toShowModal.toShowModal, useStates.toShowModal.setShowModal])
    .mockReturnValueOnce([true, useStates.formIsChanged.setFormIsChanged]),
};

export { useStates, useStateMock };