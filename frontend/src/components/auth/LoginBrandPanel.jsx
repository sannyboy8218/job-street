import hirehubLogo from "@/assets/hirehub-icon.png";

export default function LoginBrandPanel() {
  return (
    <aside
      className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-12 py-16 text-white lg:flex lg:flex-col lg:justify-center xl:px-16"
      aria-label="HireHub"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative z-10 max-w-md">
        <img
          src={hirehubLogo}
          alt=""
          className="mb-8 w-20 drop-shadow-lg"
        />

        <p className="text-5xl font-black tracking-tight xl:text-6xl">
          HireHub
        </p>

        <p className="mt-5 text-xl leading-relaxed text-blue-100">
          Find jobs. Hire talent. Grow careers.
        </p>
      </div>
    </aside>
  );
}
