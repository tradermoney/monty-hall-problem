// 主持人行为模型
export type HostModel = 'classic' | 'ignorant' | 'biased' | 'sometimesSilent';

// 主持人偏好设置
export interface HostBias {
  weights?: Record<number, number>;
  openProbability?: number;
}

// 仿真配置
export interface SimulationConfig {
  totalRuns: number;
  numberOfDoors: number;
  hostModel: HostModel;
  hostBias?: HostBias;
  playerStrategy: 'alwaysSwitch' | 'neverSwitch' | 'randomSwitch';
  switchProb?: number;
  batchSize: number;
  randomSeed?: number;
  silentProbability?: number;
  doors?: number;
  strategy?: 'alwaysSwitch' | 'neverSwitch' | 'randomSwitch';
  runs?: number;
  seed?: string;
}

// 手动游戏状态
export interface ManualGameState {
  doors: number;
  prizeDoor: number;
  selectedDoor?: number;
  openedDoor?: number;
  switched?: boolean;
  finalDoor?: number;
  result?: 'win' | 'lose';
  step: 'init' | 'selected' | 'opened' | 'decide' | 'revealed' | 'done';
}

// 单次实验记录
export interface SingleRunRecord {
  id: number;
  seed?: string;
  doors: number;
  hostModel: HostModel;
  strategy: SimulationConfig['playerStrategy'];
  prizeDoor: number;
  firstPick: number;
  hostOpened?: number;
  switched: boolean;
  finalPick: number;
  win: boolean;
  timestamp?: number;
}

// 统计结果
export interface SimulationStats {
  totalRuns: number;
  wins: number;
  losses: number;
  winRate: number;
  standardError: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
}

// 策略对比统计
export interface StrategyComparison {
  alwaysSwitch: SimulationStats;
  neverSwitch: SimulationStats;
  randomSwitch: SimulationStats;
}

// 统计信息
export interface StatisticsInfo {
  totalRuns: number;
  totalWins: number;
  totalLosses: number;
  winRate: number;
  neverSwitch?: SimulationStats;
  alwaysSwitch?: SimulationStats;
  randomSwitch?: SimulationStats;
}