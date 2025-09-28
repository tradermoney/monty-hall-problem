import { create } from 'zustand';
import type { SimulationConfig, SingleRunRecord, SimulationStats, StrategyComparison } from '../types';
import { MontyHallSimulator } from '../core/simulator';

interface SimulationStore {
  config: SimulationConfig;
  isRunning: boolean;
  isPaused: boolean;
  currentProgress: number;
  totalRuns: number;
  
  // 结果数据
  allRecords: SingleRunRecord[];
  statsByStrategy: StrategyComparison;
  
  // 动作
  setConfig: (config: Partial<SimulationConfig>) => void;
  startSimulation: () => Promise<void>;
  pauseSimulation: () => void;
  resumeSimulation: () => Promise<void>;
  stopSimulation: () => void;
  resetSimulation: () => void;
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  config: {
    totalRuns: 10000,
    numberOfDoors: 3,
    hostModel: 'classic',
    playerStrategy: 'alwaysSwitch',
    batchSize: 1000,
    randomSeed: undefined
  },
  isRunning: false,
  isPaused: false,
  currentProgress: 0,
  totalRuns: 0,
  allRecords: [],
  statsByStrategy: {
    alwaysSwitch: {
      totalRuns: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      standardError: 0,
      confidenceInterval: { lower: 0, upper: 0 }
    },
    neverSwitch: {
      totalRuns: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      standardError: 0,
      confidenceInterval: { lower: 0, upper: 0 }
    },
    randomSwitch: {
      totalRuns: 0,
      wins: 0,
      losses: 0,
      winRate: 0,
      standardError: 0,
      confidenceInterval: { lower: 0, upper: 0 }
    }
  },

  setConfig: (configUpdate) => {
    set(state => ({
      config: { ...state.config, ...configUpdate }
    }));
  },

  startSimulation: async () => {
    const { config } = get();
    const simulator = new MontyHallSimulator(config.randomSeed?.toString());
    
    set({
      isRunning: true,
      isPaused: false,
      currentProgress: 0,
      totalRuns: 0,
      allRecords: []
    });

    const allRecords: SingleRunRecord[] = [];
    const batchSize = config.batchSize;
    const runs = config.totalRuns || 10000;
    
    // 为每种策略运行相同数量的模拟
    const strategies: Array<'alwaysSwitch' | 'neverSwitch' | 'randomSwitch'> = ['alwaysSwitch', 'neverSwitch', 'randomSwitch'];
    const runsPerStrategy = Math.floor(runs / strategies.length);
    const totalBatches = Math.ceil((runsPerStrategy * strategies.length) / batchSize);
    let currentBatch = 0;

    for (const strategy of strategies) {
      if (get().isPaused || !get().isRunning) break;

      const strategyConfig = { ...config, playerStrategy: strategy };
      const strategyBatches = Math.ceil(runsPerStrategy / batchSize);

      for (let batch = 0; batch < strategyBatches; batch++) {
        if (get().isPaused || !get().isRunning) break;

        const remainingRuns = runsPerStrategy - batch * batchSize;
        const currentBatchSize = Math.min(batchSize, remainingRuns);
        
        // 运行当前批次
        const batchRecords = await runBatchAsync(simulator, strategyConfig, currentBatchSize);
        allRecords.push(...batchRecords);
        
        // 更新进度
        currentBatch++;
        const progress = (currentBatch / totalBatches) * 100;
        const totalRuns = allRecords.length;
        
        set({
          currentProgress: progress,
          totalRuns,
          allRecords: [...allRecords]
        });

        // 让出控制权，避免阻塞UI
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    }

    // 计算最终统计
    const statsByStrategy = calculateStrategyStats(allRecords);
    
    set({
      isRunning: false,
      isPaused: false,
      statsByStrategy
    });
  },

  pauseSimulation: () => {
    set({ isPaused: true });
  },

  resumeSimulation: async () => {
    set({ isPaused: false });
    await get().startSimulation();
  },

  stopSimulation: () => {
    set({ 
      isRunning: false, 
      isPaused: false 
    });
  },

  resetSimulation: () => {
    set({
      isRunning: false,
      isPaused: false,
      currentProgress: 0,
      totalRuns: 0,
      allRecords: [],
      statsByStrategy: {
        alwaysSwitch: {
          totalRuns: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
          standardError: 0,
          confidenceInterval: { lower: 0, upper: 0 }
        },
        neverSwitch: {
          totalRuns: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
          standardError: 0,
          confidenceInterval: { lower: 0, upper: 0 }
        },
        randomSwitch: {
          totalRuns: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
          standardError: 0,
          confidenceInterval: { lower: 0, upper: 0 }
        }
      }
    });
  }
}));

// 异步运行批次
async function runBatchAsync(
  simulator: MontyHallSimulator,
  config: SimulationConfig,
  count: number
): Promise<SingleRunRecord[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const records = simulator.runBatchExperiments(config, count);
      resolve(records);
    }, 0);
  });
}

// 计算策略统计
function calculateStrategyStats(records: SingleRunRecord[]): StrategyComparison {
  const alwaysSwitchRecords = records.filter(r => r.strategy === 'alwaysSwitch');
  const neverSwitchRecords = records.filter(r => r.strategy === 'neverSwitch');
  const randomSwitchRecords = records.filter(r => r.strategy === 'randomSwitch');

  const simulator = new MontyHallSimulator();

  return {
    alwaysSwitch: alwaysSwitchRecords.length > 0 
      ? simulator.calculateStats(alwaysSwitchRecords)
      : createEmptyStats(),
    neverSwitch: neverSwitchRecords.length > 0
      ? simulator.calculateStats(neverSwitchRecords)
      : createEmptyStats(),
    randomSwitch: randomSwitchRecords.length > 0
      ? simulator.calculateStats(randomSwitchRecords)
      : createEmptyStats()
  };
}

function createEmptyStats(): SimulationStats {
  return {
    totalRuns: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    standardError: 0,
    confidenceInterval: { lower: 0, upper: 0 }
  };
}