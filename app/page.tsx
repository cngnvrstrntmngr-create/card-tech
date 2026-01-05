import GoogleButton from "@/components/buttons/GoogleButton";
import SecretLoginForm from "@/components/buttons/SecretButton";
import AuthRedirect from "@/providers/AuthRedirect";

export default function Page() {
  return (
    <AuthRedirect>
      <GoogleButton />
    </AuthRedirect>
  );
}
