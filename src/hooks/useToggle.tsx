import { useState } from 'react';

export default function useToggle() {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
  };
}
