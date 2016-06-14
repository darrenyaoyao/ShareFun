export const addDebtor = (newDebtor) => {
  return {
	  type: 'ADD_DEBTOR',
		payload: newDebtor
	}
}

export const resetNewDebt = () => {
  return {
	  type: 'RESET_NEW_DEBT'
	}
}
