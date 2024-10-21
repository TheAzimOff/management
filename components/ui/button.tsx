import { styled } from "nativewind";
import { Pressable, Text } from "react-native";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

export const Button = ({ children, variant = "default", ...props }) => (
  <StyledPressable
    className={`py-2 px-4 rounded-md ${
      variant === "outline" ? "border border-gray-300" : "bg-blue-600"
    }`}
    {...props}
  >
    <StyledText
      className={`text-center font-semibold ${
        variant === "outline" ? "text-gray-800" : "text-white"
      }`}
    >
      {children}
    </StyledText>
  </StyledPressable>
);
