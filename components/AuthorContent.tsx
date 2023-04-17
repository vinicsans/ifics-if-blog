import Image from "next/image"
import AllanPoeImage from "../public/static/images/allanpoe.png"

const AuthorContent = () => {
    return (
        <div className="container flex p-8 items-center justify-center bg-slate-800 mt-4 rounded-xl border-2 border-amber-500">
            <div className="image mr-12">
                <Image src={AllanPoeImage} alt="Foto de perfil do Alan Poe" className="w-52 h-52"/>
            </div>
            <div className="text flex justify-center flex-col w-4/6">
                <h2 className="text-2xl font-bold mb-4">Quem foi Edgar Allan Poe?</h2>
                <p className="font-medium text-slate-200">Edgar Allan Poe foi um escritor, poeta e crítico literário americano do século XIX, conhecido por suas histórias e poemas macabros e enigmáticos, explorando temas como morte, loucura, solidão e sobrenatural. Poe também foi um influente crítico literário e editor, sendo uma referência para escritores contemporâneos de ficção de terror e mistério.</p>
            </div>
        </div>
    )
}

export default AuthorContent