import { useAppState } from './appState';

export function useCodex() {
  const { state, actions } = useAppState();

  return {
    state: state.codex,
    actions: {
      setInput: actions.setCodexInput,
      parseInput: actions.parseCodexInput,
      loadSuggestion: actions.loadCodexSuggestion,
      toggleConnector: actions.toggleConnector,
      runSimulation: actions.runSimulation,
      executeFlow: actions.executeFlow,
      togglePracticeMode: actions.togglePracticeMode,
      tickPractice: actions.tickPractice,
      applyCanvasNodeChanges: actions.applyCanvasNodeChanges,
      applyCanvasEdgeChanges: actions.applyCanvasEdgeChanges,
      connectCanvasEdge: actions.connectCanvasEdge,
      addCanvasNode: actions.addCanvasNode,
    },
  };
}
