import { render, screen } from '@testing-library/react';
import { UserDetailCard } from '@/app/users/[id]/UserDetailCard';
import { mockUser } from './mocks/data';

describe('UserDetailCard', () => {
  it('renders user details correctly', () => {
    render(<UserDetailCard user={mockUser} />);

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('1-770-736-0800')).toBeInTheDocument();
    expect(screen.getByText('hildegard.org')).toBeInTheDocument();
  });

  it('renders company info', () => {
    render(<UserDetailCard user={mockUser} />);

    expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(
      screen.getByText(/multi-layered client-server neural-net/i)
    ).toBeInTheDocument();
  });

  it('renders address info', () => {
    render(<UserDetailCard user={mockUser} />);

    expect(screen.getByText(/kulas light/i)).toBeInTheDocument();
    expect(screen.getByText(/gwenborough/i)).toBeInTheDocument();
    expect(screen.getByText('92998-3874')).toBeInTheDocument();
  });
});