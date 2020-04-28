export function getRequestVersionPath(path: string): string {
  return `http://localhost:8686/v1/${path}`;
}
