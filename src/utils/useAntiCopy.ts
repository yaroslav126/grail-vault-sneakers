import { useEffect } from 'react';

/**
 * useAntiCopy
 * Comprehensive non-copiable protection:
 * - Disables copy and cut events globally
 * - Disables right-click context menu (Save image as, Copy, Inspect)
 * - Disables drag and drop for images and text
 * - Disables text selection across elements
 * - Intercepts Ctrl/Cmd + C, X, U, S, P, and F12 / DevTools shortcuts
 */
export function useAntiCopy() {
  useEffect(() => {
    // 1. Prevent copy event
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.clipboardData) {
        e.clipboardData.clearData();
      }
    };

    // 2. Prevent cut event
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.clipboardData) {
        e.clipboardData.clearData();
      }
    };

    // 3. Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // 4. Prevent drag & drop of text and images
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // 5. Prevent text selection start
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return; // Allow cursor in inputs for filling orders / search
      }
      e.preventDefault();
    };

    // 6. Block copy/save/print/inspect keyboard combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // Block Ctrl/Cmd + C (Copy), X (Cut), U (View Source), S (Save Page), P (Print)
      if (isModifier && (key === 'c' || key === 'x' || key === 'u' || key === 's' || key === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Block Ctrl/Cmd + A (Select All) outside inputs
      if (isModifier && key === 'a') {
        const target = e.target as HTMLElement | null;
        if (!target || (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA')) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      // Block F12 and Ctrl/Cmd + Shift + I/J/C
      if (
        e.key === 'F12' ||
        (isModifier && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('cut', handleCut, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('cut', handleCut, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
}
