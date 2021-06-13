const writeFile = <T> (path: string, data: T): Promise<void> => {
	return Deno.writeTextFile(path, JSON.stringify(data));
};
  
export { writeFile };
