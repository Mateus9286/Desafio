import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string(),
  file: z.unknown(),
});

type FormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    reset();
    return null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mg">
      <div className="mb-4">
        <label className="block font-semibold mb-1">Nome Completo:</label>
        <input
          type="text"
          {...register("fullName", { required: true })}
          className="p-2 border rounded-md w-full"
        />
        {errors.fullName && (
          <span className="text-red-500">Campo obrigatório</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Email:</label>
        <input
          type="text"
          {...register("email", { required: true })}
          className="p-2 border rounded-md w-full"
        />
        {errors.email && (
          <span className="text-red-500">Campo obrigatório</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Mensagem:</label>
        <textarea
          {...register("message", { required: true })}
          className="p-2 border rounded-md w-full h-24"
        />
        {errors.message && (
          <span className="text-red-500">Campo obrigatório</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Arquivo (PDF):</label>
        <input
          type="file"
          {...register("file")}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
