import React from "react";
import produce from "immer";
class Maze extends React.Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      rowChanged: 0,
      colChanged: 0,
      start: 1,
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.reset = this.reset.bind(this);
  }
  drawMaze() {
    const newGrid = produce(this.state.grid, (copy) => {
      let row = 2;
      let col = 0;

      while (row < 20) {
        let temp_r = row;
        col = 0;
        for (row; row >= 0; row--) {
          copy[row][col] = 1;
          col += 1;
        }
        row = temp_r + 2;
      }
      row = 17;
      while (row > 0) {
        let temp_r = row;
        col = 19;
        for (row; row <= 19; row++) {
          copy[row][col] = 1;
          col -= 1;
        }
        row = temp_r - 2;
      }
      copy[19][18] = 1;
    });

    this.setState(() => {
      return { grid: newGrid };
    });
  }
  componentWillMount() {
    this.setState(() => {
      return {
        grid: Array(20)
          .fill(0)
          .map(() => new Array(20).fill(0)),
      };
    });
  }
  findNeighbours(i, j) {
    if (i === 19 && j === 0) {
      let topMiddle = this.state.grid[i - 1][j];
      let topRight = this.state.grid[i - 1][j + 1];
      let middleRight = this.state.grid[i][j + 1];
      if (middleRight === 2 || topMiddle === 2 || topRight === 2) {
        return true;
      }
    } else if (i === 0 && j === 19) {
      let middleLeft = this.state.grid[i][j - 1];
      let bottomLeft = this.state.grid[i + 1][j - 1];
      let bottomMiddle = this.state.grid[i + 1][j];
      if (bottomMiddle === 2 || middleLeft === 2 || bottomLeft === 2) {
        return true;
      }
    } else if (i === 0) {
      let middleLeft = this.state.grid[i][j - 1];
      let middleRight = this.state.grid[i][j + 1];
      let bottomLeft = this.state.grid[i + 1][j - 1];
      let bottomMiddle = this.state.grid[i + 1][j];
      let bottomRight = this.state.grid[i + 1][j + 1];
      if (
        middleLeft === 2 ||
        bottomLeft === 2 ||
        bottomMiddle === 2 ||
        bottomRight === 2 ||
        middleRight === 2
      ) {
        return true;
      }
    } else if (i === 19) {
      let topLeft = this.state.grid[i - 1][j - 1];
      let topMiddle = this.state.grid[i - 1][j];
      let topRight = this.state.grid[i - 1][j + 1];
      let middleLeft = this.state.grid[i][j - 1];
      let middleRight = this.state.grid[i][j + 1];
      if (
        middleLeft === 2 ||
        topLeft === 2 ||
        topMiddle === 2 ||
        topRight === 2 ||
        middleRight === 2
      ) {
        return true;
      }
    } else if (j === 0) {
      let topMiddle = this.state.grid[i - 1][j];
      let topRight = this.state.grid[i - 1][j + 1];
      let middleRight = this.state.grid[i][j + 1];
      let bottomMiddle = this.state.grid[i + 1][j];
      let bottomRight = this.state.grid[i + 1][j + 1];
      if (
        topMiddle === 2 ||
        topRight === 2 ||
        middleRight === 2 ||
        bottomRight === 2 ||
        bottomMiddle === 2
      ) {
        return true;
      }
    } else if (j === 19) {
      let topLeft = this.state.grid[i - 1][j - 1];
      let topMiddle = this.state.grid[i - 1][j];
      let middleLeft = this.state.grid[i][j - 1];
      let bottomLeft = this.state.grid[i + 1][j - 1];
      let bottomMiddle = this.state.grid[i + 1][j];
      if (
        topMiddle === 2 ||
        topLeft === 2 ||
        middleLeft === 2 ||
        bottomLeft === 2 ||
        bottomMiddle === 2
      ) {
        return true;
      }
    } else {
      let topLeft = this.state.grid[i - 1][j - 1];
      let topMiddle = this.state.grid[i - 1][j];
      let topRight = this.state.grid[i - 1][j + 1];
      let middleLeft = this.state.grid[i][j - 1];
      let middleRight = this.state.grid[i][j + 1];
      let bottomLeft = this.state.grid[i + 1][j - 1];
      let bottomMiddle = this.state.grid[i + 1][j];
      let bottomRight = this.state.grid[i + 1][j + 1];
      if (
        topLeft === 2 ||
        topMiddle === 2 ||
        topRight === 2 ||
        middleLeft === 2 ||
        middleRight === 2 ||
        bottomLeft === 2 ||
        bottomRight === 2 ||
        bottomMiddle === 2
      ) {
        return true;
      }
    }

    return false;
  }
  handleMouseHover(event) {
    const value = event.target.getAttribute("data-value");
    const valuesToChange = value.split(",");
    const row = Number(valuesToChange[0]);
    const col = Number(valuesToChange[1]);
    if (row === this.state.rowChanged && col === this.state.colChanged) {
      return;
    }
    // eslint-disable-next-line
    // if ((row == 0 && col == 0) || (row == 19 && col == 19)) {
    //   return;
    // }
    const newGrid = produce(this.state.grid, (copy) => {
      if (1) {
        copy[0][1] = 2;
      }
      if (this.state.grid[row][col] === 1) {
        //do nothing
      } else {
        //check if any neighbours are yellow
        if (this.findNeighbours(row, col)) {
          //if they are execute next line otherwise skip
          // copy[row][col] = this.state.grid[row][col] ? 0 : 2;
          copy[row][col] = 2;
        }
      }
    });
    this.setState(() => {
      return { grid: newGrid, rowChanged: row, colChanged: col };
    });
  }
  reset() {
    this.setState(() => {
      return {
        grid: Array(20)
          .fill(0)
          .map(() => new Array(20).fill(0)),
        start: 1,
      };
    });
  }
  render() {
    let drawMaze;
    if (this.state.start) {
      drawMaze = this.drawMaze();
      this.setState(() => {
        return { start: 0 };
      });
    }
    let gameOver = false;
    if (this.state.grid[18][19] === 2) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "3rem" }}>You completed the maze!</div>
          <button
            style={{
              padding: "10px",
              fontSize: "2rem",
              marginTop: "2rem",
              borderRadius: "4px",
              backgroundColor: "#cad7dd ",
            }}
            onClick={this.reset}
          >
            Play Again!
          </button>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${20}, 35px)`,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.grid.map((rows, i) =>
            rows.map((col, k) => {
              if (k === 0 && i === 0) {
                return (
                  <div
                    data-value={[i, k]}
                    onMouseMove={this.handleMouseHover}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "green",
                      border: "solid 1px black",
                    }}
                  ></div>
                );
              } else if (k === 19 && i === 19) {
                return (
                  <div
                    data-value={[i, k]}
                    onMouseMove={this.handleMouseHover}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "red",
                      border: "solid 1px black",
                    }}
                  ></div>
                );
              } else if (k === 1 && i === 0) {
                return (
                  <div
                    data-value={[i, k]}
                    onMouseMove={this.handleMouseHover}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "yellow",
                      border: "solid 1px black",
                    }}
                  ></div>
                );
              } else {
                return (
                  <div
                    data-value={[i, k]}
                    onMouseMove={this.handleMouseHover}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor:
                        this.state.grid[i][k] < 2
                          ? this.state.grid[i][k] === 1
                            ? "black"
                            : undefined
                          : "yellow",
                      border: "solid 1px black",
                    }}
                  ></div>
                );
              }
            })
          )}
          {drawMaze}
          {gameOver}
        </div>
      );
    }
  }
}
export default Maze;
