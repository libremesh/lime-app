import { useQuery, useMutation } from 'react-query';
import {
    getPortalConfig, setPortalConfig,
    getPortalContent, setPortalContent,
    createCompression
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
