import {handleActions} from 'redux-actions';

import getStateItems from '../helpers/getStateItems';
import {usersAdd, usersAddMultiple} from '../actions/users';
import defaultState from '../store/initialState';

export default handleActions({
	[usersAdd]: (state, {payload}) => ({
		...state,
		[payload.id]: {...payload}
	}),
	[usersAddMultiple]: (state, {payload}) => ({
		...state,
		...getStateItems(state, payload)
	})
}, defaultState.users);
