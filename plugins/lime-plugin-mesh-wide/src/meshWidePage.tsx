import Loading from "components/loading";

const MeshWidePage = () => {
    const loading = true;
    return (
        <>
            {loading && (
                <div>
                    <Loading />
                </div>
            )}
            {!loading && <div>HELLO WORLD</div>}
        </>
    );
};

export default MeshWidePage;
