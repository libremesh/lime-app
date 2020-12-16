import { h } from 'preact';

const RemoteSupportPage = ({session, consoleViewable=false, remoteHostAccesible=true, onCreateSession, onConsoleViewTogle, onCloseSession}) => {
	return <div>
		{!remoteHostAccesible &&
			<div> El host remoto está inaccesible, verifique la conexión con la internet para usar esta funcionalidad. </div>}
		{remoteHostAccesible && 
			<div> Hay conexión a internet, puede usar esta funcionalidad.</div>}
		{!session && remoteHostAccesible &&
			<div>
				No hay sesion abierta.
				<button onClick={onCreateSession}>Crear sesion</button>
			</div>
		}
		{session && remoteHostAccesible && !consoleViewable &&
			<div>
				Sesión abierta.<br/>
				Consola interactiva.
				<pre>{session.rw}</pre>
				Copie el texto de este cuadro y compártalo con quien le de soporte.
				<button onClick={onConsoleViewTogle}>ver</button>
				<button onClick={onCloseSession}>Cerrar sesion</button>
			</div>
		}
		{session && remoteHostAccesible && consoleViewable &&
			<div>
				<textarea>texto</textarea>
				<button onClick={onConsoleViewTogle}>Cerrar ventana</button>
				<button onClick={onCloseSession}>Cerrar sesion</button>
			</div>
		}
	</div>
}

export default RemoteSupportPage;
