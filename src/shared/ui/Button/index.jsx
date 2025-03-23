import { Button as B } from "@mui/material";

export const Button = ({ ...props }) => {
  return <B {...props}>{props.children}</B>;
};
