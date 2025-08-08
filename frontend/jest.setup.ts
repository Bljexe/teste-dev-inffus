import '@testing-library/jest-dom';
import React from 'react';

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) {
    return React.createElement('img', { src, alt, ...props });
  },
}));

// Mock do next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: any }) {
    return React.createElement('a', { href, ...props }, children);
  },
}));

// Mock do axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} }),
  })),
}));
