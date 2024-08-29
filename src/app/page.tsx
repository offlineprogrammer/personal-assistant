"use client";
import { Button } from "@aws-amplify/ui-react";
import Chat from "@/components/Chat";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
  const { user, signOut } = useAuthenticator();

  return (
    <div className="app-container">
      <header className="App-header">
        <h1>Hello {user?.signInDetails?.loginId}</h1>
        <Button onClick={signOut}>Sign out</Button>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}
