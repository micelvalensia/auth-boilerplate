import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../schema/sign-in.schema";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "./useLoginMutation";

export const useLoginForm = () => {
  const formHandler = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useLoginMutation();

  const onSubmit = formHandler.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    ...formHandler,
    onSubmit,
    isPending: mutation.isPending,
  };
};
