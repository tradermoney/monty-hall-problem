import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataExportImport, type ExportData } from '../../utils/dataExportImport';
import type { SimulationConfig, SimulationStats, SingleRunRecord } from '../../types';
import { FieldTooltip } from '../Tooltip/Tooltip';
import './DataManager.css';

interface DataManagerProps {
  config: SimulationConfig;
  stats: SimulationStats;
  rawData?: SingleRunRecord[];
  onImport?: (data: ExportData) => void;
}

export const DataManager: React.FC<DataManagerProps> = ({ 
  config, 
  stats, 
  rawData, 
  onImport 
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleExportStats = () => {
    DataExportImport.exportStatistics(config, stats);
  };

  const handleExportComplete = () => {
    DataExportImport.exportCompleteData(config, stats, rawData || []);
  };

  const handleExportCSV = () => {
    DataExportImport.exportToCSV(stats);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await DataExportImport.importData(file);
      setImportMessage(t('dataManager.importSuccess'));
      setMessageType('success');
      
      if (onImport) {
        onImport(data);
      }
    } catch (err) {
      console.error('Import error:', err);
      setImportMessage(t('dataManager.importError'));
      setMessageType('error');
    }

    // 清空文件输入
    event.target.value = '';
    
    // 3秒后清除消息
    setTimeout(() => {
      setImportMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleGenerateSample = () => {
    const sampleData = DataExportImport.generateSampleData();
    DataExportImport.exportStatistics(sampleData.config, sampleData.stats);
  };

  return (
    <div className="data-manager">
      <div className="data-manager-header">
        <h3>{t('dataManager.title')}</h3>
        <p className="data-manager-description">
          {t('dataManager.description')}
        </p>
      </div>

      <div className="data-manager-actions">
        <div className="action-group">
          <h4>
            {t('dataManager.export')}
            <FieldTooltip content="导出数据到本地" />
          </h4>
          <div className="button-group">
            <button
              className="data-button primary"
              onClick={handleExportStats}
              title={t('dataManager.exportStatsTooltip')}
            >
              {t('dataManager.exportStats')}
            </button>
            <button
              className="data-button primary"
              onClick={handleExportComplete}
              title={t('dataManager.exportCompleteTooltip')}
            >
              {t('dataManager.exportComplete')}
            </button>
            <button
              className="data-button secondary"
              onClick={handleExportCSV}
              title={t('dataManager.exportCSVTooltip')}
            >
              {t('dataManager.exportCSV')}
            </button>
          </div>
        </div>

        <div className="action-group">
          <h4>
            {t('dataManager.import')}
            <FieldTooltip content="导入数据或示例" />
          </h4>
          <div className="button-group">
            <button
              className="data-button primary"
              onClick={handleImportClick}
              title={t('dataManager.importTooltip')}
            >
              {t('dataManager.import')}
            </button>
            <button
              className="data-button secondary"
              onClick={handleGenerateSample}
              title={t('dataManager.generateSampleTooltip')}
            >
              {t('dataManager.generateSample')}
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileImport}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {importMessage && (
        <div className={`import-message ${messageType}`}>
          {importMessage}
        </div>
      )}

      <div className="data-manager-info">
        <h4>{t('dataManager.fileFormat')}</h4>
        <div className="format-info">
          <div className="format-item">
            <strong>{t('dataManager.jsonFormat')}:</strong>
            <p>{t('dataManager.jsonFormatDesc')}</p>
          </div>
          <div className="format-item">
            <strong>{t('dataManager.csvFormat')}:</strong>
            <p>{t('dataManager.csvFormatDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};