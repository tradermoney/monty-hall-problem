import { describe, it, expect, beforeEach } from 'vitest';
import { MontyHallSimulator } from '../core/simulator';
import { HostModel, PlayerStrategy } from '../types';

describe('MontyHallSimulator', () => {
  let simulator: MontyHallSimulator;

  beforeEach(() => {
    simulator = new MontyHallSimulator();
  });

  describe('Basic Functionality', () => {
    it('should create a simulator instance', () => {
      expect(simulator).toBeInstanceOf(MontyHallSimulator);
    });

    it('should reset random seed', () => {
      simulator.setRandomSeed(12345);
      expect(() => simulator.setRandomSeed(54321)).not.toThrow();
    });
  });

  describe('Single Experiment', () => {
    it('should run a single experiment with classic host and always switch strategy', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2
      });

      expect(result).toHaveProperty('playerInitialChoice');
      expect(result).toHaveProperty('prizeDoor');
      expect(result).toHaveProperty('hostOpens');
      expect(result).toHaveProperty('playerFinalChoice');
      expect(result).toHaveProperty('playerWon');
      expect(result).toHaveProperty('playerSwitched');
      expect(result).toHaveProperty('hostBehavior');
      expect(typeof result.playerWon).toBe('boolean');
      expect([true, false]).toContain(result.playerWon);
    });

    it('should run a single experiment with never switch strategy', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'neverSwitch',
        hostBias: 0.7,
        silentProbability: 0.2
      });

      expect(result.playerSwitched).toBe(false);
      expect(result.playerInitialChoice).toBe(result.playerFinalChoice);
    });
  });

  describe('Batch Simulation', () => {
    it('should run batch simulation', async () => {
      const results = await simulator.runBatchSimulation({
        totalRuns: 100,
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2,
        randomSeed: 12345
      });

      expect(results).toHaveLength(100);
      expect(results.every(r => typeof r.playerWon === 'boolean')).toBe(true);
    });

    it('should calculate statistics correctly', async () => {
      const results = await simulator.runBatchSimulation({
        totalRuns: 1000,
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2,
        randomSeed: 12345
      });

      const stats = simulator.calculateStatistics(results);

      expect(stats).toHaveProperty('totalRuns', 1000);
      expect(stats).toHaveProperty('totalWins');
      expect(stats).toHaveProperty('totalLosses');
      expect(stats).toHaveProperty('winRate');
      expect(stats).toHaveProperty('standardError');
      expect(stats).toHaveProperty('confidenceInterval');
      expect(stats.totalWins + stats.totalLosses).toBe(1000);
      expect(stats.winRate).toBeGreaterThanOrEqual(0);
      expect(stats.winRate).toBeLessThanOrEqual(100);
    });
  });

  describe('Host Models', () => {
    it('should handle classic host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2
      });

      expect(result.hostBehavior.model).toBe('classic');
      expect(result.hostOpens.length).toBe(1);
    });

    it('should handle ignorant host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'ignorant',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2
      });

      expect(result.hostBehavior.model).toBe('ignorant');
      expect(result.hostOpens.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle biased host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 4,
        hostModel: 'biased',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.8,
        silentProbability: 0.2
      });

      expect(result.hostBehavior.model).toBe('biased');
      expect(result.hostBehavior.bias).toBe(0.8);
    });

    it('should handle sometimesSilent host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'sometimesSilent',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.3
      });

      expect(result.hostBehavior.model).toBe('sometimesSilent');
      expect(result.hostBehavior.silentProbability).toBe(0.3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum number of doors (3)', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2
      });

      expect(result.playerInitialChoice).toBeGreaterThanOrEqual(0);
      expect(result.playerInitialChoice).toBeLessThan(3);
      expect(result.prizeDoor).toBeGreaterThanOrEqual(0);
      expect(result.prizeDoor).toBeLessThan(3);
    });

    it('should handle larger number of doors', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 10,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2
      });

      expect(result.playerInitialChoice).toBeGreaterThanOrEqual(0);
      expect(result.playerInitialChoice).toBeLessThan(10);
      expect(result.prizeDoor).toBeGreaterThanOrEqual(0);
      expect(result.prizeDoor).toBeLessThan(10);
    });

    it('should handle zero bias', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 4,
        hostModel: 'biased',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0,
        silentProbability: 0.2
      });

      expect(result.hostBehavior.bias).toBe(0);
    });

    it('should handle zero silent probability', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        hostModel: 'sometimesSilent',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0
      });

      expect(result.hostBehavior.silentProbability).toBe(0);
    });
  });

  describe('Statistical Properties', () => {
    it('should produce consistent results with same seed', async () => {
      const config = {
        totalRuns: 100,
        numberOfDoors: 3,
        hostModel: 'classic' as HostModel,
        playerStrategy: 'alwaysSwitch' as PlayerStrategy,
        hostBias: 0.7,
        silentProbability: 0.2,
        randomSeed: 12345
      };

      const results1 = await simulator.runBatchSimulation(config);
      
      simulator.setRandomSeed(12345);
      const results2 = await simulator.runBatchSimulation(config);

      expect(results1).toEqual(results2);
    });

    it('should produce different results with different seeds', async () => {
      const config = {
        totalRuns: 100,
        numberOfDoors: 3,
        hostModel: 'classic' as HostModel,
        playerStrategy: 'alwaysSwitch' as PlayerStrategy,
        hostBias: 0.7,
        silentProbability: 0.2,
        randomSeed: 12345
      };

      const results1 = await simulator.runBatchSimulation(config);
      
      simulator.setRandomSeed(54321);
      const results2 = await simulator.runBatchSimulation(config);

      expect(results1).not.toEqual(results2);
    });
  });

  describe('Performance', () => {
    it('should handle large batch simulations efficiently', async () => {
      const startTime = Date.now();
      
      const results = await simulator.runBatchSimulation({
        totalRuns: 10000,
        numberOfDoors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: 0.7,
        silentProbability: 0.2,
        randomSeed: 12345
      });

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(results).toHaveLength(10000);
      expect(executionTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });
});