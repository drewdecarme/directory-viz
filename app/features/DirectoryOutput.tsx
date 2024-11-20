import { useDirectoryContext } from "./Directory.context";

export function DirectoryOutput() {
  const { graph } = useDirectoryContext();
  return (
    <pre>
      <code>{JSON.stringify(graph, null, 2)}</code>
    </pre>
  );
}
