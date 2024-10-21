import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  Input,
  Label,
} from "@/components/ui/card";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LoginPage() {
  return (
    <StyledView contentContainerClassName="flex-1 justify-end px-4">
      <Card>
        <CardHeader>
          <StyledText className="text-2xl font-bold mb-2">Login</StyledText>
          <StyledText className="text-gray-600">
            Enter your email below to login to your account
          </StyledText>
        </CardHeader>
        <CardContent>
          <StyledView className="space-y-4">
            <StyledView className="space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="m@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </StyledView>
            <StyledView className="space-y-2">
              <StyledView className="flex-row justify-between items-center">
                <Label>Password</Label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 underline"
                >
                  Forgot your password?
                </Link>
              </StyledView>
              <Input secureTextEntry />
            </StyledView>
            <Button>Login</Button>
            <Button variant="outline">Login with Google</Button>
          </StyledView>
          <StyledView className="mt-4 items-center">
            <StyledText className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register">
                <StyledText className="text-blue-600 underline">
                  Sign up
                </StyledText>
              </Link>
            </StyledText>
          </StyledView>
        </CardContent>
      </Card>
    </StyledView>
  );
}
