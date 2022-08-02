import { useEffect, useState } from "react";
// If you want the components to use the same data from the hook, it has to be managed outside
let globalState = {};
//Functions that update the components that uses the hook
let listeners = [];
let actions = {};
export const useStore = (shouldListen = true) => {
  // Only interested on the set function as when it is called, the component is re-rendered
  const setState = useState(globalState)[1];

  const dispatch = (actionId, payload) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };
    // As the state changed, the change has to be loaded at listeners
    for (const listener of listeners) {
      // It updates the state with the globalState
      listener(globalState);
    }
  };
  // Loading listeners with setState
  useEffect(() => {
    // Only add a listener when it is convenient
    if (shouldListen) {
      listeners.push(setState);
    }

    //cleaner function to remove the listener only when it is added
    return () => {
      if (shouldListen) {
        listeners = listeners.filter((listener) => listener !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState }; // merges both objects
  }
  actions = { ...actions, ...userActions }; // merges both objects
};
