import React from "react";
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

type DirectoryContextType = {
  graph: DirectoryGraph;
  setGraph: Updater<DirectoryGraph>;
};
const DirectoryContext = React.createContext<DirectoryContextType | null>(null);
export type DirectoryProviderProps = {
  children: ReactNode;
};
export const DirectoryProvider: FC<DirectoryProviderProps> = ({ children }) => {
  const [graph, setGraph] = useImmer<DirectoryGraph>({});

  const value = useMemo(
    () => ({
      graph,
      setGraph,
    }),
    [graph, setGraph]
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
