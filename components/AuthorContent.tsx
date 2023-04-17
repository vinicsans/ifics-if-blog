import Image from "next/image";
import AllanPoeImage from "../public/static/images/allanpoe.png";

const AuthorContent = () => {
  return (
    <div className="container mt-4 flex items-center justify-center rounded-xl border-2 border-amber-500 bg-slate-800 p-8">
      <div className="image mr-12">
        <Image
          src={AllanPoeImage}
          alt="Foto de perfil do Alan Poe"
          className="h-52 w-52"
        />
      </div>
      <div className="text flex w-4/6 flex-col justify-center">
        <h2 className="mb-4 text-2xl font-bold">Quem foi Edgar Allan Poe?</h2>
        <p className="font-medium text-slate-200">
          Edgar Allan Poe foi um escritor, poeta e crítico literário americano
          do século XIX, conhecido por suas histórias e poemas macabros e
          enigmáticos, explorando temas como morte, loucura, solidão e
          sobrenatural. Poe também foi um influente crítico literário e editor,
          sendo uma referência para escritores contemporâneos de ficção de
          terror e mistério.
        </p>
      </div>
    </div>
  );
};

export default AuthorContent;
