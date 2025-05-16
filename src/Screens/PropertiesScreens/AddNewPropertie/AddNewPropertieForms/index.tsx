import { AddPropertieProvier } from "@/context/ContextAddPropertie";
import { MultiStepForm } from "./multi-step-form";
import { Toaster } from "@/components/ui/toaster";


export function AddNewPropertieForm() { 

  return (
    <AddPropertieProvier>
      <Toaster/>
    <MultiStepForm/>
    </AddPropertieProvier>
  )}