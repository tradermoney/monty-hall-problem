// 中文翻译
export const zhTranslations = {
  translation: {
    // 通用
    common: {
      confirm: '确认',
      cancel: '取消',
      reset: '重置',
      save: '保存',
      load: '加载',
      export: '导出',
      import: '导入',
      start: '开始',
      stop: '停止',
      pause: '暂停',
      resume: '继续',
      newGame: '新游戏',
      switch: '换门',
      stay: '坚持',
      yes: '是',
      no: '否'
    },

    // 导航
    navigation: {
      manualMode: '手动模式',
      autoSimulation: '自动仿真',
      statistics: '统计图表',
      parameters: '参数配置',
      settings: '设置'
    },

    // 手动模式
    manualGame: {
      title: '蒙提霍尔手动游戏',
      selectDoor: '请选择一扇门（门 {{door}}）',
      hostOpens: '主持人打开了门 {{door}}，后面是山羊',
      switchQuestion: '你要换到门 {{door}} 吗？',
      youWon: '恭喜你！你赢得了奖品！',
      youLost: '很遗憾，奖品在门 {{door}} 后面',
      finalChoice: '你最终选择了门 {{door}}',
      prizeLocation: '奖品原本在门 {{door}} 后面',
      gameResult: '游戏结果'
    },

    // 自动仿真
    autoSimulation: {
      title: '蒙特卡洛仿真',
      configTitle: '仿真配置',
      resultsTitle: '仿真结果',
      progress: '进度',
      totalRuns: '总次数',
      completed: '已完成',
      estimatedTime: '预计时间',
      startSimulation: '开始仿真',
      pauseSimulation: '暂停仿真',
      resumeSimulation: '继续仿真',
      stopSimulation: '停止仿真',
      simulationCompleted: '仿真完成'
    },

    // 统计图表
    statistics: {
      title: '仿真结果统计图表',
      strategyComparison: '策略胜率对比',
      winLossDistribution: '总体胜负分布',
      detailedStats: '详细统计数据',
      winRateTrend: '胜率趋势（按批次）',
      strategy: '策略',
      wins: '胜利次数',
      losses: '失败次数',
      total: '总次数',
      winRate: '胜率',
      standardError: '标准误差',
      confidenceInterval: '95%置信区间',
      neverSwitch: '从不换门',
      alwaysSwitch: '总是换门',
      randomSwitch: '随机换门',
      totalWins: '总胜利',
      totalLosses: '总失败'
    },

    // 参数配置
    parameters: {
      title: '仿真参数配置',
      basicParams: '基础参数',
      hostModel: '主持人模型',
      playerStrategy: '玩家策略',
      randomSettings: '随机性设置',
      presetConfigs: '预设配置',
      totalRuns: '总仿真次数',
      numberOfDoors: '门的数量',
      batchSize: '批次大小',
      hostModelType: '主持人行为模型',
      hostBias: '主持人偏见系数',
      silentProbability: '沉默概率',
      playerStrategyType: '玩家策略',
      randomSeed: '随机种子',
      applyChanges: '应用更改',
      resetToDefault: '重置为默认',
      generateNewSeed: '生成新种子',
      quickTest: '快速测试',
      standardSimulation: '标准仿真',
      advancedSimulation: '高级仿真',
      help: {
        totalRuns: '建议范围: 100 - 1,000,000',
        numberOfDoors: '标准蒙提霍尔问题使用3扇门',
        batchSize: '每批处理的仿真次数',
        hostBias: '值越大，主持人偏见越强',
        silentProbability: '主持人不提供换门建议的概率',
        randomSeed: '用于重现仿真结果，设为0使用随机种子'
      },
      descriptions: {
        classicHost: '经典蒙提霍尔：主持人知道门后情况，总是打开有山羊的门',
        ignorantHost: '无知主持人：主持人不知道门后情况，可能意外打开有奖品的门',
        biasedHost: '有偏见主持人：主持人有偏好地选择要打开的门',
        sometimesSilentHost: '有时沉默主持人：主持人有时不提供换门机会',
        neverSwitchStrategy: '从不换门：坚持最初的选择',
        alwaysSwitchStrategy: '总是换门：总是接受换门建议',
        randomSwitchStrategy: '随机换门：随机决定是否换门'
      }
    },

    // 主题
    theme: {
      title: '主题设置',
      light: '浅色主题',
      dark: '深色主题',
      auto: '自动主题'
    },

    // 设置
    settings: {
      title: '设置',
      description: '自定义您的仿真体验',
      appearance: '外观',
      language: '语言',
      accessibility: '无障碍',
      accessibilityFeatures: '无障碍功能',
      keyboardNavigation: '键盘导航支持',
      screenReaderSupport: '屏幕阅读器兼容',
      highContrastMode: '高对比度模式',
      focusIndicators: '清晰的焦点指示器',
      skipLinks: '跳转到内容链接',
      keyboardShortcuts: '键盘快捷键',
      navigation: '导航',
      nextElement: '下一个元素',
      previousElement: '上一个元素',
      activate: '激活',
      closeModal: '关闭模态框',
      dataManagement: '数据管理',
      exportData: '导出数据',
      importData: '导入数据',
      clearData: '清除数据',
      lightTheme: '浅色主题',
      darkTheme: '深色主题',
      autoTheme: '自动主题',
      highContrast: '高对比度',
      reduceMotion: '减少动画'
    },

    // 数据
    data: {
      exportTitle: '导出仿真数据',
      importTitle: '导入仿真数据',
      exportFormats: '导出格式',
      exportStatistics: '导出统计',
      exportRawData: '导出原始数据',
      selectFile: '选择文件',
      importSuccess: '数据导入成功',
      exportSuccess: '数据导出成功',
      importError: '数据导入失败',
      exportError: '数据导出失败',
      fileFormatError: '文件格式错误',
      noDataToExport: '没有可导出的数据'
    },

    // 数据管理器
    dataManager: {
      title: '数据管理',
      description: '导出和导入仿真数据，支持多种格式',
      export: '导出数据',
      import: '导入数据',
      exportStats: '导出统计数据',
      exportComplete: '导出完整数据',
      exportCSV: '导出CSV格式',
      generateSample: '生成示例数据',
      importSuccess: '数据导入成功！',
      importError: '数据导入失败：',
      fileFormat: '文件格式说明',
      jsonFormat: 'JSON格式',
      jsonFormatDesc: '包含完整的配置和统计数据，可用于完整恢复仿真状态',
      csvFormat: 'CSV格式',
      csvFormatDesc: '仅包含统计数据，适合在电子表格软件中分析',
      exportStatsTooltip: '导出当前统计数据为JSON格式',
      exportCompleteTooltip: '导出完整数据包括配置、统计和原始数据',
      exportCSVTooltip: '导出统计数据为CSV格式',
      importTooltip: '从JSON文件导入数据',
      generateSampleTooltip: '生成示例数据用于测试'
    },

    // 错误
    errors: {
      invalidConfiguration: '配置参数无效',
      simulationFailed: '仿真执行失败',
      dataProcessingError: '数据处理错误',
      fileReadError: '文件读取错误',
      networkError: '网络错误',
      unknownError: '未知错误'
    }
  }
};