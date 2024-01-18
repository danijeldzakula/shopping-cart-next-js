import { isCheckObject, isCheckString } from "@/utils/helpers";

const App = (props) => {
  const { children, className, style } = props;

  return (
    <div style={isCheckObject(style)} className={isCheckString(className)}>
      {children}
    </div>
  );
};

const Main = (props) => {
  const { children, className, style } = props;

  return (
    <main style={isCheckObject(style)} className={isCheckString(className)}>
      {children}
    </main>
  );
};

export { App, Main };
