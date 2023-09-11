const getter = (key) =>
  typeof window !== 'undefined' ? localStorage.getItem(key) : null;

const setter = (key, value) =>
  typeof window !== 'undefined' ? localStorage.setItem(key, value) : null;

export function currentUserId() {
  return getter('userId');
}

export function setCurrentUserId(id) {
  return setter('userId', id);
}
