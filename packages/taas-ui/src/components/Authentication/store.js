import { writable, derived } from 'svelte/store';

const isAuthenticated = writable(false);
const isLoading = writable(true);
const user = writable({});
const popupOpen = writable(false);
const error = writable();

const tasks = writable([]);

const userTasks = derived([tasks, user], ([$tasks, $user]) => {
  let loggedInUserTasks = [];

  if ($user && $user.email) {
    loggedInUserTasks = $tasks.filter((task) => task.user === $user.email);
  }

  return loggedInUserTasks;
});

export { isAuthenticated, isLoading, user, popupOpen, error, userTasks };
