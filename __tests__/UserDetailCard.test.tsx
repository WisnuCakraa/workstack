import { render, screen, within } from '@testing-library/react';
import { UserDetailCard } from '@/app/users/[id]/UserDetailCard';
import { mockUser } from './mocks/data';

describe('UserDetailCard', () => {
  it('renders user name and username', () => {
    render(<UserDetailCard user={mockUser} />);

    const card = screen.getByTestId('user-detail-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();
  });

  it('renders contact info correctly', () => {
    render(<UserDetailCard user={mockUser} />);

    const contact = screen.getByTestId('contact-section');
    expect(within(contact).getByText('Sincere@april.biz')).toBeInTheDocument();
    expect(within(contact).getByText('1-770-736-0800')).toBeInTheDocument();
    expect(within(contact).getByText('hildegard.org')).toBeInTheDocument();
  });

  it('renders address info correctly', () => {
    render(<UserDetailCard user={mockUser} />);

    const address = screen.getByTestId('address-section');
    expect(within(address).getByText(/kulas light/i)).toBeInTheDocument();
    expect(within(address).getByText(/gwenborough/i)).toBeInTheDocument();
    expect(within(address).getByText('92998-3874')).toBeInTheDocument();
  });

  it('renders company info correctly', () => {
    render(<UserDetailCard user={mockUser} />);

    const company = screen.getByTestId('company-section');
    expect(within(company).getByText('Romaguera-Crona')).toBeInTheDocument();
    expect(
      within(company).getByText(/multi-layered client-server neural-net/i)
    ).toBeInTheDocument();
  });
});