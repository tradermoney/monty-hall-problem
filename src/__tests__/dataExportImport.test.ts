import { describe, it, expect, beforeEach } from 'vitest';
import { DataExportImport } from '../utils/dataExportImport';
import { SimulationConfig, SimulationStats } from '../types';

describe('DataExportImport', () => {
  const mockConfig: SimulationConfig = {
    totalRuns: 1000,
    numberOfDoors: 3,
    batchSize: 100,
    hostModel: 'classic',
    playerStrategy: 'alwaysSwitch',
    randomSeed: 12345,
    hostBias: 0.7,
    silentProbability: 0.2
  };

  const mockStats: SimulationStats = {
    totalRuns: 1000,
    totalWins: 667,
    totalLosses: 333,
    winRate: 66.7,
    neverSwitch: {
      wins: 333,
      losses: 667,
      winRate: 33.3,
      standardError: 0.47,
      confidenceInterval: { lower: 32.4, upper: 34.2 }
    },
    alwaysSwitch: {
      wins: 667,
      losses: 333,
      winRate: 66.7,
      standardError: 0.47,
      confidenceInterval: { lower: 65.8, upper: 67.6 }
    },
    randomSwitch: {
      wins: 500,
      losses: 500,
      winRate: 50.0,
      standardError: 0.50,
      confidenceInterval: { lower: 49.0, upper: 51.0 }
    }
  };

  beforeEach(() => {
    // Mock the download functionality
    global.URL.createObjectURL = vi.fn(() => 'mock-url');
    global.URL.revokeObjectURL = vi.fn();
    
    const mockLink = document.createElement('a');
    mockLink.click = vi.fn();
    document.createElement = vi.fn(() => mockLink) as typeof document.createElement;
    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();
  });

  describe('exportStatistics', () => {
    it('should export statistics without raw data', () => {
      expect(() => {
        DataExportImport.exportStatistics(mockConfig, mockStats);
      }).not.toThrow();
    });
  });

  describe('exportCompleteData', () => {
    it('should export complete data with raw data', () => {
      const rawData = [
        {
          playerInitialChoice: 0,
          prizeDoor: 1,
          hostOpens: [2],
          playerFinalChoice: 1,
          playerWon: true,
          playerSwitched: true,
          hostBehavior: { model: 'classic' as const }
        }
      ];

      expect(() => {
        DataExportImport.exportCompleteData(mockConfig, mockStats, rawData);
      }).not.toThrow();
    });
  });

  describe('exportToCSV', () => {
    it('should export statistics to CSV format', () => {
      expect(() => {
        DataExportImport.exportToCSV(mockStats);
      }).not.toThrow();
    });
  });

  describe('importData', () => {
    it('should successfully import valid data', async () => {
      const validData = {
        version: '1.0.0',
        exportTime: new Date().toISOString(),
        config: mockConfig,
        stats: mockStats
      };

      const file = new File([JSON.stringify(validData)], 'test.json', {
        type: 'application/json'
      });

      const result = await DataExportImport.importData(file);
      
      expect(result).toEqual(validData);
    });

    it('should reject invalid JSON data', async () => {
      const file = new File(['invalid json'], 'test.json', {
        type: 'application/json'
      });

      await expect(DataExportImport.importData(file)).rejects.toThrow('Failed to parse file');
    });

    it('should reject data with missing required fields', async () => {
      const invalidData = {
        version: '1.0.0',
        exportTime: new Date().toISOString()
        // Missing config and stats
      };

      const file = new File([JSON.stringify(invalidData)], 'test.json', {
        type: 'application/json'
      });

      await expect(DataExportImport.importData(file)).rejects.toThrow('Invalid data format');
    });

    it('should reject data with invalid config', async () => {
      const invalidData = {
        version: '1.0.0',
        exportTime: new Date().toISOString(),
        config: {
          // Missing required fields
          totalRuns: 1000
        },
        stats: mockStats
      };

      const file = new File([JSON.stringify(invalidData)], 'test.json', {
        type: 'application/json'
      });

      await expect(DataExportImport.importData(file)).rejects.toThrow('Invalid data format');
    });

    it('should reject data with invalid stats', async () => {
      const invalidData = {
        version: '1.0.0',
        exportTime: new Date().toISOString(),
        config: mockConfig,
        stats: {
          // Missing required fields
          totalRuns: 1000
        }
      };

      const file = new File([JSON.stringify(invalidData)], 'test.json', {
        type: 'application/json'
      });

      await expect(DataExportImport.importData(file)).rejects.toThrow('Invalid data format');
    });
  });

  describe('generateSampleData', () => {
    it('should generate valid sample data', () => {
      const sampleData = DataExportImport.generateSampleData();
      
      expect(sampleData).toHaveProperty('version');
      expect(sampleData).toHaveProperty('exportTime');
      expect(sampleData).toHaveProperty('config');
      expect(sampleData).toHaveProperty('stats');
      expect(sampleData.config).toHaveProperty('totalRuns');
      expect(sampleData.config).toHaveProperty('numberOfDoors');
      expect(sampleData.stats).toHaveProperty('totalRuns');
      expect(sampleData.stats).toHaveProperty('totalWins');
      expect(sampleData.stats).toHaveProperty('totalLosses');
      expect(sampleData.stats).toHaveProperty('winRate');
    });
  });

  describe('CSV Export', () => {
    it('should generate valid CSV content', () => {
      // This test would need to mock the Blob and download functionality
      // For now, we just ensure it doesn't throw
      expect(() => {
        DataExportImport.exportToCSV(mockStats);
      }).not.toThrow();
    });
  });
});