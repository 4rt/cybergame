import {
  insideGrid,
  countNeighbours,
  populateNewGeneration,
} from '@/utils/index';

describe('Cyber game logic', () => {
  describe('Should count for neighbors', () => {
    it('checks if there are no neighbors', () => {
      const grid = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const neighbors = countNeighbours({
        grid, rowIndex: 0, columnIndex: 0, totalRows: 3, totalColumns: 3,
      });

      expect(neighbors).toBe(0);
    });

    it('checks if there is 1 neighbor', () => {
      const grid = [
        [1, 1, 0],
        [0, 0, 0],
        [1, 0, 1],
      ];

      const neighbors = countNeighbours({
        grid, rowIndex: 0, columnIndex: 0, totalRows: 3, totalColumns: 3,
      });

      expect(neighbors).toBe(1);
    });

    it('checks if there is 2 neighbor', () => {
      const grid = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
      ];

      const neighbors = countNeighbours({
        grid, rowIndex: 0, columnIndex: 0, totalRows: 3, totalColumns: 3,
      });

      expect(neighbors).toBe(2);
    });
  });

  describe('Should check grid edges', () => {
    it('checks if cell is inside the grid', () => {
      const inside = insideGrid({
        x: 0, y: 0, totalRows: 3, totalColumns: 3,
      });

      expect(inside).toBe(true);
    });

    it('checks if cell is outside the grid', () => {
      const inside = insideGrid({
        x: -1, y: 0, totalRows: 3, totalColumns: 3,
      });

      expect(inside).toBe(false);
    });
  });

  describe('Should generate next state', () => {
    it('generate new state based on previous', () => {
      const currentGeneration = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const expected = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      const populated = populateNewGeneration(currentGeneration);

      expect(populated).toEqual(expected);
    });

    it('dead cell becomes alive with 3 neighbors', () => {
      const currentGeneration = [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      const expected = [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      const populated = populateNewGeneration(currentGeneration);

      expect(populated).toEqual(expected);
    });

    it('alive cell dies without neighbors', () => {
      const currentGeneration = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      const populated = populateNewGeneration(currentGeneration);

      expect(populated).toEqual(expected);
    });

    it('alive cell dies with 1 neighbor', () => {
      const currentGeneration = [
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      const populated = populateNewGeneration(currentGeneration);

      expect(populated).toEqual(expected);
    });
  });
});
