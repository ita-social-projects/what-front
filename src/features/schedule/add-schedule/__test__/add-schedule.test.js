import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';

import { AddSchedule } from '../add-schedule.js';
import { useFetching } from '../add-schedule-useFetch.js';
import { mockedData } from './data-mock.js';
import { recurrencePatterns } from '../add-schedule-data.js';
import { addDays } from '../add-schedule-helpers.js';

const historyMock = {
  push: jest.fn(),
  location: {},
  listen: jest.fn(),
  createHref: jest.fn(),
};

jest.mock('../add-schedule-useFetch', () => ({
  useFetching: jest.fn(),
}));

describe('test add-schedule component', () => {
  describe('add-schedule component', () => {
    it('should be rendered', () => {
      useFetching.mockReturnValue({ ...mockedData });

      const { getByTestId } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const addSchedule = getByTestId('add-schedule');

      expect(addSchedule).toMatchSnapshot();
    });
  });

  describe('add-schedule component has loader', () => {
    it('if areGroupsLoading && !areGroupsLoaded', () => {
      useFetching.mockReturnValue({ ...mockedData, groups: { isLoading: true } });

      const { container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const loader = container.querySelector('.spinner-border');

      expect(loader).toBeInTheDocument();
    });

    it('if areActiveMentorsLoading && !areActiveMentorsLoaded', () => {
      useFetching.mockReturnValue({ ...mockedData, mentors: { isLoading: true } });

      const { container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const loader = container.querySelector('.spinner-border');

      expect(loader).toBeInTheDocument();
    });

    it('if areThemesLoading && !areThemesLoaded', () => {
      useFetching.mockReturnValue({ ...mockedData, themes: { isLoading: true } });

      const { container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const loader = container.querySelector('.spinner-border');

      expect(loader).toBeInTheDocument();
    });
  });

  describe('add-schedule component has content', () => {
    beforeEach(() => {
      useFetching.mockReturnValue({
        ...mockedData,
        groups: { ...mockedData.groups, isLoaded: true },
        mentors: { ...mockedData.mentors, isLoaded: true },
        themes: { ...mockedData.themes, isLoaded: true },
        addSchedule: jest.fn(),
      });
    });

    it('first click on button "Add Schedule" right now after render is made disabled', async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const buttonAdd = getByRole('button');

      await waitFor(() => {
        fireEvent.click(buttonAdd);
      });

      expect(buttonAdd).toBeDisabled();
    });

    it('Recurrence pattern is in the component', () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      expect(patternType).toBeInTheDocument();
    });

    it(`
      if Recurrence pattern is "Select a recurrence type",
      component should have seven times text "This field is required"`, async () => {
      const { getByRole, getAllByText } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'Select a recurrence type' } });
        const allRequiredFields = getAllByText('This field is required');
        expect(allRequiredFields).toHaveLength(7);
      });
    });

    it(`
      if Recurrence pattern is "Select a recurrence type",
      should disabled: DAYS OF WEEK, DAY OF MONTH, INDEX`, async () => {
      const { getAllByRole, getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'Select a recurrence type' } });

        const allCheckBoxes = getAllByRole('checkbox');

        allCheckBoxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled();
        });

        const dayOfMonth = getByRole('combobox', { name: 'Day of month:' });

        expect(dayOfMonth).toBeDisabled();

        const index = getByRole(
          'combobox',
          { name: 'Instance of the allowed days the event occurs:' },
        );

        expect(index).toBeDisabled();
      });
    });

    it(`
      if Recurrence pattern is "daily",
      component should have six times text "This field is required"`, async () => {
      const { getByRole, getAllByText } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        const allRequiredFields = getAllByText('This field is required');
        expect(allRequiredFields).toHaveLength(6);
      });
    });

    it(`
      if Recurrence pattern is "daily",
      should disabled: DAYS OF WEEK, DAY OF MONTH, INDEX`, async () => {
      const { getAllByRole, getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });

        const allCheckBoxes = getAllByRole('checkbox');

        allCheckBoxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled();
        });

        const dayOfMonth = getByRole('combobox', { name: 'Day of month:' });

        expect(dayOfMonth).toBeDisabled();

        const index = getByRole(
          'combobox',
          { name: 'Instance of the allowed days the event occurs:' },
        );

        expect(index).toBeDisabled();
      });
    });

    it(`
      if Recurrence pattern is "daily", should
      "Interval between each occurrence" have 31 items`, async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        fireEvent.select(interval, { target: { value: '31' } });
        expect(interval.value).toBeTruthy();
        fireEvent.change(interval, { target: { value: '32' } });
        expect(interval.value).toBeFalsy();
      });
    });

    it(`
      if Recurrence pattern is "weekly",
      component should have six times text "This field is required"
      and one time text "Should be choosen at least one day"`, async () => {
      const { getByRole, getAllByText, getByText } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'weekly' } });
        const allRequiredFields = getAllByText('This field is required');
        expect(allRequiredFields).toHaveLength(6);

        const chooseDayOfWeek = getByText('Should be choosen at least one day');
        expect(chooseDayOfWeek).toBeTruthy();
      });
    });

    it(`
      if Recurrence pattern is "weekly",
      should disabled: DAY OF MONTH, INDEX,
      should enabled: DAYS OF WEEK`, async () => {
      const { getAllByRole, getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'weekly' } });

        const allCheckBoxes = getAllByRole('checkbox');

        allCheckBoxes.forEach((checkbox) => {
          expect(checkbox).toBeEnabled();
        });

        const dayOfMonth = getByRole('combobox', { name: 'Day of month:' });

        expect(dayOfMonth).toBeDisabled();

        const index = getByRole(
          'combobox',
          { name: 'Instance of the allowed days the event occurs:' },
        );

        expect(index).toBeDisabled();
      });
    });

    it(`
      if Recurrence pattern is "weekly", should
      "Interval between each occurrence" have 4 items`, async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'weekly' } });
        fireEvent.change(interval, { target: { value: '4' } });
        expect(interval.value).toBeTruthy();

        fireEvent.change(interval, { target: { value: '5' } });
        expect(interval.value).toBeFalsy();
      });
    });

    it(`
      if Recurrence pattern is "on the same day of the month",
      component should have seven times text "This field is required"`, async () => {
      const { getByRole, getAllByText } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'on the same day of the month' } });
        const allRequiredFields = getAllByText('This field is required');
        expect(allRequiredFields).toHaveLength(7);
      });
    });

    it(`
      if Recurrence pattern is "on the same day of the month",
      should disabled: DAYS OF WEEK, INDEX,
      should enabled: DAY OF MONTH`, async () => {
      const { getAllByRole, getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'on the same day of the month' } });

        const allCheckBoxes = getAllByRole('checkbox');

        allCheckBoxes.forEach((checkbox) => {
          expect(checkbox).toBeDisabled();
        });

        const dayOfMonth = getByRole('combobox', { name: 'Day of month:' });

        expect(dayOfMonth).toBeEnabled();

        const index = getByRole(
          'combobox',
          { name: 'Instance of the allowed days the event occurs:' },
        );

        expect(index).toBeDisabled();
      });
    });

    it(`
      if Recurrence pattern is "on the same day of the month", should
      "Interval between each occurrence" have 12 items`, async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'on the same day of the month' } });
        fireEvent.change(interval, { target: { value: '12' } });
        expect(interval.value).toBeTruthy();

        fireEvent.change(interval, { target: { value: '13' } });
        expect(interval.value).toBeFalsy();
      });
    });

    it(`
      if Recurrence pattern is "on the same day of the month", should
      "Day of month" have 31 items`, async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Day of month:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'on the same day of the month' } });
        fireEvent.change(interval, { target: { value: '31' } });
        expect(interval.value).toBeTruthy();

        fireEvent.change(interval, { target: { value: '32' } });
        expect(interval.value).toBeFalsy();
      });
    });

    const SAME_DAY_IN_THE_MONTH = recurrencePatterns[3];

    it(`
      if Recurrence pattern is "on the same day of the week in the month",
      component should have seven times text "This field is required"
      and one time text "Should be choosen at least one day"`, async () => {
      const { getByRole, getAllByText, getByText } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: SAME_DAY_IN_THE_MONTH } });
        const allRequiredFields = getAllByText('This field is required');
        expect(allRequiredFields).toHaveLength(7);

        const chooseDayOfWeek = getByText('Should be choosen at least one day');
        expect(chooseDayOfWeek).toBeTruthy();
      });
    });

    it(`
      if Recurrence pattern is "on the same day of the week in the month",
      should disabled: DAY OF MONTH,
      should enabled: DAYS OF WEEK, INDEX`, async () => {
      const { getAllByRole, getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: SAME_DAY_IN_THE_MONTH } });

        const allCheckBoxes = getAllByRole('checkbox');

        allCheckBoxes.forEach((checkbox) => {
          expect(checkbox).toBeEnabled();
        });

        const dayOfMonth = getByRole('combobox', { name: 'Day of month:' });

        expect(dayOfMonth).toBeDisabled();

        const index = getByRole(
          'combobox',
          { name: 'Instance of the allowed days the event occurs:' },
        );

        expect(index).toBeEnabled();
      });
    });

    it(`
      if Recurrence pattern is "on the same day of the week in the month", should
      "Interval between each occurrence:" have 4 items
      and "Instance of the allowed days the event occurs:" has last, first items`, async () => {
      const { getByRole } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });
      const index = getByRole('combobox', { name: 'Instance of the allowed days the event occurs:' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: SAME_DAY_IN_THE_MONTH } });
        fireEvent.change(interval, { target: { value: '4' } });
        expect(interval.value).toBeTruthy();

        fireEvent.change(interval, { target: { value: '5' } });
        expect(interval.value).toBeFalsy();

        fireEvent.change(index, { target: { value: 'first' } });
        expect(index.value).toBeTruthy();

        fireEvent.change(index, { target: { value: 'last' } });
        expect(index.value).toBeTruthy();
      });
    });

    it(`
      if start date choosen later then now,
      should have field "Schedule's start date can't be in the past"`, async () => {
      const { getByText, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const startDate = container.querySelector('#startDate');

      await waitFor(() => {
        fireEvent.change(startDate, { target: { value: '2000-01-01T14:30' } });
        expect(getByText('Schedule`s start date can`t be in the past')).toBeTruthy();
      });
    });

    it(`
      if finish date choosen earlier then start date,
      should have field "Schedule's finish date can't be in the past"`, async () => {
      const { getByText, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const finishDate = container.querySelector('#finishDate');

      await waitFor(() => {
        fireEvent.change(finishDate, { target: { value: '2000-01-01T14:30' } });
        expect(getByText('Schedule`s finish date can`t be earlier start date')).toBeTruthy();
      });
    });

    it('if all fileds is filled, button "Add Schedule" is active', async () => {
      const { getByRole, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });
      const startDate = container.querySelector('#startDate');
      const finishDate = container.querySelector('#finishDate');
      const groups = getByRole('combobox', { name: 'Groups:' });
      const themes = getByRole('combobox', { name: 'Themes:' });
      const mentors = getByRole('combobox', { name: 'Mentors:' });
      const buttonAdd = getByRole('button');

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        fireEvent.change(interval, { target: { value: '31' } });
        fireEvent.change(startDate, { target: { value: addDays(1) } });
        fireEvent.change(finishDate, { target: { value: addDays(10) } });
        fireEvent.change(groups, { target: { value: 'SX-15' } });
        fireEvent.change(themes, { target: { value: '3D Printing' } });
        fireEvent.change(mentors, { target: { value: 'Susan Clark' } });

        expect(buttonAdd).toBeEnabled();
      });
    });

    it('if click button "Add Schedule" after all fields is filled, pop up "Confirm action"', async () => {
      const { getByRole, getByText, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });
      const startDate = container.querySelector('#startDate');
      const finishDate = container.querySelector('#finishDate');
      const groups = getByRole('combobox', { name: 'Groups:' });
      const themes = getByRole('combobox', { name: 'Themes:' });
      const mentors = getByRole('combobox', { name: 'Mentors:' });
      const buttonAdd = getByRole('button');

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        fireEvent.change(interval, { target: { value: '31' } });
        fireEvent.change(startDate, { target: { value: addDays(1) } });
        fireEvent.change(finishDate, { target: { value: addDays(10) } });
        fireEvent.change(groups, { target: { value: 'SX-15' } });
        fireEvent.change(themes, { target: { value: '3D Printing' } });
        fireEvent.change(mentors, { target: { value: 'Susan Clark' } });

        fireEvent.click(buttonAdd);

        expect(getByText('Are you sure you want to add this schedule?')).toBeTruthy();
      });
    });

    it('if click button "Close" in pop up "Confirm action", pop up is closed', async () => {
      const { getByRole, queryByRole, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });
      const startDate = container.querySelector('#startDate');
      const finishDate = container.querySelector('#finishDate');
      const groups = getByRole('combobox', { name: 'Groups:' });
      const themes = getByRole('combobox', { name: 'Themes:' });
      const mentors = getByRole('combobox', { name: 'Mentors:' });
      const buttonAdd = getByRole('button', { name: 'Add Schedule' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        fireEvent.change(interval, { target: { value: '31' } });
        fireEvent.change(startDate, { target: { value: addDays(1) } });
        fireEvent.change(finishDate, { target: { value: addDays(10) } });
        fireEvent.change(groups, { target: { value: 'SX-15' } });
        fireEvent.change(themes, { target: { value: '3D Printing' } });
        fireEvent.change(mentors, { target: { value: 'Susan Clark' } });

        fireEvent.click(buttonAdd);

        const cancel = queryByRole('button', { name: 'Cancel' });

        if (cancel) {
          fireEvent.click(cancel);
        }

        expect(cancel).not.toBeInTheDocument();
      });
    });

    it('if click button "x" in pop up "Confirm action", pop up is closed', async () => {
      const { getByRole, queryByRole, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });
      const startDate = container.querySelector('#startDate');
      const finishDate = container.querySelector('#finishDate');
      const groups = getByRole('combobox', { name: 'Groups:' });
      const themes = getByRole('combobox', { name: 'Themes:' });
      const mentors = getByRole('combobox', { name: 'Mentors:' });
      const buttonAdd = getByRole('button', { name: 'Add Schedule' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        fireEvent.change(interval, { target: { value: '31' } });
        fireEvent.change(startDate, { target: { value: addDays(1) } });
        fireEvent.change(finishDate, { target: { value: addDays(10) } });
        fireEvent.change(groups, { target: { value: 'SX-15' } });
        fireEvent.change(themes, { target: { value: '3D Printing' } });
        fireEvent.change(mentors, { target: { value: 'Susan Clark' } });

        fireEvent.click(buttonAdd);

        const close = queryByRole('button', { name: '×' });

        if (close) {
          fireEvent.click(close);
        }

        expect(close).not.toBeInTheDocument();
      });
    });

    it('if click button "Submit" in pop up "Confirm action", pop up is closed', async () => {
      const { getByRole, queryByRole, container } = render(
        <Router history={historyMock}>
          <AddSchedule />
        </Router>,
      );

      const patternType = getByRole('combobox', { name: 'Recurrence pattern:' });
      const interval = getByRole('combobox', { name: 'Interval between each occurrence:' });
      const startDate = container.querySelector('#startDate');
      const finishDate = container.querySelector('#finishDate');
      const groups = getByRole('combobox', { name: 'Groups:' });
      const themes = getByRole('combobox', { name: 'Themes:' });
      const mentors = getByRole('combobox', { name: 'Mentors:' });
      const buttonAdd = getByRole('button', { name: 'Add Schedule' });

      await waitFor(() => {
        fireEvent.change(patternType, { target: { value: 'daily' } });
        fireEvent.change(interval, { target: { value: '31' } });
        fireEvent.change(startDate, { target: { value: addDays(1) } });
        fireEvent.change(finishDate, { target: { value: addDays(10) } });
        fireEvent.change(groups, { target: { value: 'SX-15' } });
        fireEvent.change(themes, { target: { value: '3D Printing' } });
        fireEvent.change(mentors, { target: { value: 'Susan Clark' } });

        fireEvent.click(buttonAdd);

        const submit = queryByRole('button', { name: 'Submit' });

        if (submit) {
          fireEvent.click(submit);
        }

        expect(submit).not.toBeInTheDocument();
      });
    });
  });
});