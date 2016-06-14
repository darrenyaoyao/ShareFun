const newDebt = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DEBTOR':
      return [...state, action.payload];
    case 'RESET_NEW_DEBT':
      return [];
    default:
      return state;
  }
};

export default newDebt;
