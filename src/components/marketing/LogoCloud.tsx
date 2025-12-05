import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/logos";
import { Marquee } from "@/components/ui/marquee";

const LogoCloud = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="overflow-hidden">
        <p className="text-center text-3xl font-bold text-slate-600">
          Déjà utilisé par +500 garages en France
        </p>

        <div className="mt-5 flex items-center justify-center gap-x-14 gap-y-10 max-w-(--breakpoint-xl)">
          <Marquee
            pauseOnHover
            className="[--duration:20s] [&_svg]:mr-10 mask-x-from-70% mask-x-to-90%"
          >
            <Logo01 />
            <Logo02 />
            <Logo03 />
            <Logo04 />
            <Logo05 />
            <Logo06 />
            <Logo07 />
            <Logo08 />
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
