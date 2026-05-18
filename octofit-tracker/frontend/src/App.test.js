import { render, screen } from '@testing-library/react';
import App from './App';

test('renders octofit tracker navigation', () => {
  render(<App />);

  expect(screen.getByText(/octofit tracker/i)).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /users/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /workouts/i }).length).toBeGreaterThan(0);
});
