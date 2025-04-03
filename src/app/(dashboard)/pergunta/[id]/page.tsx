import { QuestionScreen } from "@/ui/Screens/Questions/QuestionScreen";
import { QuestionsScreen } from "@/ui/Screens/Questions/QuestionsScreen";
import { TipScreen } from "@/ui/Screens/Tips/TipScreen";

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
