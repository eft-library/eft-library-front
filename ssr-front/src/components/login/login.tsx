import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>{session.user.name}</Button>;
  }
  return <Button onClick={() => signIn()}>Login</Button>;
}