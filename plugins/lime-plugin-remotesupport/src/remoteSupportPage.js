import { h } from 'preact';
import { route } from 'preact-router';
import { useSession, useOpenSession, useCloseSession } from './remoteSupportQueries';
import Loading from 'components/loading';
import I18n from 'i18n-js';
import style from './style.less';

const RemoteSupportPage = () => {
	const {data: session, isLoading: loadingSession, isError} = useSession({
		refetchInterval: 10000
	});
	const [openSession, openStatus] = useOpenSession();
	const [closeSession, closeStatus] = useCloseSession();

	function onShowConsole() {
		route('console');
	}

	if (isError) {
		return <div class="container container-center">
			Please check that ubus-tmate package is installed
		</div>
	}

	if (loadingSession) {
		return <div class="container container-center"><Loading /></div>
	}

	return <RemoteSupportPage_
		session={session} openError={openStatus.isError}
		isSubmitting={openStatus.isLoading || closeStatus.isLoading}
		onOpenSession={openSession} onCloseSession={closeSession} onShowConsole={onShowConsole} />;
};


export const RemoteSupportPage_ = ({session, openError=false, isSubmitting=false, onOpenSession, onCloseSession, onShowConsole}) =>
	<div class="d-flex flex-grow-1 flex-column container container-padded">
		<h4>{I18n.t("Ask for remote support")}</h4>
		{!session &&
			<div>
				<p>{I18n.t("There's no open session for remote support. Click at Create Session to begin one")}</p>
				<button onClick={onOpenSession}>{I18n.t("Create Session")}</button>
			</div>
		}
		{openError &&
			<div class={style.noteError}>
				<b>{I18n.t("Cannot connect to the remote support server")}</b><br />
				{I18n.t("Please verify your internet connection")}
			</div>
		}
		{session &&
			<div>
				<p>{I18n.t("There's an active remote support session")}.
					{session.clients && " ".concat(I18n.t("people-join-session", {count: Number(session.clients) }))}
				</p>
				<p>{I18n.t("Share the following command with whoever you want to give them access to your node")}</p>
				<div class={style.token}><pre>{session.rw_ssh}</pre></div>
				<div class={style.section}>
					<h5>{I18n.t("Show Console")}</h5>
					<p>{I18n.t("Click at Show Console to follow the remote support session.")}</p>
					<button onClick={onShowConsole}>{I18n.t("Show Console")}</button>
				</div>
				<div class={style.section}>
					<h5>{I18n.t("Close Session")}</h5>
					<p>{I18n.t("Click at Close Session to end the remote support session. No one will be able to access your node with this token again")}</p>
					<button class={style.btnDanger} onClick={onCloseSession}>{I18n.t("Close Session")}</button>
				</div>
			</div>
		}
		{isSubmitting &&
			<Loading />
		}
	</div>

export default RemoteSupportPage;
