import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router';
import { useSelector } from 'react-redux';
import { cleanup, fireEvent, getByRole, render, waitFor } from '@testing-library/react';
import { EditSchedule } from '@/features';
import { commonHelpers } from '@/utils';
import {
  scheduleMockData,
  scheduleMockDataLoading,
  studentGroupMockData,
  studentGroupMockDataLoading,
  mentorsMockData,
  themesMockData,
  // submitValues,
} from './mocks/mock-data';
import { helpersData } from '../helpers-data';

jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('@/shared/hooks', () => ({ useActions: jest.fn() }));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

const useActionsFns = {
  updateSchedule: jest.fn(),
  dispatchAddAlert: jest.fn(),
  removeSchedule: jest.fn(),
};

useActions.mockReturnValue([
  useActionsFns.updateSchedule,
  useActionsFns.dispatchAddAlert,
  useActionsFns.removeSchedule,
]);

const useStates = {
  weekDays: {
    weekDays: [],
    setWeekDays: jest.fn(),
  },
  dayInputError: {
    dayInputError: '',
    setDayInputError: jest.fn(),
  },
  interval: {
    interval: 1,
    setInterval: jest.fn(),
  },
  toShowModal: {
    toShowModal: false,
    setToShowModal: jest.fn(),
  },
  filteredMentors: {
    filteredMentors: mentorsMockData.data,
    setFilteredMentors: jest.fn(),
  },
  filteredThemes: {
    filteredThemes: themesMockData.data,
    setFilteredThemes: jest.fn(),
  },
};

describe('Tests EditSchedule', () => {
  describe('Render && Form of EditSchedule', () => {
    let historyMock;

    beforeEach(() => {
      useSelector
        .mockReturnValue(scheduleMockDataLoading)
        .mockReturnValue(scheduleMockData)
        .mockReturnValue(studentGroupMockDataLoading)
        .mockReturnValue(studentGroupMockData)
        .mockReturnValue(mentorsMockData)
        .mockReturnValue(themesMockData);

      commonHelpers.transformDateTime = jest
        .fn()
        .mockReturnValue({ formInitialValue: '2021-06-17T02:47' });

      historyMock = { push: jest.fn(), location: jest.fn(), listen: jest.fn() };
    });
    afterEach(cleanup);

    it('should loader appear when scheduleSelector .isLoading is true', () => {
      const mockedScheduleSelector = {
        data: scheduleMockDataLoading,
        isLoading: true,
      };
      useSelector.mockReturnValue(mockedScheduleSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={mockedScheduleSelector}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should loader appear when groupSelector .isLoading is true', () => {
      const mockedGroupSelector = {
        data: studentGroupMockDataLoading,
        isLoading: true,
      };
      useSelector.mockReturnValue(mockedGroupSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={mockedGroupSelector}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const loader = container.querySelector('.spinner-border');
      expect(loader).toBeInTheDocument();
    });

    it('should the component be rendered', () => {
      const { getByTestId } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      expect(getByTestId('editForm')).toBeInTheDocument();
    });

    it('should the Form be rendered correctly', () => {
      const { getByTestId } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const groupName = getByTestId('groupName');
      const eventStart = getByTestId('eventStart');
      const eventFinish = getByTestId('eventFinish');
      expect(getByTestId('editForm')).toBeInTheDocument();
      expect(groupName.value).toBe('122-18-3');
      expect(eventStart.value).toBe('2021-06-17T02:47');
      expect(eventFinish.value).toBe('2021-06-17T02:47');
      expect(groupName).toBeDisabled();
    });

    it('should weekDays list = 7 ', () => {
      const { container } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const weekDaysList = container.querySelector('#weekDays-list');
      fireEvent.click(weekDaysList);
      expect(weekDaysList.children.length).toEqual(7);
      expect(weekDaysList.children[0].value).toBe('Monday');
    });

    it('should day of week be chosen', () => {
      const { getByPlaceholderText } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const weekDay = getByPlaceholderText("Select day('s) of week");
      fireEvent.change(weekDay, {
        target: { value: helpersData.daysOfWeek[3].name },
      });
      expect(weekDay.value).toBe('Thursday');
    });
  });

  describe('Redirect correctly', () => {
    let historyMock;
    let data;
    let mockEditedScheduleSelector;
    let mockDeletedScheduleSelector;

    beforeEach(() => {
      data = scheduleMockData;
      data.isLoading = false;

      mockEditedScheduleSelector = {
        isLoading: false,
        isLoaded: true,
        error: '',
      };
      mockDeletedScheduleSelector = {
        isLoading: false,
        isLoaded: true,
        error: '',
      };

      useSelector
        .mockReturnValue(mockEditedScheduleSelector)
        .mockReturnValue(mockDeletedScheduleSelector)
        .mockReturnValue(scheduleMockData)
        .mockReturnValue(studentGroupMockData)
        .mockReturnValue(mentorsMockData)
        .mockReturnValue(themesMockData);

      historyMock = { push: jest.fn(), location: jest.fn(), listen: jest.fn() };
    });
    afterEach(cleanup);

    it('should redirrect to page 404 in case of error', () => {
      const noData = {
        data: '',
        isLoading: true,
        isLoaded: true,
      };
      useSelector.mockReturnValue(noData);
      render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={noData}
            groupData={noData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      expect(historyMock.push).toHaveBeenCalledWith(paths.NOT_FOUND);
    });

    it('should redirrect to schedule page and show success alert after successful editing', () => {
      mockEditedScheduleSelector = {
        ...data,
        isLoaded: true,
      };
      useSelector
        .mockReturnValueOnce(mockEditedScheduleSelector)
        .mockReturnValueOnce(mockDeletedScheduleSelector);

      render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );

      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        'The schedule has been successfully edited',
        'success'
      );
    });

    it('should show error alert after unsuccessful editing', () => {
      mockEditedScheduleSelector = {
        ...data,
        isLoaded: false,
        error: 'some error',
      };
      useSelector
        .mockReturnValueOnce(mockEditedScheduleSelector)
        .mockReturnValueOnce(mockDeletedScheduleSelector);

      render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );

      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        mockEditedScheduleSelector.error
      );
    });

    it('should redirrect to schedule page and show success alert after successful deleting', () => {
      mockDeletedScheduleSelector = {
        ...data,
        isLoaded: true,
      };
      useSelector
        .mockReturnValueOnce(mockEditedScheduleSelector)
        .mockReturnValueOnce(mockDeletedScheduleSelector);

      render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );

      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        'The schedule has been successfully deleted',
        'success'
      );
    });

    it('should show error alert after unsuccessful deleting', () => {
      mockDeletedScheduleSelector = {
        ...data,
        isLoaded: false,
        error: 'some error',
      };
      useSelector
        .mockReturnValueOnce(mockEditedScheduleSelector)
        .mockReturnValueOnce(mockDeletedScheduleSelector);

      render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );

      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        mockDeletedScheduleSelector.error
      );
    });

    it('should open modalWindow when click delete', async () => {
      const { getByText } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const handleShowModal = jest.fn();
      const removeBtn = getByText(/Delete/i);
      await waitFor(() => {
        fireEvent.click(removeBtn);
        handleShowModal();
      });
      expect(handleShowModal).toHaveBeenCalledTimes(1);
      expect(
        getByText(/Are you sure you want to exclude this schedule?/i)
      ).toBeInTheDocument();
    });

    it('should close modalWindow and delete course when click delete on modalWindow', async () => {
      const { getByText, getByRole } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const handleDelete = jest.fn();
      const removeBtn = getByText('Delete');

      await waitFor(() => {
        fireEvent.click(removeBtn);
      });
      expect(getByRole('button', { name: 'Delete' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Cancel' })).toBeInTheDocument();

      const deleteBtn = getByRole('button', { name: 'Delete' });
      await waitFor(() => {
        fireEvent.click(deleteBtn);
        handleDelete();
      });
      expect(handleDelete).toHaveBeenCalled();
      expect(useActionsFns.removeSchedule).toHaveBeenCalled();
    });

    it('should day of week not Found', () => {
      React.useState = jest
        .fn()
        .mockReturnValue(['', useStates.dayInputError.setDayInputError]);
      const { getByPlaceholderText } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const weekDay = getByPlaceholderText("Select day('s) of week");
      fireEvent.change(weekDay, { target: { value: 'day' } });
      expect(useStates.dayInputError.setDayInputError).toHaveBeenCalled();
    });

    it('should call addDayOfWeek and change state', async () => {
      React.useState = jest
        .fn()
        .mockReturnValue([[], useStates.weekDays.setWeekDays]);
      const { container, getByPlaceholderText, getByText } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const addDayOfWeek = jest.fn();
      const clearField = jest.fn();
      const addDayOfWeekBtn = container.querySelector('#add-weekDay-btn');
      const weekDay = getByPlaceholderText("Select day('s) of week");

      await waitFor(() => {
        fireEvent.change(weekDay, {
          target: { value: helpersData.daysOfWeek[3].name },
        });
      });
      await waitFor(() => {
        fireEvent.click(addDayOfWeekBtn);
        addDayOfWeek();
        clearField();
      });
      expect(addDayOfWeek).toHaveBeenCalledTimes(1);
      expect(useStates.weekDays.setWeekDays).toHaveBeenCalled();
      expect(getByText(/Thursday/i)).toBeInTheDocument();
    });

    it('should call removeDayOfWeek and change state', async () => {
      React.useState = jest
        .fn()
        .mockReturnValue([[], useStates.weekDays.setWeekDays]);
      const { container, getByPlaceholderText } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const addDayOfWeek = jest.fn();
      const removeDayOfWeek = jest.fn();
      const addDayOfWeekBtn = container.querySelector('#add-weekDay-btn');
      const weekDay = getByPlaceholderText("Select day('s) of week");

      await waitFor(() => {
        fireEvent.change(weekDay, {
          target: { value: helpersData.daysOfWeek[3].name },
        });
      });
      await waitFor(() => {
        fireEvent.click(addDayOfWeekBtn);
        addDayOfWeek();
      });

      const dayContainer = container.querySelector('#chosenWeekDay');
      const removeBtn = dayContainer.children[0];

      expect(removeBtn).toHaveTextContent('X');

      await waitFor(() => {
        fireEvent.click(removeBtn);
        removeDayOfWeek();
      });

      expect(removeDayOfWeek).toHaveBeenCalledTimes(1);
      expect(useStates.weekDays.setWeekDays).toHaveBeenCalled();
    });

    it('should change interval', async () => {
      React.useState = jest
        .fn()
        .mockReturnValue([1, useStates.interval.setInterval]);
      const { getByTestId } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );

      const intervalInput = getByTestId('interval');
      await waitFor(() => {
        fireEvent.change(intervalInput, { target: { value: 3 } });
      });
      expect(useStates.interval.setInterval).toHaveBeenCalled();
      expect(intervalInput.value).toBe('3');
    });

    it('should handleReset', async () => {
      React.useState = jest
        .fn()
        .mockReturnValue([1, useStates.interval.setInterval]);
      const { container, getByTestId, getByRole, getByPlaceholderText } = render(
        <Router history={historyMock}>
          <EditSchedule
            id={1}
            schedulesData={scheduleMockData}
            groupData={studentGroupMockData}
            themesData={themesMockData}
            mentorsData={mentorsMockData}
          />
        </Router>
      );
      const handleReset = jest.fn();
      const setInterval = jest.fn();
      const setWeekDays = jest.fn();
      const intervalInput = getByTestId('interval');
      const cancleBtn = getByRole('button', { name: 'Clear' });
     const addDayOfWeekBtn = container.querySelector('#add-weekDay-btn');
      const weekDay = getByPlaceholderText("Select day('s) of week");

      await waitFor(() => {
        fireEvent.change(intervalInput, { target: { value: 3 } });
        fireEvent.change(weekDay, {
          target: { value: helpersData.daysOfWeek[3].name },
        });
        fireEvent.click(addDayOfWeekBtn);
      });

      expect(intervalInput.value).toBe('3');

      await waitFor(() => {
        fireEvent.click(cancleBtn);
        handleReset();
        setInterval(1);
        setWeekDays([]);
      });

      expect(handleReset).toHaveBeenCalled();
      expect(setInterval).toHaveBeenCalled();
      expect(setWeekDays).toHaveBeenCalled();
      expect(useStates.interval.setInterval).toHaveBeenCalled();
      expect(intervalInput.value).toBe('1');
    });

  });
});