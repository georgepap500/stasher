import * as TYPES from './_types';
import { apiService } from '../utils/api';

export function fetchPoints(params) {
	return function(dispatch) {
		dispatch({ type: TYPES.FETCH_POINTS });
		return apiService
			.get('/stashpoints' + params)
			.then(response => {
				dispatch({ type: TYPES.FETCH_POINTS_SUCCESS });
				return response;
			})
			.catch(error => {
				dispatch({ type: TYPES.FETCH_POINTS_ERROR });
				return 'An error has occurred';
			});
	};
}