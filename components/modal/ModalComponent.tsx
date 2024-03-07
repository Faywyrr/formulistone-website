"use client";

import { cn } from "@/lib/utils";
import React, { createContext, useEffect, useRef } from "react";

export const ModalContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

export default function Modal({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (open) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }

    return () => {
      dialog?.close();
    };
  }, [open]);

  return (
    <dialog className={modalClass}>
      <div className="modal-box">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-0 top-0 m-3"
          onClick={() => setOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ModalContext.Provider value={{ open, setOpen }}>
          {children}
        </ModalContext.Provider>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button className="cursor-default" onClick={() => setOpen(false)} />
      </form>
    </dialog>
  );
}
