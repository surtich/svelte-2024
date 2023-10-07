import { writable } from 'svelte/store';

import * as samples from '$data/samples.js';

const levels = samples.levels || [];
const players = samples.players || [];
const games = samples.games || {};

const playersStore = writable({
	levels,
	players,
	games
});

export default playersStore;
