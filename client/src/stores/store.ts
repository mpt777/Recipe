// store.ts
import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export function createStore() {
	const mystore = writable('INITIAL VALUE');
	setContext('contextStore', mystore);
}

export function readStore() {
	return getContext<Writable<string>>('contextStore');
}