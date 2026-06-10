export default function Header() {
  return (
    <header className="bg-white shadow-sm p-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Bienvenida, Florencia 👋
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
        F
      </div>
    </header>
  );
}