import { writable } from 'svelte/store';

export const server = 'http://139.99.41.13:8000';
export let accessToken = writable(false);
export let refreshToken = writable(false);
export let svAxios = writable(false);
export let user = writable(false);
export let loadingstore = writable(false);
export let alertStore = writable(false);
export let pathStore = writable(false);
export let classStore = writable([]);
export let roomStore = writable(false);
export let stream = writable(false);
export let noteStore = writable([]);
export let assignmentStore = writable([]);
export let classCurrentListStore = writable([]);
export let classCurrentFileStore = writable([]);
export let classCurrentComponentStore = writable(false);
export let classEditDataStore = writable([]);