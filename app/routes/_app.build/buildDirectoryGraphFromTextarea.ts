import type {
  DirectoryGraph,
  DirectoryGraphNode,
} from "../../features/Directory/Directory.context";

const NUM_OF_SPACES = 4;
export const INDENTATION = [...new Array(NUM_OF_SPACES)].reduce<string>(
  (accum) => accum.concat(" "),
  ""
);

function getDepth(line: string): number {
  const leadingSpaces = line.match(/^(\s*)/)?.[0]?.length || 0;
  return Math.floor(leadingSpaces / INDENTATION.length);
}

export function buildDirectoryGraphFromTextarea(input: HTMLTextAreaElement) {
  const lines = input.value.split("\n");
  const graph: DirectoryGraph = {};

  const stack: { node: DirectoryGraphNode; depth: number }[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const depth = getDepth(line);
    const id = trimmedLine.toLowerCase().replace(/\s+/g, "-"); // Generate ID based on text
    const newNode: DirectoryGraphNode = {
      text: trimmedLine,
      id,
      depth,
      childNodes: {},
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop(); // Remove nodes deeper or at the same level
    }

    if (stack.length === 0) {
      // Root node
      graph[id] = newNode;
    } else {
      // Child node
      const parent = stack[stack.length - 1].node;
      parent.childNodes[id] = newNode;
    }

    stack.push({ node: newNode, depth });
  }

  return graph;
}
