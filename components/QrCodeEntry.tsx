"use client";

import { useModal } from "@/hooks/useModal";
import { PrismaQrCode } from "@/types/user";
import QrCodeEditModal from "./modal/QrCodeEditModal";
import QrCodeDeleteModal from "./modal/QrCodeDeleteModal";
import Image from "next/image";
import Link from "next/link";

const qrCodeLink = process.env.NEXT_PUBLIC_URL + "/qrcode/";
const qrCodeApi =
  "https://api.qrserver.com/v1/create-qr-code/?data=" + qrCodeLink;

export default function QrCodeEntry({ qrCode }: { qrCode: PrismaQrCode }) {
  const [QrCodeEditModalComponent, openEdit, setOpenEdit] = useModal(
    <QrCodeEditModal qrCode={qrCode} />,
  );

  const [QrCodeDeleteModalComponent, openDelete, setOpenDelete] = useModal(
    <QrCodeDeleteModal qrCode={qrCode} />,
  );

  return (
    <>
      <QrCodeEditModalComponent />
      <QrCodeDeleteModalComponent />
      <tr>
        <td>
          <Image
            src={qrCodeApi + qrCode.code}
            width={100}
            height={100}
            alt="QrCode"
          />
        </td>
        <td>{qrCode.code}</td>
        <td>{qrCode.staff?.name}</td>
        <td>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setOpenEdit(true)}
              className="btn btn-primary"
            >
              Modifier
            </button>
            <Link
              href={qrCodeApi + qrCode.code}
              target="_blank"
              className="btn btn-secondary"
            >
              Télécharger
            </Link>
            <Link
              href={qrCodeLink + qrCode.code}
              target="_blank"
              className="btn btn-neutral"
            >
              Ouvrir
            </Link>
            <button
              onClick={() => setOpenDelete(true)}
              className="btn btn-accent"
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
