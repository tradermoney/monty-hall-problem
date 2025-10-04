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
        <FieldTooltip content="预设配置：快速/标准/高级" />
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