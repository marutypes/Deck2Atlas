import Image from "next/image";
import Link from "@/app/components/Link";

export default function AboutPage() {
  return (
    <article className="margin-auto bg-slate-900 shadow-md p-4">
      <div className="flex flex-row flex-wrap lg:flex-nowrap">
        <div className="text-lg px-8 py-8 lg:w-3/4">
          <h2 className="text-2xl text-bold pb-8">About</h2>
          <p className="pb-2">
            Hi there! My name is Maru. You may know me from such worlds as{" "}
            <Link href="https://vrchat.com/home/content/worlds/wrld_d29c4512-ad9c-4c39-9ca6-b6081e3af99d">
              Maru&apos;s Arcade
            </Link>,{" "}
            <Link href="https://vrchat.com/home/world/wrld_3d580870-fe6f-4db5-ba4e-efc04580cc88">
              Pitch That Grift
            </Link>{" "}
            and{" "}
            <Link href="https://vrchat.com/home/world/wrld_2d9c6e10-fe1e-4c6d-a665-1aceaa2d98c7">
              The Pixel Aquarium
            </Link>
            .
          </p>
          <p className="pb-2">
            I created this little app that lets you turn your Magic: The
            Gathering decklists into texture atlases for use in VRChat. I hope we can all have fun doing wizard cardboard shenanigans soon.
          </p>
        </div>

        <div className="w-96 self-end justify-self-end">
          <Image
            className="self-end"
            width="200"
            height="200"
            layout="responsive"
            src="/xmas-maru.jpg"
            alt="happy cat girl"
          />
        </div>
      </div>
    </article>
  );
}
