import React from 'react';
import type { SimulationConfig } from '../../../types';

interface PlayerStrategySectionProps {
  config: SimulationConfig;
  onInputChange: (field: keyof SimulationConfig, value: string | number | boolean | object) => void;
  disabled?: boolean;
}

export const PlayerStrategySection: React.FC<PlayerStrategySectionProps> = ({
  config,
  onInputChange,
  disabled = false
}) => {
  const strategyDescriptions = {
    neverSwitch: '从不换门：坚持最初的选择',
    alwaysSwitch: '总是换门：总是接受换门建议',
    randomSwitch: '随机换门：随机决定是否换门'
  };

  return (
    <div className="parameter-section">
      <h3>玩家策略</h3>
      <div className="parameter-item full-width">
        <label htmlFor="playerStrategy">玩家策略</label>
        <select
          id="playerStrategy"
          value={config.playerStrategy}
          onChange={(e) => onInputChange('playerStrategy', e.target.value)}
          disabled={disabled}
          className="parameter-select"
        >
          <option value="neverSwitch">从不换门</option>
          <option value="alwaysSwitch">总是换门</option>
          <option value="randomSwitch">随机换门</option>
        </select>
        <div className="parameter-description">
          {strategyDescriptions[config.playerStrategy as keyof typeof strategyDescriptions]}
        </div>
      </div>
    </div>
  );
};