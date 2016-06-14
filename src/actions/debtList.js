import fetch from 'isomorphic-fetch'

export const requestAddDebt = () => {
  return {
	  type: 'REQUEST_ADD_DEBT',
	}
}

export const receiveAddDebt = (json, debt) => {
  return {
	  type: 'RECEIVE_ADD_DEBT',
		err: !json.success,
		debt: debt
	}
}

export const fetchAddDebt = (username, groupName, debtContent) => {
  return dispatch => {
	  dispatch(requestAddDebt());
		return fetch('/api/addDebt',{
		  method: 'POST',
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  username,
			  groupName,
			  debtContent
			})
		})
			.then(res => res.json())
			.then(json => {
				dispatch(receiveAddDebt(json, debtContent));
			})
	}
}
