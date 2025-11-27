// Minimal TypeScript declarations for @hello-pangea/dnd
// This prevents TypeScript errors when the package does not include its own types.
declare module '@hello-pangea/dnd' {
  import * as React from 'react';

  export const DragDropContext: React.ComponentType<any>;
  export const Droppable: React.ComponentType<any>;
  export const Draggable: React.ComponentType<any>;

  export type DropResult = any;
  export type DraggableProvided = any;
  export type DraggableStateSnapshot = any;
  export type DroppableProvided = any;
  export type DroppableStateSnapshot = any;

  export default {
    DragDropContext,
    Droppable,
    Draggable
  } as any;
}
