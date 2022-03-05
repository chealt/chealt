import { writable } from 'svelte/store';

const isAuthenticated = writable(false);
const isLoading = writable(true);
const user = writable({});
const popupOpen = writable(false);
const error = writable();

export { isAuthenticated, isLoading, user, popupOpen, error };
