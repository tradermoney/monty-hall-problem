import React from 'react';
import type { SimulationConfig } from '../../../types';
import { FieldTooltip } from '../../Tooltip/Tooltip';

interface PresetSectionProps {
  config: SimulationConfig;
  onConfigChange: (config: SimulationConfig) => void;
  onHasChanges: (hasChanges: boolean) => void;
  disabled?: boolean;
}

export const PresetSection: React.FC<PresetSectionProps> = ({
  config,
  onConfigChange,
  onHasChanges,
  disabled = false
}) => {
  const applyPreset = (preset: SimulationConfig) => {
    onConfigChange(preset);
    onHasChanges(false);
  };

  return (
    <div className="parameter-section">
      <h3>
        预设配置
        <FieldTooltip content="快速应用常用的参数组合。快速测试用于快速验证（1000次）；标准仿真用于常规分析（10000次）；高级仿真用于深入研究，包含更多门和复杂主持人模型（100000次）。" />
      </h3>
      <div className="preset-buttons">
        <button
          className="preset-button"
          onClick={() => {
            const preset: SimulationConfig = {
              ...config,
              totalRuns: 1000,
              numberOfDoors: 3,
              hostModel: 'classic',
              playerStrategy: 'alwaysSwitch'
            };
            applyPreset(preset);
          }}
          disabled={disabled}
        >
          快速测试
        </button>
        <button
          className="preset-button"
          onClick={() => {
            const preset: SimulationConfig = {
              ...config,
              totalRuns: 10000,
              numberOfDoors: 3,
              hostModel: 'classic',
              playerStrategy: 'alwaysSwitch'
            };
            applyPreset(preset);
          }}
          disabled={disabled}
        >
          标准仿真
        </button>
        <button
          className="preset-button"
          onClick={() => {
            const preset: SimulationConfig = {
              ...config,
              totalRuns: 100000,
              numberOfDoors: 5,
              hostModel: 'biased',
              hostBias: { weights: { 1: 0.8 }, openProbability: 0.8 },
              playerStrategy: 'randomSwitch'
            };
            applyPreset(preset);
          }}
          disabled={disabled}
        >
          高级仿真
        </button>
      </div>
    </div>
  );
};