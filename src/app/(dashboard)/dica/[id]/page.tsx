import { TipScreen } from "@/app/ui/Screens/Tips/TipScreen";

interface TipPageProps {
  params: {
    id: string;
  }
}

export default function TipPage({ params }: TipPageProps) {
  return (
    <TipScreen tipId={params.id} />
  );
}
