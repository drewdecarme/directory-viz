import { useDirectoryContext } from "./Directory.context";

export function DirectoryMeta() {
  const { graph } = useDirectoryContext();
  return (
    <div>
      <pre>{JSON.stringify(graph, null, 2)}</pre>
    </div>
  );
}
