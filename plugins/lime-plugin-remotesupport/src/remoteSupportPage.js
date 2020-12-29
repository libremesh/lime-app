import { h } from 'preact';
import { useSession, useOpenSession, useCloseSession } from './remoteSupportQueries';
import Loading from 'components/loading';
import I18n from 'i18n-js';
import style from './style.less';

const RemoteSupportPage = () => {
	const {data: session, isLoading: loadingSession} = useSession();
	const [openSession, openStatus] = useOpenSession();
	const [closeSession, closeStatus] = useCloseSession();

	if (loadingSession) {
		return <div class="container container-center"><Loading /></div>
	}
	return <RemoteSupportPage_ session={session} isSubmitting={openStatus.isLoading || closeStatus.isLoading} onOpenSession={openSession} onCloseSession={closeSession} />;
};


export const RemoteSupportPage_ = ({session, serverAccesible=true, isSubmitting=false, onOpenSession, onCloseSession}) => {
	return <div class="d-flex flex-grow-1 flex-column container-padded">
		<h4>{I18n.t("Ask for remote support")}</h4>
		{!session &&
			<p>{I18n.t("There's no open session for remote support. Click at Create Session to begin one")}</p>
		}
		{!session && !serverAccesible &&
			<div class={style.noteError}>
				<b>{I18n.t("There's no connection with the remote support server.")}</b><br />
				{I18n.t("Please verify your internet connection")}
			</div>
		}
		{!session &&
			<button onClick={onOpenSession} disabled={!serverAccesible}>{I18n.t("Create Session")}</button>
		}
		{session &&
			<div>
				<p>{I18n.t("There's an active remote support session")}</p>
				<p>{I18n.t("Copy and paste the following token to share access to your node with whoever you want")}</p>
			</div>
		}
		{session &&
			<div class={style.token}><pre>{session.rw}</pre></div>
		}
		{session && !serverAccesible &&
			<div class={style.noteError}>
				<b>{I18n.t("There's no connection with the remote support server.")}</b><br />
				{I18n.t("Other people will no be able to acces your node. Please verify your internet connection")}
			</div>
		}
		{session &&
			<div class={style.section}>
				<h5>{I18n.t("Close Session")}</h5>
				<p>{I18n.t("Click at Close Session to end the remote support session. No one will be able to access your node with this token again")}</p>
				<button onClick={onCloseSession}>{I18n.t("Close Session")}</button>
			</div>
		}
		{isSubmitting &&
			<Loading />
		}
	</div>
}

export default RemoteSupportPage;
