import React from 'react';

interface PanelHeaderProps {
  hasChanges: boolean;
  onApplyChanges: () => void;
  onResetToDefault: () => void;
  disabled?: boolean;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  hasChanges,
  onApplyChanges,
  onResetToDefault,
  disabled = false
}) => {
  return (
    <div className="panel-header">
      <h2>仿真参数配置</h2>
      <div className="panel-actions">
        {hasChanges && (
          <button 
            className="apply-button"
            onClick={onApplyChanges}
            disabled={disabled}
          >
            应用更改
          </button>
        )}
        <button 
          className="reset-button"
          onClick={onResetToDefault}
          disabled={disabled}
        >
          重置为默认
        </button>
      </div>
    </div>
  );
};