import { describe, it, expect, beforeEach } from 'vitest';
import { MontyHallSimulator } from '../core/simulator';
import type { HostModel, SimulationConfig } from '../types';

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
      simulator.reset('12345');
      expect(() => simulator.reset('54321')).not.toThrow();
    });
  });

  describe('Single Experiment', () => {
    it('should run a single experiment with classic host and always switch strategy', () => {
      const result = simulator.runSingleExperiment({
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        totalRuns: 1,
        numberOfDoors: 3,
        batchSize: 1
      });

      expect(result).toHaveProperty('firstPick');
      expect(result).toHaveProperty('prizeDoor');
      expect(result).toHaveProperty('hostOpened');
      expect(result).toHaveProperty('finalPick');
      expect(result).toHaveProperty('win');
      expect(result).toHaveProperty('switched');
      expect(typeof result.win).toBe('boolean');
      expect([true, false]).toContain(result.win);
    });

    it('should run a single experiment with never switch strategy', () => {
      const result = simulator.runSingleExperiment({
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'neverSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        totalRuns: 1,
        numberOfDoors: 3,
        batchSize: 1
      });

      expect(result.switched).toBe(false);
      expect(result.firstPick).toBe(result.finalPick);
    });
  });

  describe('Batch Simulation', () => {
    it('should run batch simulation', () => {
      const results = simulator.runBatchExperiments({
        totalRuns: 100,
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        randomSeed: 12345,
        batchSize: 100
      }, 100);

      expect(results).toHaveLength(100);
      expect(results.every(r => typeof r.win === 'boolean')).toBe(true);
    });

    it('should calculate statistics correctly', () => {
      const results = simulator.runBatchExperiments({
        totalRuns: 1000,
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        randomSeed: 12345,
        batchSize: 1000
      }, 1000);

      const stats = simulator.calculateStats(results);

      expect(stats).toHaveProperty('totalRuns', 1000);
      expect(stats).toHaveProperty('wins');
      expect(stats).toHaveProperty('losses');
      expect(stats).toHaveProperty('winRate');
      expect(stats).toHaveProperty('standardError');
      expect(stats).toHaveProperty('confidenceInterval');
      expect(stats.wins + stats.losses).toBe(1000);
      expect(stats.winRate).toBeGreaterThanOrEqual(0);
      expect(stats.winRate).toBeLessThanOrEqual(1);
    });
  });

  describe('Host Models', () => {
    it('should handle classic host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.hostModel).toBe('classic');
      expect(typeof result.hostOpened).toBe('number');
    });

    it('should handle ignorant host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'ignorant',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.hostModel).toBe('ignorant');
      expect(result.hostOpened === undefined || typeof result.hostOpened === 'number').toBe(true);
    });

    it('should handle biased host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 4,
        doors: 4,
        hostModel: 'biased',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: { 1: 0.8 }, openProbability: 0.8 },
        silentProbability: 0.2,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.hostModel).toBe('biased');
      expect(typeof result.hostOpened).toBe('number');
    });

    it('should handle sometimesSilent host model', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'sometimesSilent',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.3 },
        silentProbability: 0.3,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.hostModel).toBe('sometimesSilent');
      expect(result.hostOpened === undefined || typeof result.hostOpened === 'number').toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle minimum number of doors (3)', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.firstPick).toBeGreaterThanOrEqual(0);
      expect(result.firstPick).toBeLessThan(3);
      expect(result.prizeDoor).toBeGreaterThanOrEqual(0);
      expect(result.prizeDoor).toBeLessThan(3);
    });

    it('should handle larger number of doors', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 10,
        doors: 10,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.firstPick).toBeGreaterThanOrEqual(0);
      expect(result.firstPick).toBeLessThan(10);
      expect(result.prizeDoor).toBeGreaterThanOrEqual(0);
      expect(result.prizeDoor).toBeLessThan(10);
    });

    it('should handle zero bias', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 4,
        doors: 4,
        hostModel: 'biased',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0 },
        silentProbability: 0.2,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.hostModel).toBe('biased');
      expect(typeof result.hostOpened).toBe('number');
    });

    it('should handle zero silent probability', () => {
      const result = simulator.runSingleExperiment({
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'sometimesSilent',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0,
        totalRuns: 1,
        batchSize: 1
      });

      expect(result.hostModel).toBe('sometimesSilent');
      expect(result.hostOpened === undefined || typeof result.hostOpened === 'number').toBe(true);
    });
  });

  describe('Statistical Properties', () => {
    it('should produce consistent results with same seed', () => {
      const config: SimulationConfig = {
        totalRuns: 100,
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic' as HostModel,
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        randomSeed: 12345,
        batchSize: 100
      };

      simulator.reset('12345');
      const results1 = simulator.runBatchExperiments(config, 100);

      simulator.reset('12345');
      const results2 = simulator.runBatchExperiments(config, 100);

      expect(results1).toEqual(results2);
    });

    it('should produce different results with different seeds', () => {
      const config: SimulationConfig = {
        totalRuns: 100,
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic' as HostModel,
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        randomSeed: 12345,
        batchSize: 100
      };

      simulator.reset('12345');
      const results1 = simulator.runBatchExperiments(config, 100);

      simulator.reset('54321');
      const results2 = simulator.runBatchExperiments(config, 100);

      expect(results1).not.toEqual(results2);
    });
  });

  describe('Performance', () => {
    it('should handle large batch simulations efficiently', () => {
      const startTime = Date.now();

      const results = simulator.runBatchExperiments({
        totalRuns: 10000,
        numberOfDoors: 3,
        doors: 3,
        hostModel: 'classic',
        playerStrategy: 'alwaysSwitch',
        hostBias: { weights: {}, openProbability: 0.7 },
        silentProbability: 0.2,
        randomSeed: 12345,
        batchSize: 10000
      }, 10000);

      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(results).toHaveLength(10000);
      expect(executionTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });
});