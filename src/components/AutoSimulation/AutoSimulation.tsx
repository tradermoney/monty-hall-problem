import React from 'react';
import { useSimulationStore } from '../../stores/simulationStore';
import { FieldTooltip } from '../Tooltip/Tooltip';
import './AutoSimulation.css';

const AutoSimulation: React.FC = () => {
  const {
    config,
    isRunning,
    isPaused,
    currentProgress,
    totalRuns,
    statsByStrategy,
    setConfig,
    startSimulation,
    pauseSimulation,
    resumeSimulation,
    stopSimulation,
    resetSimulation
  } = useSimulationStore();

  const handleConfigChange = (key: string, value: string | number | boolean | undefined) => {
    setConfig({ [key]: value });
  };

  const formatPercentage = (rate: number) => {
    return (rate * 100).toFixed(2) + '%';
  };

  const formatConfidenceInterval = (stats: { confidenceInterval: { lower: number; upper: number } }) => {
    const { lower, upper } = stats.confidenceInterval;
    return `${(lower * 100).toFixed(2)}% - ${(upper * 100).toFixed(2)}%`;
  };

  return (
    <div className="auto-simulation">
      <h2>自动仿真模式</h2>
      
      {/* 配置面板 */}
      <div className="simulation-config">
        <h3>仿真配置</h3>
        
        <div className="config-grid">
          <div className="config-item">
            <label>
              门的数量
              <FieldTooltip content="门数，经典为3扇" />
            </label>
            <input
              type="number"
              min="3"
              max="200"
              value={config.numberOfDoors}
              onChange={(e) => handleConfigChange('numberOfDoors', parseInt(e.target.value))}
              disabled={isRunning}
            />
          </div>

          <div className="config-item">
            <label>
              总实验次数
              <FieldTooltip content="总实验次数" />
            </label>
            <input
              type="number"
              min="100"
              max="1000000"
              step="100"
              value={config.totalRuns}
              onChange={(e) => handleConfigChange('totalRuns', parseInt(e.target.value))}
              disabled={isRunning}
            />
          </div>

          <div className="config-item">
            <label>
              批次大小
              <FieldTooltip content="每批处理数" />
            </label>
            <input
              type="number"
              min="100"
              max="10000"
              step="100"
              value={config.batchSize}
              onChange={(e) => handleConfigChange('batchSize', parseInt(e.target.value))}
              disabled={isRunning}
            />
          </div>

          <div className="config-item">
            <label>
              主持人模型
              <FieldTooltip content="主持人行为模型" />
            </label>
            <select
              value={config.hostModel}
              onChange={(e) => handleConfigChange('hostModel', e.target.value)}
              disabled={isRunning}
            >
              <option value="classic">经典模式</option>
              <option value="ignorant">无知模式</option>
              <option value="biased">偏好模式</option>
              <option value="sometimesSilent">沉默模式</option>
            </select>
          </div>

          <div className="config-item">
            <label>
              策略
              <FieldTooltip content="玩家决策策略" />
            </label>
            <select
              value={config.playerStrategy}
              onChange={(e) => handleConfigChange('playerStrategy', e.target.value)}
              disabled={isRunning}
            >
              <option value="alwaysSwitch">始终换门</option>
              <option value="neverSwitch">始终不换</option>
              <option value="randomSwitch">随机换门</option>
            </select>
          </div>

          <div className="config-item">
            <label>
              随机种子
              <FieldTooltip content="随机种子，可重现结果" />
            </label>
            <input
              type="number"
              placeholder="留空则随机"
              value={config.randomSeed || ''}
              onChange={(e) => handleConfigChange('randomSeed', e.target.value ? parseInt(e.target.value) : undefined)}
              disabled={isRunning}
            />
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="simulation-controls">
        {!isRunning && !isPaused && (
          <button className="primary-button" onClick={startSimulation}>
            开始仿真
          </button>
        )}
        
        {isRunning && !isPaused && (
          <>
            <button className="secondary-button" onClick={pauseSimulation}>
              暂停
            </button>
            <button className="danger-button" onClick={stopSimulation}>
              停止
            </button>
          </>
        )}
        
        {isPaused && (
          <>
            <button className="primary-button" onClick={resumeSimulation}>
              继续
            </button>
            <button className="danger-button" onClick={stopSimulation}>
              停止
            </button>
          </>
        )}
        
        {totalRuns > 0 && !isRunning && (
          <button className="secondary-button" onClick={resetSimulation}>
            重置
          </button>
        )}
      </div>

      {/* 进度条 */}
      {isRunning && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <div className="progress-text">
            进度: {currentProgress.toFixed(1)}% ({totalRuns.toLocaleString()} / {config.totalRuns.toLocaleString()})
          </div>
        </div>
      )}

      {/* 统计结果 */}
      {totalRuns > 0 && (
        <div className="simulation-results">
          <h3>仿真结果</h3>
          
          <div className="stats-grid">
            {Object.entries(statsByStrategy).map(([strategy, stats]) => (
              <div key={strategy} className="strategy-card">
                <h4>
                  {strategy === 'alwaysSwitch' && '始终换门'}
                  {strategy === 'neverSwitch' && '始终不换'}
                  {strategy === 'randomSwitch' && '随机换门'}
                </h4>
                
                <div className="stat-item">
                  <span className="stat-label">总场次:</span>
                  <span className="stat-value">{stats.totalRuns.toLocaleString()}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">获胜次数:</span>
                  <span className="stat-value">{stats.wins.toLocaleString()}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">胜率:</span>
                  <span className="stat-value highlight">{formatPercentage(stats.winRate)}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">标准误差:</span>
                  <span className="stat-value">{(stats.standardError * 100).toFixed(3)}%</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">95%置信区间:</span>
                  <span className="stat-value">{formatConfidenceInterval(stats)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoSimulation;