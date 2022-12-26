export function apiCallMock<T>(response: T, delay = 500, error = false) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (error) reject(new Error('fallo de api'));
      resolve(response);
    }, delay);
  });
}
