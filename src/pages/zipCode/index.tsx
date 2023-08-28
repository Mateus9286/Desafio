import { NavBar } from "@/components/NavBar";
import SearchForm from "@/components/SearchForm";

export default function BuscaCep() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text text-2xl font-semibold mb-4">
          Buscar CEP por nome de rua
        </h1>
        <SearchForm />
      </div>
    </>
  );
}
