import { Footer } from "@/components/Footer";
import { Navbar } from "./Navbar";
import { Wrench } from "lucide-react"; // Importando o ícone
import { FaWhatsapp } from "react-icons/fa";

export function MaintenceScreen() {
    return (
      <div>
        <Navbar />
        <div className="relative h-96 w-full  flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Home/searchImage.png')" }}
        >
          {/* Camada semi-transparente sobre a imagem */}
          <div className="absolute inset-0 bg-black/55"></div>
  
          {/* Conteúdo que fica acima da imagem */}
          <div className="relative bg-primaryPalet/65 text-white p-6  flex items-center gap-3 shadow-lg">
            <Wrench size={32} />
            <h1 className="text-3xl font-semibold">Em Manutenção</h1>
          </div>
        </div>
        <MaintenanceMessage/>
        <Footer/>
      </div>
    );
  }



export function MaintenanceMessage() {
  return (
    <div className="bg-gray-50 text-gray-900 py-12 px-6 sm:px-12 lg:px-24 flex flex-col items-center bg-opacity-30">
    <div className="max-w-3xl text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryPalet">
        Carta Aberta aos Nossos Clientes e Parceiros
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-gray-700">
        <strong>Prezados clientes, parceiros e amigos,</strong>
        <br /><br />
        Nos últimos anos, a <strong>Panun</strong> se dedicou a transformar sonhos em realidade, ajudando centenas de pessoas a encontrarem o lar ideal em Belo Horizonte. Hoje, damos um passo ainda maior: estamos expandindo nossa atuação para <strong>Santa Catarina</strong>, levando nossa experiência, compromisso e paixão pelo mercado imobiliário para um novo horizonte.
        <br /><br />
        Nosso site está <strong>passando por uma reformulação</strong> para refletir essa nova fase, trazendo melhorias, mais oportunidades e um serviço ainda mais eficiente para você.
        <br /><br />
        Durante essa transição, nossa equipe continua <strong>pronta para atender você</strong>. Se precisar de informações sobre imóveis, aluguéis ou qualquer outra dúvida, fale conosco pelos nossos canais de atendimento.
        <br /><br />
        Acreditamos que <strong>um imóvel é muito mais do que paredes e um teto</strong>—é o espaço onde histórias acontecem, onde famílias crescem, onde sonhos tomam forma. E queremos continuar fazendo parte dessa jornada com você.
        <br /><br />
        Muito obrigado pela confiança ao longo desses anos. Em breve, voltaremos com um novo site, novas oportunidades e a mesma dedicação de sempre.
      </p>

      {/* Botão de contato */}
      <a
        href="https://wa.me/31992450305"
        className="mt-6 justify-center justify-self-center self-center place-self-center m-auto  bg-primaryPalet text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-md hover:bg-opacity-75 transition flex gap-2 items-center flex-grow-0 flex-shrink-0 max-w-72"
      >
        <FaWhatsapp className="text-white"/>
        Click e Fale Conosco
      </a>

        <p className="mt-6 text-primaryPalet font-semibold">Email: contato@panun.com.br</p>
      <p className="mt-6 text-gray-600 font-medium">  
        <strong>Até breve,</strong>  
        <br />
        <span className="text-primaryPalet font-semibold">Equipe Panun</span>
      </p>
    </div>
  </div>
  );
}

  