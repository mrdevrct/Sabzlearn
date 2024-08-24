const initialState = false; // Initial state set to false

const openMenuReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_OPENMENU':
        return action.payload;
      default:
        return state;
    }
  };

  export default openMenuReducer;
