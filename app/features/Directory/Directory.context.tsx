import React, { useRef } from "react";
import { type FC, type ReactNode, useContext, useMemo } from "react";
import { type Updater, useImmer } from "use-immer";

export type DirectoryGraphNode = {
  text: string;
  id: string;
  depth: number;
  childNodes: { [key: string]: DirectoryGraphNode };
};

export type DirectoryGraph = {
  [directoryNodeId: string]: DirectoryGraphNode;
};

export const nodeFontFamilies = {
  Excalifont: "Excalifont, sans-serif",
  Inter: "Inter, sans-serf",
};
export const nodeFontWeights = {
  Regular: 400,
  Medium: 500,
  "Semi-bold": 600,
  Bold: 700,
};
export type NodeFontFamilyNames = keyof typeof nodeFontFamilies;
export type NodeFontWeightNames = keyof typeof nodeFontWeights;

export type GlobalOptions = {
  // node
  NODE_PADDING_VERTICAL: number;
  NODE_PADDING_LEFT: number;
  NODE_TEXT_PADDING_LEFT: number;
  NODE_NESTED_INDENT: number;
  NODE_FONT_FAMILY: NodeFontFamilyNames;
  NODE_FONT_COLOR: string;
  NODE_FONT_SIZE: number;
  NODE_FONT_WEIGHT: NodeFontWeightNames;
  NODE_ICON_DIMENSION: number;
  // box
  BOX_PADDING_TOP: number;
  BOX_PADDING_RIGHT: number;
  BOX_PADDING_BOTTOM: number;
  BOX_PADDING_LEFT: number;
  BOX_RADIUS: number;
  BOX_WIDTH: number;
  // CANVAS
  CANVAS_BACKGROUND_COLOR: string;
};

export const globalOptionDefaults: GlobalOptions = {
  NODE_PADDING_VERTICAL: 20,
  NODE_PADDING_LEFT: 20,
  NODE_TEXT_PADDING_LEFT: 10,
  NODE_FONT_SIZE: 16,
  NODE_NESTED_INDENT: 30, // Indentation per depth
  // NODE_FONT_FAMILY: "Inter, sans-serif",
  NODE_FONT_FAMILY: "Inter",
  NODE_FONT_WEIGHT: "Regular",
  NODE_FONT_COLOR: "#000",
  NODE_ICON_DIMENSION: 24,

  BOX_PADDING_TOP: 0,
  BOX_PADDING_RIGHT: 0,
  BOX_PADDING_BOTTOM: 0,
  BOX_PADDING_LEFT: 0,
  BOX_RADIUS: 10,
  BOX_WIDTH: 300,
  CANVAS_BACKGROUND_COLOR: "#fafafa",
};

type DirectoryContextType = {
  graph: DirectoryGraph;
  setGraph: Updater<DirectoryGraph>;
  globalOptions: GlobalOptions;
  setGlobalOptions: Updater<GlobalOptions>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};
const DirectoryContext = React.createContext<DirectoryContextType | null>(null);
export type DirectoryProviderProps = {
  children: ReactNode;
};
export const DirectoryProvider: FC<DirectoryProviderProps> = ({ children }) => {
  const [graph, setGraph] = useImmer<DirectoryGraph>({});
  const [globalOptions, setGlobalOptions] =
    useImmer<GlobalOptions>(globalOptionDefaults);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const value = useMemo(
    () => ({
      graph,
      setGraph,
      canvasRef,
      globalOptions,
      setGlobalOptions,
    }),
    [globalOptions, graph, setGlobalOptions, setGraph]
  );

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectoryContext = (): DirectoryContextType => {
  const context = useContext(DirectoryContext);
  if (!context) {
    throw new Error(
      "'useDirectoryContext()' must be used within a <DirectoryProvider /> component"
    );
  }
  return context;
};
