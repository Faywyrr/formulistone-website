"use client";

import { useMemo, useState } from "react";
import Modal from "@/components/modal/ModalComponent";
import { createPortal } from "react-dom";

export function useModal(
  children: React.ReactNode,
): [() => JSX.Element, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [open, setOpen] = useState(false);

  const modal = useMemo(() => {
    return () =>
      createPortal(
        <Modal open={open} setOpen={setOpen}>
          {children}
        </Modal>,
        document.body,
      );
  }, [children, open]);

  return [modal, open, setOpen];
}
