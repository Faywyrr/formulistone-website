import { useContext } from "react";
import { ModalContext } from "./ModalComponent";

export default function AlloSecretModal() {
  const { open, setOpen } = useContext(ModalContext);

  return (
    <div>
      <h1 className="text-center text-4xl font-bold">Allo Sex</h1>
      <p>Le président vous fait une finition pompom</p>
      <a className="badge badge-primary" href="tel:+33684001750">
        +33684001750
      </a>
    </div>
  );
}
