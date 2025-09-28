import React, { useState } from 'react';
import type { SimulationConfig } from '../../types';
import {
  PanelHeader,
  BasicParameters,
  HostModelSection,
  PlayerStrategySection,
  RandomnessSection,
  PresetSection
} from './components';
import './ParameterPanel.css';

interface ParameterPanelProps {
  config: SimulationConfig;
  onConfigChange: (config: SimulationConfig) => void;
  disabled?: boolean;
}

export const ParameterPanel: React.FC<ParameterPanelProps> = ({
  config,
  onConfigChange,
  disabled = false
}) => {
  const [localConfig, setLocalConfig] = useState<SimulationConfig>(config);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: keyof SimulationConfig, value: string | number | boolean | object) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);
    setHasChanges(true);
  };

  const handleApplyChanges = () => {
    onConfigChange(localConfig);
    setHasChanges(false);
  };

  const handleResetToDefault = () => {
    const defaultConfig: SimulationConfig = {
      totalRuns: 10000,
      numberOfDoors: 3,
      batchSize: 100,
      hostModel: 'classic',
      playerStrategy: 'alwaysSwitch',
      randomSeed: Math.floor(Math.random() * 1000000),
      hostBias: { weights: { 1: 0.7 }, openProbability: 0.7 },
      silentProbability: 0.2
    };
    setLocalConfig(defaultConfig);
    onConfigChange(defaultConfig);
    setHasChanges(false);
  };

  const handleConfigChange = (newConfig: SimulationConfig) => {
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="parameter-panel">
      <PanelHeader
        hasChanges={hasChanges}
        onApplyChanges={handleApplyChanges}
        onResetToDefault={handleResetToDefault}
        disabled={disabled}
      />

      <div className="panel-content">
        <BasicParameters
          config={localConfig}
          onInputChange={handleInputChange}
          disabled={disabled}
        />

        <HostModelSection
          config={localConfig}
          onInputChange={handleInputChange}
          disabled={disabled}
        />

        <PlayerStrategySection
          config={localConfig}
          onInputChange={handleInputChange}
          disabled={disabled}
        />

        <RandomnessSection
          config={localConfig}
          onInputChange={handleInputChange}
          disabled={disabled}
        />

        <PresetSection
          config={localConfig}
          onConfigChange={handleConfigChange}
          onHasChanges={setHasChanges}
          disabled={disabled}
        />
      </div>
    </div>
  );
};