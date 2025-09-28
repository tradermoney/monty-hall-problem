import React from 'react';
import type { SimulationConfig, HostModel } from '../../../types';

interface HostModelSectionProps {
  config: SimulationConfig;
  onInputChange: (field: keyof SimulationConfig, value: string | number | boolean | object) => void;
  disabled?: boolean;
}

export const HostModelSection: React.FC<HostModelSectionProps> = ({
  config,
  onInputChange,
  disabled = false
}) => {
  const hostModelDescriptions = {
    'classic': '经典蒙提霍尔：主持人知道门后情况，总是打开有山羊的门',
    'ignorant': '无知主持人：主持人不知道门后情况，可能意外打开有奖品的门',
    'biased': '有偏见主持人：主持人有偏好地选择要打开的门',
    'sometimesSilent': '有时沉默主持人：主持人有时不提供换门机会'
  };

  return (
    <div className="parameter-section">
      <h3>主持人模型</h3>
      <div className="parameter-item full-width">
        <label htmlFor="hostModel">主持人行为模型</label>
        <select
          id="hostModel"
          value={config.hostModel}
          onChange={(e) => onInputChange('hostModel', e.target.value as HostModel)}
          disabled={disabled}
          className="parameter-select"
        >
          <option value="classic">经典主持人</option>
          <option value="ignorant">无知主持人</option>
          <option value="biased">有偏见主持人</option>
          <option value="sometimesSilent">有时沉默主持人</option>
        </select>
        <div className="parameter-description">
          {hostModelDescriptions[config.hostModel]}
        </div>
      </div>

      {config.hostModel === 'biased' && (
        <div className="parameter-item">
          <label htmlFor="hostBias">主持人偏见系数</label>
          <input
            id="hostBias"
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={typeof config.hostBias === 'object' ? config.hostBias.openProbability : 0.5}
            onChange={(e) => onInputChange('hostBias', { weights: { 1: parseFloat(e.target.value) }, openProbability: parseFloat(e.target.value) })}
            disabled={disabled}
            className="parameter-range"
          />
          <div className="range-value">
            {typeof config.hostBias === 'object' 
              ? config.hostBias?.openProbability?.toFixed(1) || '0.5'
              : '0.5'
            }
          </div>
          <div className="parameter-help">值越大，主持人偏见越强</div>
        </div>
      )}

      {config.hostModel === 'sometimesSilent' && (
        <div className="parameter-item">
          <label htmlFor="silentProbability">沉默概率</label>
          <input
            id="silentProbability"
            type="range"
            min="0.0"
            max="1.0"
            step="0.05"
            value={config.silentProbability}
            onChange={(e) => onInputChange('silentProbability', parseFloat(e.target.value))}
            disabled={disabled}
            className="parameter-range"
          />
          <div className="range-value">{((config.silentProbability || 0) * 100).toFixed(0)}%</div>
          <div className="parameter-help">主持人不提供换门建议的概率</div>
        </div>
      )}
    </div>
  );
};