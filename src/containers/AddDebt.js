import React from 'react'
import { connect } from 'react-redux'
import {fetchAddDebt, addDebtor, resetNewDebt} from '../actions'
import './AddDebt.css'

const mapStateToProps = (state, ownProps) => {
  return {
	  groupFriends: state.groupFriends,
		debtList: state.debtList.list,
		newDebt: state.newDebt,
		username: state.username
	};
}

let DebtList = ({dispatch, debtList, groupFriends, newDebt, username}) => {
	let debtName, debtor, money;
  return(
	  <div>
		  <form onSubmit={ e=>{
			  e.preventDefault();
				dispatch(fetchAddDebt('testName','testGroup',{
				  crditor: username,
					debtName: debtName.value,
					debtorList: newDebt
				}))
				debtName.value = '';
				dispatch(resetNewDebt());
			}}>
			  debtName: <input ref={node=>{debtName=node}}/>
			  <button type="submit"> add debt </button> 
			</form>
			<table>
			  <thead>
				  <tr>
					  <th> Name </th>
						<th> Money </th>
					</tr>
				</thead>
				<tbody>
				  <tr>
					  <td> <input ref={node=>{debtor=node}}/> </td>
					  <td> <input ref={node=>{money=node}}/> </td>
						<button onClick = { e=>{
						  e.preventDefault();
							dispatch(addDebtor({
							  debtor: debtor.value,
								money: money.value
							}))
							debtor.value = '';
							money.value = '';
						}}> add </button>
					</tr>
					{newDebt.map(function(x){
					  return (<tr>
						  <td> {x.debtor} </td>
							<td> {x.money} </td>
						</tr>)
					})}
				</tbody>
			</table>
		  <div className="debt-list">{
			  debtList.map(function(x){
				  return (<div>
					  <h3> {x.debtName} </h3>
						<h4> {x.creditor} </h4>
						<ul>{ x.debtorList.map(function(y){
						  return <li> {y.debtor+' '+y.money} </li> 
						})
						}</ul>
					</div>)
				}) 
			}</div>
		</div>
	);
}

DebtList = connect(mapStateToProps)(DebtList)

export default DebtList
