import { useEffect } from 'react';
import { useScrollStore } from 'src/config/store';

export const useScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const x = window.scrollX;
      const y = window.scrollY;
      useScrollStore.setState({ scrollX: x, scrollY: y });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
