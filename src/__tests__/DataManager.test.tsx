import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { DataManager } from '../components/DataManager/DataManager';
import { DataExportImport } from '../utils/dataExportImport';

// Mock the DataExportImport utility
vi.mock('../utils/dataExportImport', () => ({
  DataExportImport: {
    exportStatistics: vi.fn(),
    exportCompleteData: vi.fn(),
    exportToCSV: vi.fn(),
    importData: vi.fn(),
    generateSampleData: vi.fn(() => ({
      version: '1.0.0',
      exportTime: new Date().toISOString(),
      config: { totalRuns: 100 },
      stats: { totalWins: 50 }
    }))
  }
}));

describe('DataManager Component', () => {
  const mockConfig = {
    totalRuns: 1000,
    numberOfDoors: 3,
    batchSize: 100,
    hostModel: 'classic' as const,
    playerStrategy: 'alwaysSwitch' as const,
    randomSeed: 12345,
    hostBias: { weights: {}, openProbability: 0.7 },
    silentProbability: 0.2
  };

  const mockStats = {
    totalRuns: 1000,
    wins: 667,
    losses: 333,
    winRate: 66.7,
    standardError: 0.47,
    confidenceInterval: { lower: 32.4, upper: 34.2 }
  };

  const renderWithI18n = (component: React.ReactElement) => {
    return render(
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render data manager component', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    expect(screen.getByText('数据管理')).toBeInTheDocument();
    expect(screen.getByText('导出数据')).toBeInTheDocument();
    expect(screen.getByText('导入数据')).toBeInTheDocument();
  });

  it('should handle export statistics button click', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const exportStatsButton = screen.getByText('导出统计数据 (JSON)');
    fireEvent.click(exportStatsButton);
    
    expect(DataExportImport.exportStatistics).toHaveBeenCalledWith(mockConfig, mockStats);
  });

  it('should handle export complete data button click', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const exportCompleteButton = screen.getByText('导出完整数据 (JSON)');
    fireEvent.click(exportCompleteButton);
    
    expect(DataExportImport.exportCompleteData).toHaveBeenCalledWith(
      mockConfig,
      mockStats,
      []
    );
  });

  it('should handle export CSV button click', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const exportCSVButton = screen.getByText('导出统计数据 (CSV)');
    fireEvent.click(exportCSVButton);
    
    expect(DataExportImport.exportToCSV).toHaveBeenCalledWith(mockStats);
  });

  it('should handle generate sample data button click', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const generateSampleButton = screen.getByText('生成示例数据');
    fireEvent.click(generateSampleButton);
    
    expect(DataExportImport.generateSampleData).toHaveBeenCalled();
  });

  it('should handle file import', async () => {
    const mockFileData = {
      version: '1.0.0',
      exportTime: new Date().toISOString(),
      config: mockConfig,
      stats: mockStats
    };

    (DataExportImport.importData as jest.MockedFunction<typeof DataExportImport.importData>).mockResolvedValue(mockFileData);

    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const fileInput = screen.getByLabelText('选择文件');
    const file = new File(['test content'], 'test.json', {
      type: 'application/json'
    });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(DataExportImport.importData).toHaveBeenCalledWith(file);
    });
  });

  it('should show success message on successful import', async () => {
    const mockFileData = {
      version: '1.0.0',
      exportTime: new Date().toISOString(),
      config: mockConfig,
      stats: mockStats
    };

    (DataExportImport.importData as jest.MockedFunction<typeof DataExportImport.importData>).mockResolvedValue(mockFileData);

    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const fileInput = screen.getByLabelText('选择文件');
    const file = new File(['test content'], 'test.json', {
      type: 'application/json'
    });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('数据导入成功！')).toBeInTheDocument();
    });
  });

  it('should show error message on failed import', async () => {
    (DataExportImport.importData as jest.MockedFunction<typeof DataExportImport.importData>).mockRejectedValue(new Error('Import failed'));

    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const fileInput = screen.getByLabelText('选择文件');
    const file = new File(['invalid content'], 'test.json', {
      type: 'application/json'
    });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('数据导入失败：Import failed')).toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const dataManager = screen.getByRole('region');
    expect(dataManager).toHaveAttribute('aria-label', 'Data Manager');
  });

  it('should be responsive', () => {
    renderWithI18n(<DataManager config={mockConfig} stats={mockStats} />);
    
    const dataManager = screen.getByRole('region');
    expect(dataManager).toHaveClass('data-manager');
  });
});