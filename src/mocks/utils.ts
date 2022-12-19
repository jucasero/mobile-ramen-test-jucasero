export function apiCallMock<T>(
  response: T,
  delay: number = 500,
  error: boolean = false
) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (error) reject(new Error("fallo de api"));
      resolve(response);
    }, delay);
  });
}
