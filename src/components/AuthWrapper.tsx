"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);



interface AuthWrapperProps {
  children: ReactNode;
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          {children}
        </>
      )}
    </Authenticator>
  );
}