// Pirania will be rendered when navigating to this plugin
import { h } from 'preact';
import style from './piraniaStyle.less';
import { useSomething } from './piraniaQueries';

const Pirania = () => {
    const { data: something } = useSomething();
    return (
        <div>{ something }</div>
    );
}

export default Pirania;
