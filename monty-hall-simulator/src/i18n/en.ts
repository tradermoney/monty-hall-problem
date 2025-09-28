// 英文翻译
export const enTranslations = {
  translation: {
    // 通用
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      reset: 'Reset',
      save: 'Save',
      load: 'Load',
      export: 'Export',
      import: 'Import',
      start: 'Start',
      stop: 'Stop',
      pause: 'Pause',
      resume: 'Resume',
      newGame: 'New Game',
      switch: 'Switch',
      stay: 'Stay',
      yes: 'Yes',
      no: 'No'
    },

    // 导航
    navigation: {
      manualMode: 'Manual Mode',
      autoSimulation: 'Auto Simulation',
      statistics: 'Statistics',
      parameters: 'Parameters',
      settings: 'Settings'
    },

    // 手动模式
    manualGame: {
      title: 'Monty Hall Manual Game',
      selectDoor: 'Please select a door (Door {{door}})',
      hostOpens: 'Host opens Door {{door}}, revealing a goat',
      switchQuestion: 'Do you want to switch to Door {{door}}?',
      youWon: 'Congratulations! You won the prize!',
      youLost: 'Sorry, the prize was behind Door {{door}}',
      finalChoice: 'You finally chose Door {{door}}',
      prizeLocation: 'The prize was originally behind Door {{door}}',
      gameResult: 'Game Result'
    },

    // 自动仿真
    autoSimulation: {
      title: 'Monte Carlo Simulation',
      configTitle: 'Simulation Configuration',
      resultsTitle: 'Simulation Results',
      progress: 'Progress',
      totalRuns: 'Total Runs',
      completed: 'Completed',
      estimatedTime: 'Estimated Time',
      startSimulation: 'Start Simulation',
      pauseSimulation: 'Pause Simulation',
      resumeSimulation: 'Resume Simulation',
      stopSimulation: 'Stop Simulation',
      simulationCompleted: 'Simulation Completed'
    },

    // 统计图表
    statistics: {
      title: 'Simulation Results Statistics',
      strategyComparison: 'Strategy Win Rate Comparison',
      winLossDistribution: 'Overall Win/Loss Distribution',
      detailedStats: 'Detailed Statistics',
      winRateTrend: 'Win Rate Trend (by Batch)',
      strategy: 'Strategy',
      wins: 'Wins',
      losses: 'Losses',
      total: 'Total',
      winRate: 'Win Rate',
      standardError: 'Standard Error',
      confidenceInterval: '95% Confidence Interval',
      neverSwitch: 'Never Switch',
      alwaysSwitch: 'Always Switch',
      randomSwitch: 'Random Switch',
      totalWins: 'Total Wins',
      totalLosses: 'Total Losses'
    },

    // 参数配置
    parameters: {
      title: 'Simulation Parameters Configuration',
      basicParams: 'Basic Parameters',
      hostModel: 'Host Model',
      playerStrategy: 'Player Strategy',
      randomSettings: 'Randomness Settings',
      presetConfigs: 'Preset Configurations',
      totalRuns: 'Total Simulation Runs',
      numberOfDoors: 'Number of Doors',
      batchSize: 'Batch Size',
      hostModelType: 'Host Behavior Model',
      hostBias: 'Host Bias Factor',
      silentProbability: 'Silent Probability',
      playerStrategyType: 'Player Strategy',
      randomSeed: 'Random Seed',
      applyChanges: 'Apply Changes',
      resetToDefault: 'Reset to Default',
      generateNewSeed: 'Generate New Seed',
      quickTest: 'Quick Test',
      standardSimulation: 'Standard Simulation',
      advancedSimulation: 'Advanced Simulation',
      help: {
        totalRuns: 'Recommended range: 100 - 1,000,000',
        numberOfDoors: 'Standard Monty Hall problem uses 3 doors',
        batchSize: 'Number of simulations per batch',
        hostBias: 'Higher value means stronger host bias',
        silentProbability: 'Probability that host does not offer switch option',
        randomSeed: 'For reproducing results, set to 0 for random seed'
      },
      descriptions: {
        classicHost: 'Classic Monty Hall: Host knows what\'s behind doors, always opens door with goat',
        ignorantHost: 'Ignorant Host: Host doesn\'t know what\'s behind doors, may accidentally open prize door',
        biasedHost: 'Biased Host: Host has preference for which door to open',
        sometimesSilentHost: 'Sometimes Silent Host: Host sometimes doesn\'t offer switch option',
        neverSwitchStrategy: 'Never Switch: Stick with initial choice',
        alwaysSwitchStrategy: 'Always Switch: Always accept switch offer',
        randomSwitchStrategy: 'Random Switch: Randomly decide whether to switch'
      }
    },

    // 主题
    theme: {
      title: 'Theme Settings',
      light: 'Light Theme',
      dark: 'Dark Theme',
      auto: 'Auto Theme'
    },

    // 设置
    settings: {
      title: 'Settings',
      description: 'Customize your simulation experience',
      language: 'Language',
      theme: 'Theme',
      appearance: 'Appearance',
      accessibility: 'Accessibility',
      accessibilityFeatures: 'Accessibility Features',
      keyboardNavigation: 'Keyboard navigation support',
      screenReaderSupport: 'Screen reader compatibility',
      highContrastMode: 'High contrast mode',
      focusIndicators: 'Clear focus indicators',
      skipLinks: 'Skip to content links',
      keyboardShortcuts: 'Keyboard Shortcuts',
      navigation: 'Navigation',
      nextElement: 'Next element',
      previousElement: 'Previous element',
      activate: 'Activate',
      closeModal: 'Close modal',
      dataManagement: 'Data Management',
      exportData: 'Export Data',
      importData: 'Import Data',
      clearData: 'Clear Data',
      lightTheme: 'Light Theme',
      darkTheme: 'Dark Theme',
      autoTheme: 'Auto Theme',
      highContrast: 'High Contrast',
      reduceMotion: 'Reduce Motion'
    },

    // 数据
    data: {
      exportTitle: 'Export Simulation Data',
      importTitle: 'Import Simulation Data',
      exportFormats: 'Export Formats',
      exportStatistics: 'Export Statistics',
      exportRawData: 'Export Raw Data',
      selectFile: 'Select File',
      importSuccess: 'Data imported successfully',
      exportSuccess: 'Data exported successfully',
      importError: 'Data import failed',
      exportError: 'Data export failed',
      fileFormatError: 'Invalid file format',
      noDataToExport: 'No data to export'
    },

    // 数据管理器
    dataManager: {
      title: 'Data Management',
      description: 'Export and import simulation data in multiple formats',
      export: 'Export Data',
      import: 'Import Data',
      exportStats: 'Export Statistics',
      exportComplete: 'Export Complete Data',
      exportCSV: 'Export CSV',
      generateSample: 'Generate Sample Data',
      importSuccess: 'Data imported successfully!',
      importError: 'Data import failed: ',
      fileFormat: 'File Format Information',
      jsonFormat: 'JSON Format',
      jsonFormatDesc: 'Contains complete configuration and statistics data, can be used for full simulation state recovery',
      csvFormat: 'CSV Format',
      csvFormatDesc: 'Contains only statistics data, suitable for analysis in spreadsheet software',
      exportStatsTooltip: 'Export current statistics data in JSON format',
      exportCompleteTooltip: 'Export complete data including configuration, statistics and raw data',
      exportCSVTooltip: 'Export statistics data in CSV format',
      importTooltip: 'Import data from JSON file',
      generateSampleTooltip: 'Generate sample data for testing'
    },

    // 错误
    errors: {
      invalidConfiguration: 'Invalid configuration parameters',
      simulationFailed: 'Simulation execution failed',
      dataProcessingError: 'Data processing error',
      fileReadError: 'File read error',
      networkError: 'Network error',
      unknownError: 'Unknown error'
    }
  }
};