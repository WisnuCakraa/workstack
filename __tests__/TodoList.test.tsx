import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodosList } from '@/app/users/[id]/TodosList';
import { mockTodos } from './mocks/data';
describe('TodosList', () => {
  it('shows pending todos by default', () => {
    render(<TodosList todos={mockTodos} />);

    expect(screen.getByText('Todo pending 1')).toBeInTheDocument();
    expect(screen.getByText('Todo pending 2')).toBeInTheDocument();
    expect(screen.queryByText('Todo completed 1')).not.toBeInTheDocument();
  });

  it('switches to completed tab', async () => {
    const user = userEvent.setup();
    render(<TodosList todos={mockTodos} />);

    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(screen.getByText('Todo completed 1')).toBeInTheDocument();
    expect(screen.queryByText('Todo pending 1')).not.toBeInTheDocument();
  });

  it('shows all todos on all tab', async () => {
    const user = userEvent.setup();
    render(<TodosList todos={mockTodos} />);

    await user.click(screen.getByRole('button', { name: /^all/i }));

    expect(screen.getByText('Todo pending 1')).toBeInTheDocument();
    expect(screen.getByText('Todo completed 1')).toBeInTheDocument();
  });

  it('shows empty state when no todos match tab', async () => {
    const user = userEvent.setup();
    const allPending = mockTodos.filter((t) => !t.completed);
    render(<TodosList todos={allPending} />);

    await user.click(screen.getByRole('button', { name: /completed/i }));

    expect(screen.getByText(/nothing here/i)).toBeInTheDocument();
  });
});