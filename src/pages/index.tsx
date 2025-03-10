import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const Globe = dynamic(import("react-globe.gl"), { ssr: false });

export default function Home() {
  const N = 30;
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ["red", "blue", "green"][Math.round(Math.random() * 3)],
      ["red", "blue", "green"][Math.round(Math.random() * 3)],
    ],
  }));

  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    fetch("places.geojson")
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  return (
    <>
      <Head>
        <title>OpenKind</title>
        <meta
          name="description"
          content="Global issues, collaboratively solved."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center bg-slate-900">
        <div className="z-10 flex w-4/5 flex-col items-center justify-center space-y-8 text-center lg:w-2/3">
          <div className="font-heading text-5xl font-bold text-neutral-50 lg:text-7xl">
            Ξ OpenKind
          </div>
          <div className="w-4/5 text-base text-neutral-300 lg:w-2/5 lg:text-lg">
            We build effective solutions to global issues through collaboration
          </div>

          <div className="flex space-x-2">
            <Link href={"/contributors"} passHref legacyBehavior>
              <a className="flex h-11 w-32 items-center justify-center  rounded-lg border border-neutral-500 bg-slate-900 bg-opacity-30 text-base font-normal text-neutral-300 backdrop-blur-xl hover:bg-slate-800 lg:w-44 lg:text-lg">
                Contributors
              </a>
            </Link>
            <Link
              href={"https://github.com/openkindhq"}
              passHref
              legacyBehavior
            >
              <a className="bg-neutral-2 flex h-11 w-32  items-center justify-center rounded-lg border border-neutral-500 bg-neutral-200 text-base  text-neutral-800  hover:bg-neutral-300 lg:w-44 lg:text-lg">
                Learn more
              </a>
            </Link>
          </div>
        </div>
        <div className="fixed bottom-0 opacity-40">
          <Globe
            showGlobe={false}
            arcsData={arcsData}
            showAtmosphere={false}
            arcColor={"color"}
            arcDashLength={() => Math.random()}
            arcDashGap={() => Math.random()}
            arcDashAnimateTime={() => Math.random() * 4000 + 500}
            hexPolygonsData={countries.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.3}
            hexPolygonColor={() => "rgba(255, 255, 255, 0.3)"}
          />
        </div>
      </main>
    </>
  );
}
