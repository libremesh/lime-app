import { useQuery, useMutation } from 'react-query';
import { getPortalConfig, setPortalConfig} from './piraniaApi';

export const usePortalConfig = () =>
    useQuery(['pirania', 'get_portal_config'], getPortalConfig);

export const useSetPortalConfig = () =>
    useMutation(setPortalConfig);
