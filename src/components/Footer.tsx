import { LogoIcon } from "./Icons";
import Icon from "@mdi/react";
import { mdiRabbit } from "@mdi/js";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <Icon path={mdiRabbit} size={1.5} color="pink" />
            TchonBet
          </a>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://github.com/femedici"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Felipe Medici
          </a>
        </h3>
      </section>
    </footer>
  );
};
