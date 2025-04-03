import { BadgeDollarSign, Bell, BookText, Boxes, BriefcaseBusiness, Building2, CalendarDays, CircleDollarSign, CircleHelp, Contact, DollarSignIcon, Flag, Folder, HandHelping, Handshake, Heart, Hotel, House, HousePlus, Info, Lightbulb, List, ListCollapse, MessageCircleQuestion, MessageSquareQuoteIcon, PlusSquare, Quote, QuoteIcon, Radar, Rocket, RocketIcon, Settings, Shapes, Store, TvMinimalPlay, User, User2, Users } from "lucide-react";

export const navigationElements = [{
  title: 'Dashboard',
  items: [
    { title: 'Home', link: '/dashboard', icon: House , status:"Novo" },
    { title: 'Meu Perfil', link: "/perfil", icon: User2, status:"Novo" },   
    { title: 'Imoveis Venda', link: "/lista-venda", icon: Boxes , status:"Novo" },
    { title: 'Imoveis Locação', link: "/lista-aluguel", icon: Shapes , status:"Novo" },
    { title: 'Clientes', link: "/clientes", icon: Handshake , status:"Novo" },
    { title: 'Propietarios', link: "/propietarios", icon: Contact , status:"Novo" },
    { title: 'Construtoras', link: "/construtoras", icon: Building2 , status:"Novo" },



    { title: 'Adicionar imovel', link: "/adicionar-imovel", icon: HousePlus, status:"Novo" },
    
    // { title: 'Dicas', link: "/dicas", icon: Lightbulb, status:"Novo" },
    // { title: 'Perguntas', link: "/perguntas", icon: CircleHelp, status:"Novo" },
    // { title: 'Acelere', link: "/acelere", icon: RocketIcon, status:"Novo" },
    // { title: 'Info', link: "/info", icon: Info, status:"Novo" },




    // { title: 'Eventos', link: "/eventos", icon: CalendarDays , status:"Em breve"}, 
    // { title: 'Configurações', link: "/configuracoes", icon: Settings, status:"Novo" },
    // { title: 'lojas', link: "/lojas", icon: Store , status:"Em breve"}, 
    // { title: 'serviços', link: "/servicos", icon: HandHelping,status:"Em breve" }, 
    // { title: 'Vagas de Trabalho', link: "/vagas-de-trabalho", icon: BriefcaseBusiness, status:"Em breve" }, 
    // { title: 'Grupos', link: '/grupos', icon: Users,status:"Em breve" },
    // { title: 'Ebooks', link: "/ebooks", icon: BookText ,status:"Em breve"},
    // { title: 'Videos', link: '/videos', icon: TvMinimalPlay,status:"Em breve" },
  ]
}]