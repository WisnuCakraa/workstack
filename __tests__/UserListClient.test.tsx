import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserListClient } from '@/app/users/UserListClient';
import { mockUsers } from './mocks/data';

const mockGet = jest.fn((key: string): string | null => null);
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
  usePathname: jest.fn(() => '/users'),
  useSearchParams: jest.fn(() => ({
    get: mockGet,
    toString: jest.fn(() => ''),
  })),
}));

describe('UserListClient', () => {
  beforeEach(() => {
    mockGet.mockReturnValue(null);
  });

  it('renders all users with activity signals', () => {
    render(<UserListClient initialUsers={mockUsers} />);

    expect(screen.getAllByText('Leanne Graham')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Ervin Howell')[0]).toBeInTheDocument();

    expect(screen.getAllByText('10')).toHaveLength(6);
    expect(screen.getAllByText('5')[0]).toBeInTheDocument();
    expect(screen.getAllByText('0')[0]).toBeInTheDocument();
  });

  it('shows empty state when no users match search', () => {
    mockGet.mockImplementation((key: string) => {
      if (key === 'search') return 'xyz';
      return null;
    });

    render(<UserListClient initialUsers={mockUsers} />);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    expect(screen.queryAllByText('Leanne Graham')).toHaveLength(0);
  });

  it('filters by name via search', () => {
    mockGet.mockImplementation((key: string) => {
      if (key === 'search') return 'leanne';
      return null;
    });

    render(<UserListClient initialUsers={mockUsers} />);

    expect(screen.getAllByText('Leanne Graham')[0]).toBeInTheDocument();
    expect(screen.queryAllByText('Ervin Howell')).toHaveLength(0);
  });

  it('filters by email via search', () => {
    mockGet.mockImplementation((key: string) => {
      if (key === 'search') return 'shanna';
      return null;
    });

    render(<UserListClient initialUsers={mockUsers} />);

    expect(screen.getAllByText('Ervin Howell')[0]).toBeInTheDocument();
    expect(screen.queryAllByText('Leanne Graham')).toHaveLength(0);
  });

  it('filters users with no completed todos', () => {
    mockGet.mockImplementation((key: string) => {
      if (key === 'filter') return 'no_completed';
      return null;
    });

    render(<UserListClient initialUsers={mockUsers} />);

    expect(screen.getAllByText('Ervin Howell')[0]).toBeInTheDocument();
    expect(screen.queryAllByText('Leanne Graham')).toHaveLength(0);
  });

  it('sorts by most pending todos', () => {
    mockGet.mockImplementation((key: string) => {
      if (key === 'sort') return 'pending_desc';
      return null;
    });

    render(<UserListClient initialUsers={mockUsers} />);

    const names = screen
      .getAllByRole('link', { name: /Graham|Howell/ })
      .map((el) => el.textContent);

    expect(names[0]).toBe('Ervin Howell');
    expect(names[1]).toBe('Leanne Graham');
  });

  it('shows correct count label', () => {
    render(<UserListClient initialUsers={mockUsers} />);
    expect(screen.getByText(/showing 1–2 of 2/i)).toBeInTheDocument();
  });
});