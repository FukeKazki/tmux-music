export const useCommand = async (cmd: string[]) => {
  const p = Deno.run({
    cmd,
    stderr: "piped",
    stdout: "piped",
  });

  const [status, stdout, stderror] = await Promise.all([
    p.status(),
    p.output(),
    p.stderrOutput(),
  ]);

  return {
    status,
    stdout: new TextDecoder().decode(stdout),
    stderror: new TextDecoder().decode(stderror),
  };
};

export const rollTrimStr = (
  str: string,
  start: number,
  length: number,
): string => {
  let tmp = "";
  while (tmp.length < length + str.length) {
    tmp += str + " ";
  }
  return tmp.substring(start, start + length);
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
