import { styled } from "nativewind";
import { TextInput, View, Text } from "react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

export const Card = ({ children }) => (
  <StyledView className="bg-white rounded-lg shadow-md overflow-hidden">
    {children}
  </StyledView>
);

export const CardHeader = ({ children }) => (
  <StyledView className="p-6">{children}</StyledView>
);

export const CardContent = ({ children }) => (
  <StyledView className="p-6 pt-0">{children}</StyledView>
);

export const Input = (props) => (
  <StyledTextInput
    className="border border-gray-300 rounded-md px-3 py-2"
    {...props}
  />
);

export const Label = ({ children }) => (
  <StyledText className="text-sm font-medium text-gray-700 mb-1">
    {children}
  </StyledText>
);
