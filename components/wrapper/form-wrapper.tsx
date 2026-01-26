import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import SaveExitButton from "../buttons/save-button";

export function FormWrapper({
  form,
  children,
  onSubmit,
  className,
  resetForm,
  disabled = false,
  ...props
}: {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
  resetForm?: () => void;
  [key: string]: any;
  disabled?: boolean;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit || (() => {}))} {...props}>
        <div className={cn(className, "flex flex-col w-full py-8 px-4 ")}>
          {children}
          <SaveExitButton resetForm={resetForm} disabled={disabled} />
        </div>
      </form>
    </Form>
  );
}
