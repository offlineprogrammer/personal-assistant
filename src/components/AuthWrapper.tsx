"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

import "@aws-amplify/ui-react/styles.css";

interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Authenticator>{({ signOut, user }) => <>{children}</>}</Authenticator>
  );
}
