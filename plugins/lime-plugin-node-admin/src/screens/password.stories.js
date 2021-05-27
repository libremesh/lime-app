import APPasswordPage from './password';

export default {
    title: 'Containers/Node Admin/Wifi Password'
}

export const withoutPassword = () => <APPasswordPage />;
withoutPassword.args = {
    queries: [
        [['lime-utils-admin', 'get_wifi_data'], {
            ap_name: {password: "", has_password: false }
        }]
    ]
};

export const withPassword = () => <APPasswordPage />;
withPassword.args = {
    queries: [
        [['lime-utils-admin', 'get_wifi_data'], {
            ap_name: {password: "12345678", has_password: true }
        }]
    ]
}
