import React from 'react';
import type { SimulationConfig } from '../../../types';
import { FieldTooltip } from '../../Tooltip/Tooltip';

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
          <label htmlFor="totalRuns">
            总仿真次数
            <FieldTooltip content="设置要运行的模拟次数。次数越多，结果越接近理论概率（2/3）。建议至少10000次以获得稳定结果。" />
          </label>
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
          <label htmlFor="numberOfDoors">
            门的数量
            <FieldTooltip content="设置游戏中门的总数量。经典蒙提霍尔问题使用3扇门，但可以扩展到更多门来研究概率变化。门越多，换门策略的优势越明显。" />
          </label>
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
          <label htmlFor="batchSize">
            批次大小
            <FieldTooltip content="每次处理的仿真数量。较大的批次可以提高处理效率，但会增加单次更新的等待时间。建议设置为100-1000之间以平衡性能和实时反馈。" />
          </label>
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