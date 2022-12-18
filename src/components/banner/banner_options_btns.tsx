import style from "./style.less";

type OptionButtonProps = {
    description: React.ReactNode;
    action: () => void;
    btnText: React.ReactNode;
    isCancelButton?: boolean;
}

export const BannerOptionCancelButton = ({ description, action, btnText }) => (
    <OptionButton
        description={description}
        action={action}
        btnText={btnText}
        isCancelButton={true}
    />
);

export const BannerOptionButton = ({ description, action, btnText }) => (
    <OptionButton description={description} action={action} btnText={btnText} />
);

const OptionButton = ({ description, action, btnText, isCancelButton }: OptionButtonProps) => (
    <div className={isCancelButton ? style.bannerButtonCancel : ""}>
        <div className={style.description}>{description}</div>
        <div>
            <button className={style.bannerButton} onClick={action}>
                {btnText}
            </button>
        </div>
    </div>
);
