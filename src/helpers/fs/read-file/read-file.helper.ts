const readFile = (path: string): Promise<string> => {
  return Deno.readTextFile(path);
};

export { readFile };
