import React from 'react';
import type { SimulationConfig } from '../../../types';

interface BasicParametersProps {
  config: SimulationConfig;
  onInputChange: (field: keyof SimulationConfig, value: string | number | boolean | object) => void;
  disabled?: boolean;
}

export const BasicParameters: React.FC<BasicParametersProps> = ({
  config,
  onInputChange,
  disabled = false
}) => {
  return (
    <div className="parameter-section">
      <h3>基础参数</h3>
      <div className="parameter-grid">
        <div className="parameter-item">
          <label htmlFor="totalRuns">总仿真次数</label>
          <input
            id="totalRuns"
            type="number"
            min="100"
            max="1000000"
            step="100"
            value={config.totalRuns}
            onChange={(e) => onInputChange('totalRuns', parseInt(e.target.value))}
            disabled={disabled}
            className="parameter-input"
          />
          <div className="parameter-help">建议范围: 100 - 1,000,000</div>
        </div>

        <div className="parameter-item">
          <label htmlFor="numberOfDoors">门的数量</label>
          <input
            id="numberOfDoors"
            type="number"
            min="3"
            max="10"
            value={config.numberOfDoors}
            onChange={(e) => onInputChange('numberOfDoors', parseInt(e.target.value))}
            disabled={disabled}
            className="parameter-input"
          />
          <div className="parameter-help">标准蒙提霍尔问题使用3扇门</div>
        </div>

        <div className="parameter-item">
          <label htmlFor="batchSize">批次大小</label>
          <input
            id="batchSize"
            type="number"
            min="10"
            max="10000"
            step="10"
            value={config.batchSize}
            onChange={(e) => onInputChange('batchSize', parseInt(e.target.value))}
            disabled={disabled}
            className="parameter-input"
          />
          <div className="parameter-help">每批处理的仿真次数</div>
        </div>
      </div>
    </div>
  );
};