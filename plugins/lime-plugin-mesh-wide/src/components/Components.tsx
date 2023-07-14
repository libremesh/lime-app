import { BinIcon } from "components/icons/bin";
import { EditIcon } from "components/icons/edit";

export const EditOrDelete = ({
    onEdit,
    onDelete,
}: {
    onEdit: (e) => void;
    onDelete: (e) => void;
}) => (
    <div className={"flex flex-row gap-3"}>
        <EditIcon className={"cursor-pointer"} onClick={onEdit} />
        <BinIcon className={"cursor-pointer"} onClick={onDelete} />
    </div>
);
