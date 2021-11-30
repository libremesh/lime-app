import { useQuery, useMutation } from 'react-query';
import {
    getPortalConfig, setPortalConfig,
    getPortalContent, setPortalContent,
    createCompression, listVouchers,
    addVoucher, rename, invalidate
} from './piraniaApi';
import queryCache from 'utils/queryCache';

export const usePortalConfig = () =>
    useQuery(['pirania', 'get_portal_config'], getPortalConfig);

export const useSetPortalConfig = () =>
    useMutation(setPortalConfig);

export const usePortalContent = () =>
    useQuery(['pirania-app', 'read_content'], getPortalContent);

export const useSetPortalContent = () =>
    useMutation(setPortalContent);

export const useLogoCompression = () =>
    useQuery(['local-service', 'logo_compression']);

export const useCreateCompression = () =>
    useMutation(createCompression, {
        onSuccess: compression =>
            queryCache.setQueryData(
                ['local-service', 'logo_compression'],
                compression
            )
    });

export function useListVouchers() {
	return useQuery(["pirania", "list_vouchers"], listVouchers, {});
}

export function useAddVoucher() {
	return useMutation(addVoucher, {
		onSuccess: (data) => {
			queryCache.invalidateQueries(["pirania", "list_vouchers"])
			return data
		}
	});
}

export function useRename() {
	return useMutation(rename, {
		onSuccess: (data) => {
			queryCache.invalidateQueries(["pirania", "list_vouchers"])
			return data
		}
	});
}

export function useInvalidate() {
	return useMutation(invalidate, {
		onSuccess: (data) => {
			queryCache.invalidateQueries(["pirania", "list_vouchers"])
			return data
		}
	});
}
