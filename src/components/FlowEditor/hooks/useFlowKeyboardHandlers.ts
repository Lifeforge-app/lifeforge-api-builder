import { useCallback, useEffect, useRef } from "react";
import { useReactFlow } from "@xyflow/react";
import { useModalStore } from "@lifeforge/ui";
import NodeSelector from "../components/NodeSelector";
import { type NODE_TYPES } from "../nodes";
import type { FlowStateActions } from "./useFlowState";

interface UseFlowKeyboardHandlersProps {
  onAddNode: FlowStateActions["onAddNode"];
}

export function useFlowKeyboardHandlers({
  onAddNode,
}: UseFlowKeyboardHandlersProps) {
  const { screenToFlowPosition } = useReactFlow();
  const open = useModalStore((s) => s.open);
  const stack = useModalStore((s) => s.stack);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const isInputFocused = useCallback(() => {
    return (
      document.activeElement &&
      (document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA")
    );
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isInputFocused()) {
        return;
      }

      if (event.key.toLowerCase() === "a") {
        if (stack.length > 0) {
          return;
        }

        const position = screenToFlowPosition({
          x: mousePosition.current.x,
          y: mousePosition.current.y,
        });

        open(NodeSelector, {
          onSelect: (nodeType: NODE_TYPES) => {
            onAddNode(nodeType, position);
          },
        });
      }
    },
    [screenToFlowPosition, open, onAddNode, stack, isInputFocused]
  );

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleKeyDown, handleMouseMove]);
}
