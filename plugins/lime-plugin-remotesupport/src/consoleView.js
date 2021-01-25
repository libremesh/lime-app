import { h } from 'preact';
import { useSession } from './remoteSupportQueries';
import { useEffect, useState } from 'preact/hooks';
import Loading from 'components/loading';
import I18n from 'i18n-js';
import { route } from 'preact-router';
import style from './style.less';

export const ConsoleView_ = ({ sessionSrc, goBack}) =>
	<div class="d-flex flex-column flex-grow-1">
		<iframe class="flex-grow-1" src={sessionSrc} />
		<div class={`d-flex justify-content-center ${style.consoleButtons}`}>
			<button onClick={goBack}>{I18n.t("Hide Console")}</button>
		</div>
	</div>

function toWeb(rwSsh) {
	const rwSshParts = rwSsh.split(" ");
	const [token, domain] = rwSshParts[rwSshParts.length - 1].split('@');
	return `https://${domain}/t/${token}`;
}

const ConsoleView = () => {
	const { data: session, isLoading } = useSession();
	const [sessionSrc, setSessionSrc] = useState(null);

	useEffect(() => {
		if (!isLoading && !session) goBack();
	}, [isLoading, session])

	useEffect(() => {
		if (session) {
			setSessionSrc(toWeb(session.rw_ssh))
		}
	}, [session])
	
	function goBack() {
		route('/remotesupport');
	}

	if (isLoading) {
		return <div class="container container-center"><Loading /></div>
	}

	return <ConsoleView_ sessionSrc={sessionSrc} goBack={goBack} />
}

export default ConsoleView;
