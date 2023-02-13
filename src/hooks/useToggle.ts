import { useState } from 'react';

export default function useToggle(): [boolean, () => void] {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle];
}
