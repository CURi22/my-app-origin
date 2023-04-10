"use Client";

import { MouseEvent, ReactNode, useRef, useState } from "react";

import "styles/components/horizontal-drag-tab/horizontal-drag-tab.scss";

interface DragTabParams {
  children: ReactNode;
  onScrollEnd?(): void;
  onScrollStart?(): void;
  onScrollWorking?(): void;
}

export function HorizontalDragTab({
  children,
  onScrollEnd,
  onScrollStart,
  onScrollWorking,
}: DragTabParams) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  function enableDragging(): void {
    setIsMouseDown(true);

    onScrollStart?.();
  }

  function scrollWorks(e: MouseEvent<HTMLDivElement>): void {
    if (isMouseDown && e.movementX !== 0) {
      const currentRef: HTMLDivElement | null = containerRef.current;

      currentRef?.scrollTo({ left: currentRef?.scrollLeft - e.movementX });

      onScrollWorking?.();
    }
  }

  function disableDragging(): void {
    setIsMouseDown(false);

    onScrollEnd?.();
  }

  return (
    <div
      ref={containerRef}
      className="horizontal-drag-tab-container"
      onMouseDown={enableDragging}
      onMouseMove={scrollWorks}
      onMouseLeave={disableDragging}
      onMouseUp={disableDragging}
    >
      {children}
    </div>
  );
}
