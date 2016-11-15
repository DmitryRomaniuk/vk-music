import {createActions} from 'redux-actions';

export const {
	usersAdd,
	usersAddMultiple,
	usersFetchAudios,
	usersFetchAlbums,
	usersFetchFriends
} = createActions(
	'USERS_ADD',
	'USERS_ADD_MULTIPLE',
	'USERS_FETCH_AUDIOS',
	'USERS_FETCH_ALBUMS',
	'USERS_FETCH_FRIENDS'
);
