export const populateEmptyGrid = () => {
  const rows = Number(process.env.VUE_APP_ROWS) || 0;
  const columns = Number(process.env.VUE_APP_COLUMNS) || 0;

  return Array(rows)
    .fill()
    .map(() => Array(columns).fill(0));
};

export const generateRandomCells = () => {
  const grid = populateEmptyGrid();
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
      if (Math.floor(Math.random() * 5) === 1) {
        grid[rowIndex][columnIndex] = +(!grid[rowIndex][columnIndex]);
      }
    }
  }
  return grid;
};

export const insideGrid = ({
  x, y, totalRows, totalColumns,
}) => y >= 0 && x >= 0 && y < totalRows && x < totalColumns;

export const countNeighbours = ({
  grid, rowIndex, columnIndex, totalRows, totalColumns,
}) => {
  let numNeighbours = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (!(i === 0 && j === 0)) {
        const yCell = rowIndex + i;
        const xCell = columnIndex + j;

        if (insideGrid({
          x: xCell, y: yCell, totalRows, totalColumns,
        })) {
          const currentNeighbour = grid[rowIndex + i][columnIndex + j];
          numNeighbours += currentNeighbour;
        }
      }
    }
  }

  return numNeighbours;
};

export const populateNewGeneration = (previousGeneration) => {
  const newGeneration = previousGeneration.map(arr => [...arr]);

  for (let rowIndex = 0; rowIndex < previousGeneration.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < previousGeneration[rowIndex].length; columnIndex++) {
      const currentCell = previousGeneration[rowIndex][columnIndex];

      const neighboursCount = countNeighbours({
        grid: previousGeneration,
        rowIndex,
        columnIndex,
        totalRows: previousGeneration.length,
        totalColumns: previousGeneration[rowIndex].length,
      });

      if (currentCell === 0 && neighboursCount === 3) {
        newGeneration[rowIndex][columnIndex] = 1;
      } else if (currentCell === 1 && (neighboursCount < 2 || neighboursCount > 3)) {
        newGeneration[rowIndex][columnIndex] = 0;
      } else {
        newGeneration[rowIndex][columnIndex] = currentCell;
      }
    }
  }

  return newGeneration;
};
