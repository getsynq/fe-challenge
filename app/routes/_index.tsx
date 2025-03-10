import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <Link to="/wizard">Launch Wizard →</Link>
      <Link to="/wizard2">Launch Wizard 2 →</Link>
    </div>
  );
}
