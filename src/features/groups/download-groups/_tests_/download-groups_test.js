import React from 'react';
import { render, screen } from '@testing-library/react';
import { DownloadGroups } from '../download-groups';

describe('DownloadGroups', () => {
  it('render DownloadGroups component', () => {
    render(<DownloadGroups />);
    screen.debug();
    expect(screen.getByText('Course')).toBeInTheDocument();
  });
});
