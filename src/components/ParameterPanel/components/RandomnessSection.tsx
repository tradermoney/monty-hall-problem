import React from 'react';
import type { SimulationConfig } from '../../../types';
import { FieldTooltip } from '../../Tooltip/Tooltip';

interface RandomnessSectionProps {
  config: SimulationConfig;
  onInputChange: (field: keyof SimulationConfig, value: string | number | boolean | object) => void;
  disabled?: boolean;
}

export const RandomnessSection: React.FC<RandomnessSectionProps> = ({
  config,
  onInputChange,
  disabled = false
}) => {
  return (
    <div className="parameter-section">
      <h3>随机性设置</h3>
      <div className="parameter-item">
        <label htmlFor="randomSeed">
          随机种子
          <FieldTooltip content="设置随机数生成器的种子值。使用相同的种子可以重现完全相同的仿真结果，便于验证和调试。设为0则每次使用不同的随机种子，产生不同的随机序列。" />
        </label>
        <input
          id="randomSeed"
          type="number"
          min="0"
          max="999999"
          value={config.randomSeed}
          onChange={(e) => onInputChange('randomSeed', parseInt(e.target.value))}
          disabled={disabled}
          className="parameter-input"
        />
        <div className="parameter-help">用于重现仿真结果，设为0使用随机种子</div>
      </div>

      <div className="parameter-actions">
        <button
          className="generate-seed-button"
          onClick={() => onInputChange('randomSeed', Math.floor(Math.random() * 1000000))}
          disabled={disabled}
        >
          生成新种子
        </button>
      </div>
    </div>
  );
};