import { MainCard } from "./MainCard";

export const MainText = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              TchonBet
            </span>{" "}
            <br></br>
          </h1>{" "}
          Solta a {" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Carta
            </span>{" "}
            coelhinho!
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Aposte de maneira facil e justa nas mais diversas partidas de Esports.
        </p>

      </div>

      {/* MainText cards sections */}
      <div className="z-10">
        <MainCard />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
