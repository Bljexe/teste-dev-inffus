import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'text-green-600 bg-green-100';
    case 'dead':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getGenderColor(gender: string): string {
  switch (gender.toLowerCase()) {
    case 'male':
      return 'text-blue-600 bg-blue-100';
    case 'female':
      return 'text-pink-600 bg-pink-100';
    case 'genderless':
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
} 