import { QuestionScreen } from "@/app/ui/Screens/Questions/QuestionScreen";
import { QuestionsScreen } from "@/app/ui/Screens/Questions/QuestionsScreen";
import { TipScreen } from "@/app/ui/Screens/Tips/TipScreen";

interface TipPageProps {
  params: {
    id: string;
  }
}

export default function TipPage({ params }: TipPageProps) {
  return (
    <QuestionScreen questionId={params.id} />
  );
}
