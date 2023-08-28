import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="nav">
      <Link href="/zipCode" className="btn-primary bt">
        Buscar Cep
      </Link>
      <Link href="/" className="btn-primary bt">
        Clima
      </Link>
      <Link href="/contact" className="btn-primary bt">
        Contato
      </Link>
    </div>
  );
};
