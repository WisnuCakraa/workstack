import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostsList } from '@/app/users/[id]/PostsList';
import { mockPosts } from './mocks/data';

describe('PostsList', () => {
  it('shows only 3 posts by default', () => {
    render(<PostsList posts={mockPosts} />);

    expect(screen.getByText('Post title 1')).toBeInTheDocument();
    expect(screen.getByText('Post title 3')).toBeInTheDocument();
    expect(screen.queryByText('Post title 4')).not.toBeInTheDocument();
  });

  it('shows all posts after clicking show more', async () => {
    const user = userEvent.setup();
    render(<PostsList posts={mockPosts} />);

    await user.click(screen.getByText(/see 2 more publications/i));

    expect(screen.getByText('Post title 4')).toBeInTheDocument();
    expect(screen.getByText('Post title 5')).toBeInTheDocument();
  });

  it('shows empty state when no posts', () => {
    render(<PostsList posts={[]} />);
    expect(screen.getByText(/no posts yet/i)).toBeInTheDocument();
  });

  it('shows post count in heading', () => {
    render(<PostsList posts={mockPosts} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});