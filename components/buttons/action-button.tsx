"use client";

import ModalConfirm from "@/components/modal/ModalConfirm";
import { TrashIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ActionButton({
  id,
  handleDelete,
}: {
  id: string;
  handleDelete?: (id: string) => void;
}) {
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

      {isAdmin && (
        <button
          type="button"
          disabled={!isAdmin}
          className="cursor-pointer flex gap-2 items-center "
          onClick={() => setOpen(true)}
        >
          <TrashIcon className="h-4 w-4 text-red-700" />
          <span className="text-xs text-muted-foreground">delete</span>
        </button>
      )}
    </>
  );
}
