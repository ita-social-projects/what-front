import React from "react";
import { paths, useActions } from "@/shared";
import { Router } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fireEvent,
  render,
  waitFor,
  getByPlaceholderText,
} from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { EditSecretarysDetails } from "../edit-secretarys-details";
import { secretariesMock } from "../__mocks__/mockedData";

jest.mock("react-redux", () => ({ useSelector: jest.fn() }));

jest.mock("@/shared/hooks", () => ({ useActions: jest.fn() }));

describe("edit-secretarys-details tests", () => {
  let historyMock;
  let mockSecretaryIdSelector;
  let mockSecretaryEditingSelector;
  let mockSecretaryDeletingSelector;
  let useActionsFns;
  let id;

  describe("Loaders tests", () => {
    beforeEach(() => {
      mockSecretaryIdSelector = {
        data: secretariesMock,
        isLoading: false,
        isLoaded: true,
        error: "",
      };
      mockSecretaryEditingSelector = {
        isLoaded: false,
        isLoading: false,
        error: "",
      };
      mockSecretaryDeletingSelector = {
        isLoaded: false,
        isLoading: false,
        error: "",
      };
      useSelector
        .mockReturnValue(mockSecretaryIdSelector)
        .mockReturnValue(mockSecretaryEditingSelector)
        .mockReturnValue(mockSecretaryDeletingSelector);
      useActionsFns = {
        editSecretary: jest.fn(),
        dispatchAddAlert: jest.fn(),
        fireSecretary: jest.fn(),
      };
      useActions.mockReturnValue([
        useActionsFns.editSecretary,
        useActionsFns.dispatchAddAlert,
        useActionsFns.fireSecretary,
      ]);
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
      id = 1;
    });

    it("should show loader-spinner when isLoading is true and isLoaded is false", () => {
      mockSecretaryIdSelector = {
        ...mockSecretaryIdSelector,
        isLoading: true,
        isLoaded: false,
      };
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      const loader = container.querySelector(".spinner-border");
      expect(loader).toBeInTheDocument();
    });

    it("should not show loader-spinner when isLoading is false and isLoaded is true", () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      const loader = container.querySelector(".spinner-border");
      expect(loader).not.toBeInTheDocument();
    });
  });

  describe("Tests for component content", () => {
    beforeEach(() => {
      mockSecretaryIdSelector = {
        data: secretariesMock,
        isLoading: false,
        isLoaded: true,
        error: "",
      };
      mockSecretaryEditingSelector = {
        isLoaded: false,
        isLoading: false,
        error: "",
      };
      mockSecretaryDeletingSelector = {
        isLoaded: false,
        isLoading: false,
        error: "",
      };
      useSelector
        .mockReturnValue(mockSecretaryIdSelector)
        .mockReturnValue(mockSecretaryEditingSelector)
        .mockReturnValue(mockSecretaryDeletingSelector);
      useActionsFns = {
        editSecretary: jest.fn(),
        dispatchAddAlert: jest.fn(),
        fireSecretary: jest.fn(),
      };
      useActions.mockReturnValue([
        useActionsFns.editSecretary,
        useActionsFns.dispatchAddAlert,
        useActionsFns.fireSecretary,
      ]);
      historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
      };
      id = 1;
    });

    it("should redirrect to page 404 in case of error in secretaries data", () => {
      mockSecretaryIdSelector = {
        ...mockSecretaryIdSelector,
        error: "some error",
      };
      useSelector.mockReturnValue(mockSecretaryIdSelector);

      render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.NOT_FOUND);
    });

    it("should redirrect to secretaries page and show success alert after successful editing", () => {
      mockSecretaryEditingSelector = {
        ...mockSecretaryEditingSelector,
        isLoaded: true,
      };
      useSelector
        .mockReturnValueOnce(mockSecretaryIdSelector)
        .mockReturnValueOnce(mockSecretaryEditingSelector)
        .mockReturnValueOnce(mockSecretaryDeletingSelector);

      render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.SECRETARIES);
      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledTimes(1);
      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        "The secretary has been successfully edited",
        "success"
      );
    });

    it("should show error alert after unsuccessful editing", () => {
      mockSecretaryEditingSelector = {
        ...mockSecretaryEditingSelector,
        error: "some error",
      };
      useSelector
        .mockReturnValueOnce(mockSecretaryIdSelector)
        .mockReturnValueOnce(mockSecretaryEditingSelector)
        .mockReturnValueOnce(mockSecretaryDeletingSelector);

      render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledTimes(1);
      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        mockSecretaryEditingSelector.error
      );
    });

    it("should redirrect to secretaries page and show success alert after successful deleting", () => {
      mockSecretaryDeletingSelector = {
        ...mockSecretaryDeletingSelector,
        isLoaded: true,
      };
      useSelector
        .mockReturnValueOnce(mockSecretaryIdSelector)
        .mockReturnValueOnce(mockSecretaryEditingSelector)
        .mockReturnValueOnce(mockSecretaryDeletingSelector);

      render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      expect(historyMock.push).toHaveBeenCalledWith(paths.SECRETARIES);
      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledTimes(1);
      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        "The secretary has been fired",
        "success"
      );
    });

    it("should show error alert after unsuccessful deleting", () => {
      mockSecretaryDeletingSelector = {
        ...mockSecretaryDeletingSelector,
        error: "some error",
      };
      useSelector
        .mockReturnValueOnce(mockSecretaryIdSelector)
        .mockReturnValueOnce(mockSecretaryEditingSelector)
        .mockReturnValueOnce(mockSecretaryDeletingSelector);

      render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledTimes(1);
      expect(useActionsFns.dispatchAddAlert).toHaveBeenCalledWith(
        mockSecretaryDeletingSelector.error
      );
    });

    it("should render component", () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      expect(container).toBeInTheDocument();
    });

    it("should render component with pre-filled fields", () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      expect(getByPlaceholderText(container, "Name").value).toBe(
        secretariesMock[0].firstName
      );
      expect(getByPlaceholderText(container, "Lastname").value).toBe(
        secretariesMock[0].lastName
      );
      expect(getByPlaceholderText(container, "Email").value).toBe(
        secretariesMock[0].email
      );
    });

    it("should keep Save button disabled if no changes were made", () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { getByText } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      expect(getByText("Save").closest("button")).toBeDisabled();
    });

    it("should remove disabled attribute from Save button if changes were made", async () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container, getByText } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      const nameField = container.querySelector("#firstName");

      fireEvent.change(nameField, {
        target: {
          value: "Clark",
        },
      });

      await waitFor(() => {
        expect(getByText("Save").closest("button")).not.toBeDisabled();
      });
    });

    it("should keep Cancel button disabled if no changes were made", () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      expect(container.querySelector('button[type="reset"]')).toBeDisabled();
    });

    it("should remove disabled attribute from Cancel button if changes were made", async () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      const nameField = container.querySelector("#firstName");

      fireEvent.change(nameField, {
        target: {
          value: "Clark",
        },
      });

      await waitFor(() => {
        expect(
          container.querySelector('button[type="reset"]')
        ).not.toBeDisabled();
      });
    });

    it("should reset fields to initial value on Cancel button click", async () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container, getByText } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );
      const nameField = container.querySelector("#firstName");
      const cancelButton = container.querySelector('button[type="reset"]');

      fireEvent.change(nameField, {
        target: {
          value: "Clark",
        },
      });

      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(nameField.value).toBe(secretariesMock[0].firstName);
      });
    });

    it("should call onSubmit on click Save button", async () => {
      useSelector.mockReturnValueOnce(mockSecretaryIdSelector);
      const { container, getByText } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      const submitButton = container.querySelector('button[type="submit"]');
      const nameField = container.querySelector("#firstName");

      await waitFor(() => {
        fireEvent.change(nameField, {
          target: {
            value: "Clark",
          },
        });
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(useActionsFns.editSecretary).toHaveBeenCalledTimes(1);
      });
    });

    it("should show modal window", async () => {
      useSelector.mockReturnValue(mockSecretaryIdSelector);
      const { container, getByRole } = render(
        <Router history={historyMock}>
          <EditSecretarysDetails id={id} />
        </Router>
      );

      const deleteButton = container.querySelector('button[type="button"]');

      await waitFor(() => {
        fireEvent.click(deleteButton);
      });

      expect(getByRole("button", { name: "Delete" })).toBeInTheDocument();
      expect(getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    });
  });
});
