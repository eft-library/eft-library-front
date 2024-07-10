import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return <Button onClick={() => signOut()}>로그아웃</Button>;
  }
  return <Button onClick={() => signIn()}>로그인</Button>;
}
