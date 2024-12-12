import React, { useState } from 'react';

const BOARD_SIZE = 15;  // 棋盘的大小（15x15）

// 判定某个方向是否五连
const checkWin = (board, row, col, player) => {
  const directions = [
    { x: 1, y: 0 },  // 横向
    { x: 0, y: 1 },  // 纵向
    { x: 1, y: 1 },  // 斜向（\）
    { x: 1, y: -1 }, // 斜向（/）
  ];

  for (let direction of directions) {
    let count = 1;  // 当前棋子为1
    // 向一个方向检查连续棋子
    for (let step = 1; step < 5; step++) {
      const newRow = row + direction.y * step;
      const newCol = col + direction.x * step;
      if (
        newRow >= 0 && newRow < BOARD_SIZE &&
        newCol >= 0 && newCol < BOARD_SIZE &&
        board[newRow][newCol] === player
      ) {
        count++;
      } else {
        break;
      }
    }
    // 向反方向检查连续棋子
    for (let step = 1; step < 5; step++) {
      const newRow = row - direction.y * step;
      const newCol = col - direction.x * step;
      if (
        newRow >= 0 && newRow < BOARD_SIZE &&
        newCol >= 0 && newCol < BOARD_SIZE &&
        board[newRow][newCol] === player
      ) {
        count++;
      } else {
        break;
      }
    }

    // 如果找到五个棋子连续，则判定胜利
    if (count >= 5) {
      return true;
    }
  }

  return false;
};

// 棋盘组件
const Game = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null))); // 棋盘状态
  const [isBlackTurn, setIsBlackTurn] = useState(true); // 当前是否是黑棋的回合
  const [winner, setWinner] = useState(null); // 胜利玩家（"black" 或 "white"）

  // 处理棋子落子
  const handleClick = (row, col) => {
    if (board[row][col] || winner) {
      return; // 如果该位置已经有棋子或游戏已结束，什么也不做
    }

    // 更新棋盘状态
    const newBoard = board.map(row => [...row]); // 创建棋盘副本
    newBoard[row][col] = isBlackTurn ? 'black' : 'white';
    setBoard(newBoard);

    // 判定是否有玩家胜利
    if (checkWin(newBoard, row, col, isBlackTurn ? 'black' : 'white')) {
      setWinner(isBlackTurn ? 'black' : 'white');
      alert(`${isBlackTurn ? '黑棋' : '白棋'} 胜利！`);
    } else {
      // 轮换回合
      setIsBlackTurn(!isBlackTurn);
    }
  };

  // 渲染棋盘
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            onClick={() => handleClick(rowIndex, colIndex)}
            style={{
              width: 30,
              height: 30,
              backgroundColor: cell ? (cell === 'black' ? 'black' : 'white') : 'lightgray',
              border: '1px solid gray',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>五子棋</h1>
      {winner ? (
        <h2>{winner === 'black' ? '黑棋胜利！' : '白棋胜利！'}</h2>
      ) : (
        <h2>{isBlackTurn ? '黑棋回合' : '白棋回合'}</h2>
      )}
      <div>{renderBoard()}</div>
    </div>
  );
};

export default Game;
