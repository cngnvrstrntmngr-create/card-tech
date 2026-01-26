"use client";

import ModalConfirm from "@/components/modal/ModalConfirm";
import { PenBoxIcon, TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionButton({
  id,
  mainTag,
  handleDelete,
}: {
  id: string;
  mainTag: string;
  handleDelete?: (id: string) => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    setOpen(false);
    handleDelete && handleDelete(id);
  };

  return (
    <>
      <ModalConfirm
        open={open}
        setOpen={setOpen}
        handleConfirm={handleConfirm}
        message="удалить"
      />
      <div className="flex justify-between gap-6 w-full">
        <button
          disabled={!isAdmin}
          className="cursor-pointer"
          onClick={() => router.push(`/${mainTag}/${id}`)}
        >
          <PenBoxIcon className="h-4 w-4 text-blue-700" />
        </button>
        {isAdmin && (
          <button
            disabled={!isAdmin}
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="h-4 w-4 text-red-700" />
          </button>
        )}
      </div>
    </>
  );
}
