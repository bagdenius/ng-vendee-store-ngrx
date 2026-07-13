export function getUserIdFromLocalStorage() {
  return Number(localStorage.getItem('ngrxstore:userId'));
}
