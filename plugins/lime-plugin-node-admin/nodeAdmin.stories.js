import NodeAdminPage from './src/nodeAdminPage';

export default {
    title: 'Containers/Node Configuration'
}

export const NodeAdmin = () => <NodeAdminPage />
NodeAdmin.args = {
    queries: [
        [['lime-utils', 'get_wifi_data', {
            ap_name: {
                has_password: false
            }
        }]]
    ]
}
