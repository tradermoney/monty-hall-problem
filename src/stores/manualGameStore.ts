import { create } from 'zustand';
import type { ManualGameState } from '../types';

interface ManualGameStore {
  gameState: ManualGameState;
  startNewGame: (doors: number) => void;
  selectDoor: (door: number) => void;
  makeSwitchDecision: (shouldSwitch: boolean) => void;
  resetGame: () => void;
}

export const useManualGameStore = create<ManualGameStore>((set, get) => ({
  gameState: {
    doors: 3,
    prizeDoor: 0,
    step: 'init'
  },

  startNewGame: (doors: number) => {
    const prizeDoor = Math.floor(Math.random() * doors);
    
    set({
      gameState: {
        doors,
        prizeDoor,
        step: 'selected'
      }
    });
  },

  selectDoor: (door: number) => {
    const { gameState } = get();
    
    if (gameState.step !== 'selected') return;
    
    // 主持人开门逻辑
    const availableDoors = Array.from({ length: gameState.doors }, (_, i) => i);
    const doorsToOpen = availableDoors.filter(d => d !== door && d !== gameState.prizeDoor);
    const openedDoor = doorsToOpen[Math.floor(Math.random() * doorsToOpen.length)];
    
    set({
      gameState: {
        ...gameState,
        selectedDoor: door,
        openedDoor,
        step: 'decide'
      }
    });
  },

  makeSwitchDecision: (shouldSwitch: boolean) => {
    const { gameState } = get();
    
    if (gameState.step !== 'decide') return;
    
    let finalDoor = gameState.selectedDoor;
    
    if (shouldSwitch && gameState.selectedDoor !== undefined && gameState.openedDoor !== undefined) {
      const availableDoors = Array.from({ length: gameState.doors }, (_, i) => i);
      const switchOptions = availableDoors.filter(d => 
        d !== gameState.selectedDoor && d !== gameState.openedDoor
      );
      finalDoor = switchOptions[0];
    }
    
    const result = finalDoor === gameState.prizeDoor ? 'win' : 'lose';
    
    set({
      gameState: {
        ...gameState,
        switched: shouldSwitch,
        finalDoor,
        result,
        step: 'done'
      }
    });
  },

  resetGame: () => {
    set({
      gameState: {
        doors: 3,
        prizeDoor: 0,
        step: 'init'
      }
    });
  }
}));