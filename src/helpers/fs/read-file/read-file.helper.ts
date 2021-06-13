export const readFile = (path: URL): Promise<string> => Deno.readTextFile(path);
export const writeFile = (path: URL, data: string): Promise<void> => Deno.writeTextFile(path, data);

