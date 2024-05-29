import { memo } from "react";
import Authenticated from "../Authenticated";

const Profile = () => {
  return (
    <Authenticated>
      <h1>Hi</h1>
    </Authenticated>
  );
};

export default memo(Profile);
