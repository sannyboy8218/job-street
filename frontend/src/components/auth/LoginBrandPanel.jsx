import hirehubLogo from "@/assets/hirehub-icon.png";
import AuthBrandCharacter from "@/components/auth/AuthBrandCharacter";

export default function LoginBrandPanel() {
  return (
    <aside
      className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-12 py-16 text-white lg:flex lg:flex-col lg:items-center lg:justify-center xl:px-16"
      aria-label="HireHub"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hirehub-orb-a absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="hirehub-orb-b absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md text-center">
        <img
          src={hirehubLogo}
          alt=""
          className="mx-auto mb-8 w-20 drop-shadow-lg"
        />

        <p className="text-5xl font-black tracking-tight xl:text-6xl">
          HireHub
        </p>

        <p className="mt-5 text-xl leading-relaxed text-blue-100">
          Find jobs. Hire talent. Grow careers.
        </p>
      </div>

      <div className="relative z-10 mt-12 w-52 xl:w-60" aria-hidden="true">
        <div className="hirehub-character-bob">
          <AuthBrandCharacter />
        </div>
        <div className="mx-auto -mt-2 h-3 w-36 rounded-full bg-black/25 blur-[6px]" />
      </div>
    </aside>
  );
}
