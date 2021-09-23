import { useQuery } from 'react-query';
import { listVouchers } from './piraniaApi'

export function useListVouchers() {
	return useQuery(["pirania", "list_vouchers"], listVouchers, {});
}
