export default ({ goBack, submit }) => (
	<div
	style={{
			display: 'flex',
			flexFlow: 'row nowrap',
			justifyContent: 'space-around'
		}}
	>
		<select>
			<option>Nodo 1</option>
			<option>Nodo 2</option>
			<option>Nodo 3</option>
			<option>Nodo 4</option>
		</select>
		<button onClick={goBack}>Volver</button>
		<button onClick={submit}>Confirmar</button>
	</div>
);
