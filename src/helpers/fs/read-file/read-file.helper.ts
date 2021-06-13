export const readFile = (path: string): Promise<string> => Deno.readTextFile(path);

