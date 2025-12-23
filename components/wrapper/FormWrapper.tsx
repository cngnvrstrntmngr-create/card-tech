import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import SaveExitButton from "../buttons/SaveExitButton";

export function FormWrapper({
  form,
  children,
  onSubmit,
  className,
  ...props
}: {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className="flex flex-col w-full items-center h-[90vh] justify-center"
        {...props}
      >
        <div className={cn(className, "flex flex-col w-150 py-8 px-4 ")}>
          {children}
          <SaveExitButton />
        </div>
      </form>
    </Form>
  );
}
