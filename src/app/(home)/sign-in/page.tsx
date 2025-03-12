import { SignInButton } from "@clerk/nextjs"

export default function Page() {
  return (
    <div>
      <SignInButton forceRedirectUrl={"/drive"} />
    </div>
  )
}
