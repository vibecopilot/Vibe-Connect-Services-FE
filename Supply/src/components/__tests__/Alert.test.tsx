import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../Alert';
import { Info } from 'lucide-react';

describe('Alert Component', () => {
  test('renders title and message', () => {
    render(<Alert type="info" title="Test Title" message="Test message" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders icon if provided', () => {
    render(
      <Alert
        type="info"
        title="With Icon"
        message="Icon is here"
        icon={<Info data-testid="alert-icon" />}
      />
    );
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
  });

  test('shows close button when dismissible and calls onClose', () => {
    const onClose = jest.fn();
    render(
      <Alert
        type="info"
        title="Dismissible"
        message="Dismiss me"
        dismissible
        onClose={onClose}
      />
    );
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
