import PostCreate from "./postCreate";

export default {
    title: "Containers/Pirania",
};

const vouchers = [
    {
        code: "PIDFIG",
        id: "x5crd4",
        name: "for luandro",
        duration_m: 14400,
        status: "available",
    },
    {
        code: "NNDAMD",
        id: "fteNhN",
        name: "for luandro",
        duration_m: 14400,
        status: "available",
    },
    {
        code: "BAVWNS",
        id: "5nLNT9",
        name: "for luandro",
        duration_m: 14400,
    },
];

export const postCreate = () => <PostCreate vouchers={vouchers} />;
