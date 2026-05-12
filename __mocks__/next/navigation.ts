export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
}));

export const usePathname = jest.fn(() => '/users');

export const useSearchParams = jest.fn(() => new URLSearchParams());