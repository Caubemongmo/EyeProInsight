import { create } from 'zustand';

interface DataConfigState {
  // Chunking
  agentic: boolean;
  sentinel: boolean;
  chunkSize: number;
  chunkOverlap: number;

  // Performance
  parallelDocs: number;
  concurrentLlm: number;

  // Track changes
  hasChanges: boolean;

  // Actions
  setAgentic: (value: boolean) => void;
  setSentinel: (value: boolean) => void;
  setChunkSize: (value: number) => void;
  setChunkOverlap: (value: number) => void;
  setParallelDocs: (value: number) => void;
  setConcurrentLlm: (value: number) => void;
  resetToDefaults: () => void;
  discardChanges: () => void;
  saveConfig: () => void;
}

const DEFAULTS = {
  agentic: true,
  sentinel: true,
  chunkSize: 1200,
  chunkOverlap: 100,
  parallelDocs: 2,
  concurrentLlm: 4,
};

let savedState = { ...DEFAULTS };

export const useDataConfigStore = create<DataConfigState>((set, get) => ({
  ...DEFAULTS,
  hasChanges: false,

  setAgentic: (value) =>
    set(() => {
      const next = { agentic: value };
      return { ...next, hasChanges: checkChanges({ ...get(), ...next }) };
    }),

  setSentinel: (value) =>
    set(() => {
      const next = { sentinel: value };
      return { ...next, hasChanges: checkChanges({ ...get(), ...next }) };
    }),

  setChunkSize: (value) =>
    set(() => {
      const next = { chunkSize: value };
      return { ...next, hasChanges: checkChanges({ ...get(), ...next }) };
    }),

  setChunkOverlap: (value) =>
    set(() => {
      const next = { chunkOverlap: value };
      return { ...next, hasChanges: checkChanges({ ...get(), ...next }) };
    }),

  setParallelDocs: (value) =>
    set(() => {
      const next = { parallelDocs: value };
      return { ...next, hasChanges: checkChanges({ ...get(), ...next }) };
    }),

  setConcurrentLlm: (value) =>
    set(() => {
      const next = { concurrentLlm: value };
      return { ...next, hasChanges: checkChanges({ ...get(), ...next }) };
    }),

  resetToDefaults: () =>
    set(() => ({
      ...DEFAULTS,
      hasChanges: checkChanges({ ...DEFAULTS }),
    })),

  discardChanges: () =>
    set(() => ({
      ...savedState,
      hasChanges: false,
    })),

  saveConfig: () => {
    const state = get();
    savedState = {
      agentic: state.agentic,
      sentinel: state.sentinel,
      chunkSize: state.chunkSize,
      chunkOverlap: state.chunkOverlap,
      parallelDocs: state.parallelDocs,
      concurrentLlm: state.concurrentLlm,
    };
    set({ hasChanges: false });
  },
}));

function checkChanges(state: Record<string, unknown>): boolean {
  return (
    state.agentic !== savedState.agentic ||
    state.sentinel !== savedState.sentinel ||
    state.chunkSize !== savedState.chunkSize ||
    state.chunkOverlap !== savedState.chunkOverlap ||
    state.parallelDocs !== savedState.parallelDocs ||
    state.concurrentLlm !== savedState.concurrentLlm
  );
}
