import React from 'react';
import type { SimulationConfig } from '../../../types';
import { FieldTooltip } from '../../Tooltip/Tooltip';

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
        <label htmlFor="playerStrategy">
          玩家策略
          <FieldTooltip content="选择玩家的决策策略。'从不换门'坚持初始选择（胜率约1/3）；'总是换门'接受所有换门建议（胜率约2/3）；'随机换门'随机决定是否换门（胜率约1/2）。这是验证蒙提霍尔问题的核心参数。" />
        </label>
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