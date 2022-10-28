import { Session } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/react";
import { Menu } from "@headlessui/react";
import { classNames } from "../utils/classes";

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn("discord")}
      type="button"
      className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Login With Discord
    </button>
  );
};

const LoggedInButton = ({ session }: { session: Session }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Hello {session.user?.name}
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <span
              onClick={() => signOut()}
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Log Out
            </span>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

const AuthButton = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") return <LoggedInButton session={session} />;
  return <LoginButton />;
};

export default AuthButton;
