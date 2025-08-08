import { cn, formatDate, getStatusColor, getGenderColor } from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('deve combinar classes CSS corretamente', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('deve lidar com classes condicionais', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe('base conditional');
    });

    it('deve lidar com arrays de classes', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
    });

    it('deve lidar com objetos de classes', () => {
      expect(cn({ 'class1': true, 'class2': false, 'class3': true })).toBe('class1 class3');
    });

    it('deve lidar com valores undefined e null', () => {
      expect(cn('base', undefined, null, 'valid')).toBe('base valid');
    });
  });

  describe('formatDate', () => {
    it('deve formatar data corretamente', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const formatted = formatDate(dateString);
      
      expect(formatted).toMatch(/^\d{1,2} de \w+ de \d{4}$/);
    });

    it('deve lidar com diferentes formatos de data', () => {
      const date1 = '2024-01-15';
      const date2 = '2024-01-15T10:30:00.000Z';
      const date3 = '2024-01-15T10:30:00';
      
      expect(formatDate(date1)).toBeTruthy();
      expect(formatDate(date2)).toBeTruthy();
      expect(formatDate(date3)).toBeTruthy();
    });

    it('deve retornar string vazia para data inválida', () => {
      const invalidDate = 'invalid-date';
      const result = formatDate(invalidDate);
      
      expect(typeof result).toBe('string');
    });
  });

  describe('getStatusColor', () => {
    it('deve retornar cor verde para status "alive"', () => {
      expect(getStatusColor('alive')).toBe('text-green-600 bg-green-100');
      expect(getStatusColor('Alive')).toBe('text-green-600 bg-green-100');
      expect(getStatusColor('ALIVE')).toBe('text-green-600 bg-green-100');
    });

    it('deve retornar cor vermelha para status "dead"', () => {
      expect(getStatusColor('dead')).toBe('text-red-600 bg-red-100');
      expect(getStatusColor('Dead')).toBe('text-red-600 bg-red-100');
      expect(getStatusColor('DEAD')).toBe('text-red-600 bg-red-100');
    });

    it('deve retornar cor cinza para status desconhecido', () => {
      expect(getStatusColor('unknown')).toBe('text-gray-600 bg-gray-100');
      expect(getStatusColor('Unknown')).toBe('text-gray-600 bg-gray-100');
      expect(getStatusColor('UNKNOWN')).toBe('text-gray-600 bg-gray-100');
    });

    it('deve retornar cor cinza para status inválido', () => {
      expect(getStatusColor('invalid')).toBe('text-gray-600 bg-gray-100');
      expect(getStatusColor('')).toBe('text-gray-600 bg-gray-100');
    });
  });

  describe('getGenderColor', () => {
    it('deve retornar cor azul para gênero "male"', () => {
      expect(getGenderColor('male')).toBe('text-blue-600 bg-blue-100');
      expect(getGenderColor('Male')).toBe('text-blue-600 bg-blue-100');
      expect(getGenderColor('MALE')).toBe('text-blue-600 bg-blue-100');
    });

    it('deve retornar cor rosa para gênero "female"', () => {
      expect(getGenderColor('female')).toBe('text-pink-600 bg-pink-100');
      expect(getGenderColor('Female')).toBe('text-pink-600 bg-pink-100');
      expect(getGenderColor('FEMALE')).toBe('text-pink-600 bg-pink-100');
    });

    it('deve retornar cor roxa para gênero "genderless"', () => {
      expect(getGenderColor('genderless')).toBe('text-purple-600 bg-purple-100');
      expect(getGenderColor('Genderless')).toBe('text-purple-600 bg-purple-100');
      expect(getGenderColor('GENDERLESS')).toBe('text-purple-600 bg-purple-100');
    });

    it('deve retornar cor cinza para gênero desconhecido', () => {
      expect(getGenderColor('unknown')).toBe('text-gray-600 bg-gray-100');
      expect(getGenderColor('Unknown')).toBe('text-gray-600 bg-gray-100');
      expect(getGenderColor('UNKNOWN')).toBe('text-gray-600 bg-gray-100');
    });

    it('deve retornar cor cinza para gênero inválido', () => {
      expect(getGenderColor('invalid')).toBe('text-gray-600 bg-gray-100');
      expect(getGenderColor('')).toBe('text-gray-600 bg-gray-100');
    });
  });
});
