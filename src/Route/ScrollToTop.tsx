import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToTypeArgs = {
  children: any;
};

const ScrollToTop: any = (args: ScrollToTypeArgs) => {
  const children = args.children;

  const { pathname } = useLocation();

  useEffect(() => {
    return (): void => {
      window.scrollTo(0, 0);
    };
  }, [pathname]);

  return children;
};

export default ScrollToTop;
