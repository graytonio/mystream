import AuthButton from "./AuthButton";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="mx-auto flex h-screen min-h-screen max-w-7xl flex-col bg-[#181818] p-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-100 sm:truncate sm:text-3xl sm:tracking-tight">
            MyStream
          </h2>
        </div>
        <div className="flex">
          <AuthButton />
        </div>
      </div>
      {children}
    </main>
  );
};

export default Layout;
