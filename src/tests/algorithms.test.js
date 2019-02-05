import algorithms from '../utils/algorithms';

describe('Bubble Sort', () => {
  it('should return an array of steps when getSteps is called', () => {
    const result = algorithms['Bubble Sort'].getSteps([5, 1, 4, 7, 3, 6, 8, 2]);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Insertion Sort', () => {
  it('should return an array of steps when getSteps is called', () => {
    const result = algorithms['Insertion Sort'].getSteps([5, 1, 4, 7, 3, 6, 8, 2]);
    expect(result.length).toBeGreaterThan(0);
  });
});