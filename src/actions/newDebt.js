export const addDebtor = (newDebtor) => ({
  type: 'ADD_DEBTOR',
  payload: newDebtor,
});

export const resetNewDebt = () => ({
  type: 'RESET_NEW_DEBT',
});
