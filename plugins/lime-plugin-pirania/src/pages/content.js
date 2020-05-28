/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getPiraniaContent, writeContent } from '../piraniaActions';
import { loading, content } from '../piraniaSelectors';

import I18n from 'i18n-js';
import { Box } from '../../../../src/components/box';
import Loading from '../../../../src/components/loading';
import { Input } from '../../../../src/components/input';
import { useInput } from '../../../../src/utils/hooks';

export function ContentPiraniaPage({ goBack, content, loading, writeContent, getPiraniaContent }) {
	const [ uploadedImage, setUploadedImage ] = useState(null);
	useEffect(() => {
		getPiraniaContent();
		return () => { };
	}, []);
	function handleImage (e) {
		const fileName = e.target.files[0].name;
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = event => {
			const img = new Image();
			img.src = event.target.result;
			img.onload = () => {
				const elem = document.createElement('canvas');
				const width = 50;
				const scaleFactor = width / img.width;
				elem.width = width;
				elem.height = img.height * scaleFactor;
				const ctx = elem.getContext('2d');
				ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
				ctx.canvas.toBlob((blob) => {
					new File([blob], fileName, {
						type: 'image/jpeg',
						lastModified: Date.now()
					});
				}, 'image/jpeg', 1);
				setUploadedImage(ctx.canvas.toDataURL('image/jpeg'));
			},
			// eslint-disable-next-line no-console
			reader.onerror = error => console.log(error);
		};
	}
	if (content) {
		const { value: title , bind: bindTitle } = useInput(content.title);
		const { value: backgroundColor , bind: bindBackgroundColor } = useInput(content.backgroundColor);
		const { value: welcome , bind: bindWelcome } = useInput(content.welcome);
		const { value: body , bind: bindBody } = useInput(content.body);
		const { value: mediaUrl , bind: bindMediaUrl } = useInput(content.mediaUrl);
		const { value: rules , bind: bindRules } = useInput(content.rules);
		// eslint-disable-next-line no-inner-declarations
		function submitForm(e) {
			e.preventDefault();
			const data = {
				title,
				backgroundColor,
				welcome,
				body,
				logo: uploadedImage || content.logo,
				rules,
				mediaUrl
			};
			writeContent(data);
		}
		return (
			<div>
				<button class="button green block" onClick={goBack}>
					{I18n.t('Go back')}
				</button>
				<Box title={I18n.t('Edit captive portal content')}>
					<Input width={'100%'}  {...bindTitle} label={I18n.t('Portal title')} type="text" value={title} />
					{<img src={uploadedImage || content.logo} />}
					<Input onChange={handleImage} type="file" accept="image/*" />
					<Input width={'200px'}  {...bindBackgroundColor} label={I18n.t('Portal background color')} type="color" value={backgroundColor} />
					<Input width={'100%'} {...bindWelcome} label={I18n.t('Portal welcome message')} type="textarea" value={welcome} />
					<Input width={'100%'} {...bindBody} label={I18n.t('Portal welcome message')} type="textarea" value={body} />
					<Input width={'100%'} {...bindMediaUrl} label={I18n.t('Media url for portal information page')} type="text" value={mediaUrl} />
					<Input width={'100%'} {...bindRules} label={I18n.t('Rules displayed on portal information page')} type="textarea" value={rules} />
				</Box>
				{!loading && <Input type={'submit'} label={I18n.t('Save')} onClick={submitForm} />}
			</div>
		);
	} return <Loading />;
}

export const mapStateToProps = state => ({
	loading: loading(state),
	content: content(state)
});

export const mapDispatchToProps = dispatch => ({
	writeContent: bindActionCreators(writeContent, dispatch),
	getPiraniaContent: bindActionCreators(getPiraniaContent, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ContentPiraniaPage);
