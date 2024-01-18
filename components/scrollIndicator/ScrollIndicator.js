import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ScrollIndicator() {
  const [scroll, setScroll] = useState(0);
  const location = useRouter();

  const scrollIndicator = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrolled = scrollTop;
    const maxHeight = scrollHeight - clientHeight;
    const scrollPercent = (scrolled / maxHeight) * 100;

    if (scrollPercent) {
      setScroll(scrollPercent);
    } else {
      setScroll(0);
    }
  };

  const indicator = {
    position: "fixed",
    zIndex: "1002",
    top: "0",
    left: "0",
    width: "100%",
    height: "2px",
    background: "transparent",
  };

  const progress = {
    width: scroll + "%",
    height: "100%",
    background: "orange",
  };

  useIsomorphicLayoutEffect(() => {
    document.addEventListener("scroll", scrollIndicator);
    return () => {
      document.removeEventListener("scroll", scrollIndicator);
    };
  }, [location]);

  return (
    <div style={indicator}>
      <div style={progress}></div>
    </div>
  );
}
