import { memo, useEffect, useState } from "react";

const Success = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="p-5 bg-lime-500 text-black mt-5">
      <h1>{message}</h1>
    </div>
  );
};

export default memo(Success);
