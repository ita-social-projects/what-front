import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { Sidebar } from '@/features';
import { useSelector } from 'react-redux';
import { paths } from '@/shared';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn().mockReturnValue({
    push: jest.fn(),
    location: { pathname: '/lessons' }
  }),
}));

describe('Sidebar', () => {
  it('', () => {
    useSelector.mockReturnValue({ currentUser: { role: 2 } });
    const { container } = render(
      <Router>
        <Sidebar />
      </Router>
    );
    const sidebarContainer = container.getElementsByClassName('sidebar');
    expect(sidebarContainer).toMatchSnapshot();
  });

  it('should navigate to lessons page', async () => {
    const history = useHistory();
    useSelector.mockReturnValue({ currentUser: { role: 2 } });
    const { getByText } = render(
      <Router>
        <Sidebar />
      </Router>
    );

    const navigate_link = getByText(/Lessons/i);

    await waitFor(() => {
      fireEvent.click(navigate_link);
    });
    expect(history.location.pathname).toBe(paths.LESSONS);
  });

  it('should navigate to lessons page', () => {
    useSelector.mockReturnValue({ currentUser: { role: 2 } });
    const { queryByText } = render(
      <Router>
        <Sidebar />
      </Router>
    );

    const groups_link = queryByText(/Schedule/i);

    expect(groups_link).toBeNull();
  });
});