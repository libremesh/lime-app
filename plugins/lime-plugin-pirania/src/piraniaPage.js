import { Loading } from "components/loading";

import { useListVouchers } from "./piraniaQueries";
import VoucherList from "./screens/voucherList";

const PiraniaPage = ({}) => {
    const { isLoading } = useListVouchers();
    if (isLoading) {
        return (
            <div className="container container-center">
                <Loading />
            </div>
        );
    }
    return <VoucherList />;
};

export default PiraniaPage;
