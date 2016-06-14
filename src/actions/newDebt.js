export const addDebtor = (newDebtor) => {
  return {
	  type: 'ADD_DEBTOR',
		newDebtor: newDebtor
	}
}

export const resetNewDebt = () => {
  return {
	  type: 'RESET_NEW_DEBT'
	}
}
