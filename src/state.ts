import { createLobby } from './actions';
import { DEFAULT_LOBBY_OPTIONS } from './constants';

export const state = {
	lobby: createLobby(DEFAULT_LOBBY_OPTIONS)
};