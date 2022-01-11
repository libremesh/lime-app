import { h } from 'preact';
import { route } from 'preact-router';
import { Trans } from '@lingui/macro';

import { useInvalidate } from '../piraniaQueries';
import Loading from 'components/loading';

const InvalidateVoucher = ({id}) => {
	const [invalidate, { isLoading }] = useInvalidate();

	const onInvalidate = () => {
		return invalidate(id).then(
			route(`/access/view/${id}`)
		);
	}
	return (
		<div class={`container container-padded container-center`}>
			<p>
                <Trans>
                    If you invalidate this voucher no one
                    will be able to use it anymore.
                    This cannot be reverted.
                </Trans>
            </p>
			<p>
				<Trans>Are you sure?</Trans>
			</p>
			<button onClick={onInvalidate}><Trans>Yes</Trans></button>
			<button onClick={() => route(`/access/view/${id}`)}><Trans>No, cancel</Trans></button>
			{isLoading &&
				<div>
					<Loading />
				</div>
			}
		</div>)
}

export default InvalidateVoucher;
