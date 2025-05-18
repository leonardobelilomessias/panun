import { 
  User,
  Home,
  Building,
  CalendarCheck2,
  Users,
  Handshake,
  Landmark,
  CircleDashed,
  PlusCircle,
  LayoutDashboard,
  DollarSign,
  ClipboardList
} from "lucide-react";

export const navigationElements = [{
  title: 'Dashboard',
  items: [
    { title: 'Dashboard', link: '/dashboard', icon: LayoutDashboard, status: "Novo" },
    { title: 'Meu Perfil', link: "/perfil", icon: User, status: "Novo" },   
    
    // Ícones atualizados com alternativas mais específicas
    { title: 'Imóveis à Venda', link: "/lista-venda", icon: DollarSign, status: "Novo" },
    { title: 'Imóveis para Locação', link: "/lista-aluguel", icon: CalendarCheck2, status: "Novo" },
    { title: 'Corretores', link: "/corretores", icon: Users, status: "Novo" },
    { title: 'Clientes', link: "/clientes", icon: Handshake, status: "Novo" },
    { title: 'Proprietários', link: "/proprietarios", icon: Landmark, status: "Novo" },
    { title: 'Leads', link: "/leads", icon: CircleDashed, status: "Novo" },
    { title: 'Adicionar Imóvel', link: "/adicionar-imovel", icon: PlusCircle, status: "Novo" },
    
    // Sugestão de item adicional que poderia ser útil
    { title: 'Listagens', link: "/listagens", icon: ClipboardList, status: "Novo" }
  ]
}];