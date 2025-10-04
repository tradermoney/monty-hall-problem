import type { SimulationConfig, SingleRunRecord, SimulationStats } from '../types';
import seedrandom from 'seedrandom';

export class MontyHallSimulator {
  private rng: seedrandom.PRNG;
  private runId: number = 0;

  constructor(seed?: string) {
    this.rng = seedrandom(seed || Math.random().toString());
  }

  // 生成随机整数 [0, max)
  private randomInt(max: number): number {
    return Math.floor(this.rng() * max);
  }

  // 从数组中随机选择一个元素
  private randomChoice<T>(arr: T[]): T {
    return arr[this.randomInt(arr.length)];
  }

  // 根据权重随机选择
  private weightedRandomChoice<T>(items: T[], weights: number[]): T {
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = this.rng() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return items[i];
      }
    }
    return items[items.length - 1];
  }

  // 运行单次实验
  runSingleExperiment(config: SimulationConfig): SingleRunRecord {
    this.runId++;
    
    const doors = config.numberOfDoors || 3; // 提供默认值
    const prizeDoor = this.randomInt(doors);
    const firstPick = this.randomInt(doors);
    
    let hostOpen: number | undefined;
    let canSwitch = true;

    // 根据主持人模型决定开门行为
    switch (config.hostModel) {
      case 'classic': {
        const openableClassic = Array.from({length: doors}, (_, i) => i)
          .filter(door => door !== firstPick && door !== prizeDoor);
        hostOpen = this.randomChoice(openableClassic);
        canSwitch = true;
        break;
      }

      case 'ignorant': {
        const openableIgnorant = Array.from({length: doors}, (_, i) => i)
          .filter(door => door !== firstPick);
        hostOpen = this.randomChoice(openableIgnorant);
        canSwitch = hostOpen !== prizeDoor; // 如果主持人误开奖，游戏提前结束
        break;
      }

      case 'biased': {
        const openableBiased = Array.from({length: doors}, (_, i) => i)
          .filter(door => door !== firstPick && door !== prizeDoor);
        
        if (config.hostBias?.weights) {
          const weights = openableBiased.map(door => config.hostBias!.weights![door] || 1);
          hostOpen = this.weightedRandomChoice(openableBiased, weights);
        } else {
          hostOpen = this.randomChoice(openableBiased);
        }
        canSwitch = true;
        break;
      }

      case 'sometimesSilent': {
        const openProb = config.hostBias?.openProbability ?? 1;
        if (this.rng() < openProb) {
          // 按照经典模型开门
          const openableSilent = Array.from({length: doors}, (_, i) => i)
            .filter(door => door !== firstPick && door !== prizeDoor);
          hostOpen = this.randomChoice(openableSilent);
          canSwitch = true;
        } else {
          hostOpen = undefined;
          canSwitch = false;
        }
        break;
      }
    }

    // 根据策略决定最终选择
    let finalPick: number;
    let switched: boolean;

    if (!canSwitch || config.playerStrategy === 'neverSwitch') {
      finalPick = firstPick;
      switched = false;
    } else if (config.playerStrategy === 'alwaysSwitch') {
      // 换到另一扇未开的门
      const availableDoors = Array.from({length: doors}, (_, i) => i)
        .filter(door => door !== firstPick && door !== hostOpen);
      finalPick = this.randomChoice(availableDoors);
      switched = true;
    } else { // randomSwitch
      const shouldSwitch = this.rng() < (config.switchProb ?? 0.5);
      if (shouldSwitch && canSwitch) {
        const availableDoors = Array.from({length: doors}, (_, i) => i)
          .filter(door => door !== firstPick && door !== hostOpen);
        finalPick = this.randomChoice(availableDoors);
        switched = true;
      } else {
        finalPick = firstPick;
        switched = false;
      }
    }

    const win = finalPick === prizeDoor;

    return {
      id: this.runId,
      seed: config.randomSeed?.toString(),
      doors: doors,
      hostModel: config.hostModel,
      strategy: config.playerStrategy,
      prizeDoor,
      firstPick,
      hostOpened: hostOpen,
      switched,
      finalPick,
      win
    };
  }

  // 批量运行实验
  runBatchExperiments(config: SimulationConfig, count: number): SingleRunRecord[] {
    const results: SingleRunRecord[] = [];
    for (let i = 0; i < count; i++) {
      results.push(this.runSingleExperiment(config));
    }
    return results;
  }

  // 计算统计数据
  calculateStats(records: SingleRunRecord[]): SimulationStats {
    const totalRuns = records.length;
    const wins = records.filter(r => r.win).length;
    const losses = totalRuns - wins;
    const winRate = totalRuns > 0 ? wins / totalRuns : 0;
    
    // 计算标准误差和置信区间
    const standardError = totalRuns > 0 ? Math.sqrt((winRate * (1 - winRate)) / totalRuns) : 0;
    const marginOfError = 1.96 * standardError; // 95% 置信区间
    
    return {
      totalRuns,
      wins,
      losses,
      winRate,
      standardError,
      confidenceInterval: {
        lower: Math.max(0, winRate - marginOfError),
        upper: Math.min(1, winRate + marginOfError)
      }
    };
  }

  // 重置随机数生成器
  reset(seed?: string) {
    this.rng = seedrandom(seed || Math.random().toString());
    this.runId = 0;
  }
}