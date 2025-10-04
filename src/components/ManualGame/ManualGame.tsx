import React from 'react';
import { useManualGameStore } from '../../stores/manualGameStore';
import { FieldTooltip } from '../Tooltip/Tooltip';
import './ManualGame.css';

const ManualGame: React.FC = () => {
  const { gameState, startNewGame, selectDoor, makeSwitchDecision, resetGame } = useManualGameStore();

  const renderDoors = () => {
    const doors = Array.from({ length: gameState.doors }, (_, i) => i);

    return (
      <div className="doors-container">
        {doors.map(doorNumber => {
          // 如果已经做出换门决定，显示最终选择的门；否则显示初始选择的门
          const currentSelectedDoor = gameState.finalDoor !== undefined ? gameState.finalDoor : gameState.selectedDoor;
          const isSelected = currentSelectedDoor === doorNumber;
          const isOpened = gameState.openedDoor === doorNumber;
          const isRevealed = gameState.step === 'revealed' || gameState.step === 'done';
          const hasPrize = gameState.prizeDoor === doorNumber;
          
          let doorState = 'closed';
          if (isOpened) doorState = 'opened';
          else if (isRevealed) doorState = 'revealed';

          return (
            <div
              key={doorNumber}
              className={`door ${doorState} ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                if (gameState.step === 'selected') {
                  selectDoor(doorNumber);
                }
              }}
              role="button"
              aria-label={`门 ${doorNumber + 1}`}
              tabIndex={gameState.step === 'selected' ? 0 : -1}
            >
              <div className="door-number">{doorNumber + 1}</div>
              {doorState === 'opened' && (
                <div className="door-content">🚪</div>
              )}
              {doorState === 'revealed' && (
                <div className="door-content">
                  {hasPrize ? '🎁' : '🚪'}
                </div>
              )}
              {isSelected && (
                <div className="selection-indicator">✓</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const getGameMessage = () => {
    switch (gameState.step) {
      case 'init':
        return '点击"开始新游戏"来开始一局游戏';
      case 'selected':
        return '请选择一扇门';
      case 'decide':
        return '主持人打开了一扇门！你要换门吗？';
      case 'revealed':
      case 'done': {
        if (gameState.result === 'win') {
          const strategy = gameState.switched ? '换门' : '不换门';
          return `🎉 恭喜你赢了！你${strategy}的选择是正确的！奖品就在门 ${gameState.prizeDoor! + 1} 后面。`;
        } else {
          const strategy = gameState.switched ? '换门' : '不换门';
          const correctChoice = gameState.switched ? '不换门' : '换门';
          return `😔 很遗憾，你输了！这次${strategy}不是最佳选择，奖品在门 ${gameState.prizeDoor! + 1} 后面。如果你${correctChoice}就赢了。`;
        }
      }
      default:
        return '';
    }
  };

  return (
    <div className="manual-game">
      <h2>
        手动游戏模式
        <FieldTooltip content="手动游戏体验" />
      </h2>

      <div className="game-message">
        {getGameMessage()}
      </div>

      {gameState.step !== 'init' && renderDoors()}

      <div className="game-controls">
        {gameState.step === 'init' && (
          <button 
            className="primary-button"
            onClick={() => startNewGame(3)}
          >
            开始新游戏
          </button>
        )}

        {gameState.step === 'decide' && (
          <div className="switch-decision">
            <button 
              className="primary-button"
              onClick={() => makeSwitchDecision(true)}
            >
              换门
            </button>
            <button 
              className="secondary-button"
              onClick={() => makeSwitchDecision(false)}
            >
              不换
            </button>
          </div>
        )}

        {gameState.step === 'done' && (
          <button 
            className="primary-button"
            onClick={resetGame}
          >
            重新开始
          </button>
        )}
      </div>

      {gameState.step !== 'init' && gameState.step !== 'selected' && (
        <div className="game-info">
          <p>初始选择: 门 {gameState.selectedDoor !== undefined ? gameState.selectedDoor + 1 : ''}</p>
          {gameState.openedDoor !== undefined && (
            <p>主持人打开: 门 {gameState.openedDoor + 1}</p>
          )}
          {gameState.switched !== undefined && (
            <p>是否换门: {gameState.switched ? '是' : '否'}</p>
          )}
          {gameState.finalDoor !== undefined && (
            <p>最终选择: 门 {gameState.finalDoor + 1}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManualGame;