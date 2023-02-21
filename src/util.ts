export const useCommand = async (cmd: string[]) => {
  const p = Deno.run({
    cmd,
    "stderr": "piped",
    "stdout": "piped",
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
