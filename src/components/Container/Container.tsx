import { styled } from "@stitches/react";
import { Box } from "../Box/Box";
import { InputTask } from "../InputTask/InputTask";

//Stiches Style
const StyledContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "12px",
  gap: "10px",
  width: "300px",
  height: "400px",
  background: "#F7F0F5",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.06), 0px 4px 3px rgba(0, 0, 0, 0.07)",
  borderRadius: "4px",
  position: "relative",
});

const Hr = styled("hr", {
  width: "100%",
  border: "none",
  height: "1px",
  backgroundColor: "#eee4e1",
});

export const Container = () => {
  return (
    <StyledContainer>
      <InputTask />
      <Hr />
      <Box />
    </StyledContainer>
  );
};
