import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { paths } from '@/shared';
import { useSelector } from 'react-redux';

import {
  mockCurrentStudentSelector,
  mockLoadStudentsGroupSelector,
  mockCurrentStudentGroupsSelector,
} from './mock-data.js';

import { EditStudentsDetails } from '../edit-students-details.js';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));
jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

describe('edit-student-details component', () => {
  let historyMock;

  describe('loader', () => {
    beforeEach(() => {
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
    });

    it('should show loader while isStudentLoading is true', () => {
      const mockLocalCurrentStudentSelector = { ...mockCurrentStudentSelector, isLoading: true };
      useSelector
        .mockReturnValueOnce(mockLocalCurrentStudentSelector)
        .mockReturnValueOnce(mockLoadStudentsGroupSelector)
        .mockReturnValueOnce(mockCurrentStudentGroupsSelector);
      const { container } = render(<Router history={historyMock}><EditStudentsDetails /></Router>);
      // const loader = container.querySelector('.spinner-border');
      // expect(loader).toBeInTheDocument();
      console.log(container);
    });
  });

  // describe('content', () => {

  //   it('content', () => {
  //     render(<Router history={historyMock}><EditStudentsDetails id={id} /></Router>);
  //     screen.debug();
  //   });
  // });
});