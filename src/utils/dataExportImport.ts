import type { SimulationStats, SingleRunRecord, SimulationConfig } from '../types';

export interface ExportData {
  version: string;
  exportTime: string;
  config: SimulationConfig;
  stats: SimulationStats;
  rawData?: SingleRunRecord[];
}

export class DataExportImport {
  private static readonly CURRENT_VERSION = '1.0.0';

  /**
   * 导出统计数据
   */
  static exportStatistics(config: SimulationConfig, stats: SimulationStats): void {
    const exportData: ExportData = {
      version: this.CURRENT_VERSION,
      exportTime: new Date().toISOString(),
      config,
      stats
    };

    this.downloadFile(exportData, `monty-hall-stats-${Date.now()}.json`);
  }

  /**
   * 导出完整数据（包含原始数据）
   */
  static exportCompleteData(
    config: SimulationConfig, 
    stats: SimulationStats, 
    rawData: SingleRunRecord[]
  ): void {
    const exportData: ExportData = {
      version: this.CURRENT_VERSION,
      exportTime: new Date().toISOString(),
      config,
      stats,
      rawData
    };

    this.downloadFile(exportData, `monty-hall-complete-${Date.now()}.json`);
  }

  /**
   * 导出为CSV格式
   */
  static exportToCSV(stats: SimulationStats): void {
    const csvContent = this.convertStatsToCSV(stats);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `monty-hall-stats-${Date.now()}.csv`;
    link.click();
  }

  /**
   * 导入数据
   */
  static async importData(file: File): Promise<ExportData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content) as ExportData;
          
          // 验证数据格式
          if (!this.validateImportData(data)) {
            reject(new Error('Invalid data format'));
            return;
          }
          
          resolve(data);
        } catch (err) {
          console.error('Parse error:', err);
          reject(new Error('Failed to parse file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  }

  /**
   * 验证导入的数据格式
   */
  private static validateImportData(data: unknown): data is ExportData {
    if (!data || typeof data !== 'object') {
      return false;
    }

    const obj = data as Record<string, unknown>;

    // 检查必需字段
    if (!obj.version || !obj.exportTime || !obj.config || !obj.stats) {
      return false;
    }

    // 检查配置对象
    const config = (obj as Record<string, unknown>).config;
    if (!config.totalRuns || !config.numberOfDoors || !config.hostModel || !config.playerStrategy) {
      return false;
    }

    // 检查统计对象
    const stats = (obj as Record<string, unknown>).stats;
    if (!stats.totalRuns || !stats.totalWins || !stats.totalLosses || !stats.winRate) {
      return false;
    }

    return true;
  }

  /**
   * 下载文件
   */
  private static downloadFile(data: ExportData, filename: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  /**
   * 将统计数据转换为CSV格式
   */
  private static convertStatsToCSV(stats: SimulationStats): string {
    const headers = ['Strategy', 'Wins', 'Losses', 'Win Rate (%)', 'Standard Error', 'CI Lower', 'CI Upper'];
    const rows = [headers.join(',')];

    // 使用基本统计数据
    const row = [
      'Overall',
      stats.wins.toString(),
      stats.losses.toString(),
      stats.winRate.toFixed(2),
      stats.standardError.toFixed(4),
      stats.confidenceInterval.lower.toFixed(4),
      stats.confidenceInterval.upper.toFixed(4)
    ];
    rows.push(row.join(','));

    return rows.join('\n');
  }

  /**
   * 生成示例数据（用于测试）
   */
  static generateSampleData(): ExportData {
    const sampleConfig: SimulationConfig = {
      totalRuns: 10000,
      numberOfDoors: 3,
      batchSize: 100,
      hostModel: 'classic',
      playerStrategy: 'alwaysSwitch',
      randomSeed: 12345,
      hostBias: { weights: { 1: 0.7 }, openProbability: 0.8 },
      silentProbability: 0.2
    };

    const sampleStats: SimulationStats = {
      totalRuns: 10000,
      wins: 6667,
      losses: 3333,
      winRate: 66.67,
      standardError: 0.47,
      confidenceInterval: {
        lower: 65.75,
        upper: 67.59
      }
    };

    return {
      version: this.CURRENT_VERSION,
      exportTime: new Date().toISOString(),
      config: sampleConfig,
      stats: sampleStats
    };
  }
}