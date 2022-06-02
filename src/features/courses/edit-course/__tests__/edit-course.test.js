import React from 'react';
import { paths, useActions } from '@/shared';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { EditCourse } from '@/features';
import { editCourseMock } from './mocks/mock-data.js';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));

jest.mock('@/shared/hooks', () => ({useActions: jest.fn()}));

describe('EditLesson tests', () => {
    let historyMock;
    let data;
    let mockEditedCourseSelector;
    let mockDeletedCourseSelector;
    let useActionsFns;
    let id;

    beforeEach(() => {

        data = editCourseMock;
        data.isLoading = false;

        mockEditedCourseSelector = {
            isLoading: false,
            isLoaded: true,
            error: '',
        };
        mockDeletedCourseSelector = {
            isLoading: false,
            isLoaded: true,
            error: '',
        };

        useSelector
            .mockReturnValue(mockEditedCourseSelector)
            .mockReturnValue(mockDeletedCourseSelector);

        useActionsFns = {updateCourse: jest.fn(), dispatchAddAlert: jest.fn(), removeCourse: jest.fn()};
        useActions.mockReturnValue([useActionsFns.updateCourse, useActionsFns.dispatchAddAlert, useActionsFns.removeCourse]);

        historyMock = {push: jest.fn(), location: {}, listen: jest.fn()};

        id = 1;
    });

    it('Loader appears when isLoading in data is true', () => {
        data.isLoading = true;

        const { container } = render(
            <Router history={historyMock}>
                <EditCourse coursesData={data} id={1}/>
            </Router>
        );
        const loader = container.querySelector('.spinner-border');
        expect(loader).toBeInTheDocument();
    });

    it('should the component be rendered', () => {
        const { getByTestId } = render(
            <Router history={historyMock} >
                <EditCourse coursesData={data} id={1}/>
            </Router>
        );
        const form = getByTestId('editCourseForm');
        expect(form).toBeInTheDocument();
    });

    it("should open modalWindow when click delete", async () => {
        const { getByText } = render(
          <Router history={historyMock}>
            <EditCourse id={id} coursesData={data} />
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
          getByText(/Are you sure you want to delete this course?/i)
        ).toBeInTheDocument();
      });

      it("should close modalWindow and delete course when click delete on modalWindow", async () => {
        const { getByText, getByRole } = render(
          <Router history={historyMock}>
            <EditCourse id={id} coursesData={data} />
          </Router>
        );
        const handleDelete = jest.fn();
        const removeBtn = getByText("Delete");
    
        await waitFor(() => {
          fireEvent.click(removeBtn);
        });
        expect(getByRole("button", { name: "Delete" })).toBeInTheDocument();
        expect(getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    
        const deleteBtn = getByRole("button", { name: "Delete" });
        await waitFor(() => {
          fireEvent.click(deleteBtn);
          handleDelete();
        });
        expect(handleDelete).toHaveBeenCalled();
        expect(useActionsFns.removeCourse).toHaveBeenCalled();
      });

      it("should clear the entered data", async () => {
        const { container, getByText } = render(
          <Router history={historyMock}>
            <EditCourse id={id} coursesData={data} />
          </Router>
        );
        const resetInput = jest.fn();
        const clearBtn = getByText("Clear");
        const courseNameInput = container.querySelector("#name");
    
        await waitFor(() => {
          fireEvent.change(courseNameInput, {
            target: {
              value: "New course name",
            },
          });
        });
    
        await waitFor(() => {
          fireEvent.click(clearBtn);
          resetInput();
        });
        expect(resetInput).toHaveBeenCalledTimes(1);
        expect(courseNameInput).toHaveTextContent("");
      });

      it("should submit form", async () => {
        const { container, getByText } = render(
          <Router history={historyMock}>
            <EditCourse id={id} coursesData={data} />
          </Router>
        );
        const inputCourseName = container.querySelector("#name");
        const saveBtn = getByText("Save");
        const onSubmit = jest.fn();
    
        expect(saveBtn).toBeInTheDocument();
        await waitFor(() => {
          fireEvent.change(inputCourseName, {
            target: {
              value: "Node JS practical course",
            },
          });
        });
        await waitFor(() => {
          fireEvent.click(saveBtn);
          onSubmit();
        });
    
        expect(onSubmit).toHaveBeenCalled();
        expect(useActionsFns.updateCourse).toHaveBeenCalledTimes(1);
      });

      it("should redirrect to courses page and show success alert after successful editing", () => {
        mockEditedCourseSelector = {
          ...data,
          isLoaded: true,
        };
        useSelector
          .mockReturnValueOnce(mockEditedCourseSelector)
          .mockReturnValueOnce(mockDeletedCourseSelector);
    
        render(
          <Router history={historyMock}>
            <EditCourse id={id} coursesData={data} />
          </Router>
        );
    
        expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
          "The course has been successfully edited",
          "success"
        );
      });

      it("should show error alert after unsuccessful editing", () => {
        mockEditedCourseSelector = {
          ...data,
          loaded: false,
          error: "some error",
        };
        useSelector
          .mockReturnValueOnce(mockEditedCourseSelector)
          .mockReturnValueOnce(mockDeletedCourseSelector)
    
        render(
          <Router history={historyMock}>
             <EditCourse id={id} coursesData={data} />
          </Router>
        );
    
        expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
          mockEditedCourseSelector.error
        );
      });

      it("should redirrect to courses page and show success alert after successful deleting", () => {
        mockDeletedCourseSelector = {
          ...data,
          isLoaded: true,
        };
        useSelector
          .mockReturnValueOnce(mockEditedCourseSelector)
          .mockReturnValueOnce(mockDeletedCourseSelector);
    
        render(
          <Router history={historyMock}>
            <EditCourse id={id} coursesData={data} />
          </Router>
        );
    
        expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
          "The course has been successfully deleted",
          "success"
        );
      });

      it("should show error alert after unsuccessful deleting", () => {
        mockDeletedCourseSelector = {
          ...data,
          loaded: false,
          error: "some error",
        };
        useSelector
          .mockReturnValueOnce(mockEditedCourseSelector)
          .mockReturnValueOnce(mockDeletedCourseSelector);
    
        render(
          <Router history={historyMock}>
           <EditCourse id={id} coursesData={data} />
          </Router>
        );
    
        expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
          mockDeletedCourseSelector.error
        );
      });

      it("should redirrect to page 404 in case of error in courses data", () => {
        render(
          <Router history={historyMock}>
            <EditCourse id={id = 0} coursesData={data} />
          </Router>
        );
    
        expect(historyMock.push).toHaveBeenCalledWith(paths.NOT_FOUND);
      });

});