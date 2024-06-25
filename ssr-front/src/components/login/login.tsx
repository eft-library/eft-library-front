import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session, update } = useSession();
  const { accessToken } = session;

  // () => update() - 세션 업데이트 가능
  if (session) {
    return <Button onClick={() => signOut()}>{session.user.name}</Button>;
  }
  return <Button onClick={() => signIn()}>Login</Button>;
}
