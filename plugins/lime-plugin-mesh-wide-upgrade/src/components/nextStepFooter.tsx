import { FooterStatus } from "components/status/footer";

import { useStep } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/use-stepper";

const NextStepFooter = () => {
    const { step, showFooter } = useStep();
    ``;
    return <>{showFooter && <FooterStatus {...step} />}</>;
};

export default NextStepFooter;
