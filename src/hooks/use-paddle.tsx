import { useEffect, useState } from 'react';

interface IUsePaddle {
  (props: { vendor: number; environment?: string; eventCallback?: (data: any) => void }): {
    paddle: any;
  };
}

const usePaddle: IUsePaddle = ({ environment, vendor, eventCallback = () => {} }) => {
  const [paddle, setPaddle] = useState<any>(null);
  useEffect(() => {
    if (paddle || typeof window === 'undefined') return;
    if (document.getElementById('paddle')) {
      // @ts-ignore
      const paddle = global.Paddle;
      setPaddle(paddle);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      // @ts-ignore
      const paddle: any = global.Paddle || null;
      if (environment) paddle.Environment.set(environment);
      paddle.Setup({ vendor, eventCallback });
      setPaddle(paddle);
    });
  }, [environment, vendor, paddle]);
  return { paddle };
};

export default usePaddle;
