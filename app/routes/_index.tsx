import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link to="/wizard">Launch Wizard →</Link>
    </div>
  );
}
