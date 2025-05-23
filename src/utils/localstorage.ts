// src/utils/localStorage.ts

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("appState");
    if (!serializedState) return undefined;

    const parsed = JSON.parse(serializedState);
    return {
      estimation: {
        products: parsed?.estimation?.products || [],
      },
      
    };
  } catch (e) {
    return {
      estimation: { products: [] },
      
    };
  }
};

export const saveState = (state: any) => {
  try {
    const stateToSave = {
      estimation: {
        products: state.estimation?.products || [],
      },
      
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("appState", serializedState);
  } catch (e) {
    // Handle error if needed
  }
};
