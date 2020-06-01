import React from "react";

interface Props {}

const IframeDatePaicker = (props: Props) => {
  return (
    <iframe
      src="http://localhost:3000/modal"
      frameBorder={0}
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export default IframeDatePaicker;
