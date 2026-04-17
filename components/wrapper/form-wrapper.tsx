import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

export function FormWrapper({
  form,
  children,
  onSubmit,
  ...props
}: {
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  [key: string]: any;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        {...props}
        className="p-2"
      >
        {children}
      </form>
    </Form>
  );
}
