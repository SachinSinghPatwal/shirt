import { useEffect, useState } from 'react';

// Hook for detecting key combinations
export function useKeyPress(targetKey: string, withAlt = false, withCtrl = false, withShift = false) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === targetKey.toLowerCase() &&
        event.altKey === withAlt &&
        event.ctrlKey === withCtrl &&
        event.shiftKey === withShift
      ) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === targetKey.toLowerCase() &&
        event.altKey === withAlt &&
        event.ctrlKey === withCtrl &&
        event.shiftKey === withShift
      ) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, withAlt, withCtrl, withShift]);

  return keyPressed;
}