import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style';

export const Box = ({ title, children, collapse }) => {
  const [open, setState ] = useState(false);
	function toggle() {
		setState(!open);
	}

  function contentBody (open) {
    if (open) {
      return 'max-height: 0';
    }
    return 'max-height: inherit';
  }

  function content (open) {
    if (open) {
      return 'display: none';
    }
    return 'display: block';
  }

	function menuStatus(open) {
		return (open)? [style.hamburger, style.isActive].join(' ') : style.hamburger;
	}
  return (
    <div style={{ marginBottom: '10px' }}>
      <div className={style.bar}>
        <b>{title}</b>
        {collapse && <div className={menuStatus(open)} onClick={toggle} >
          <span>toggle menu</span>
        </div>}
      </div>
      <div class={style.contentWrapper} style={contentBody(open)}>
        <div style={content(open)}>
          {children}
        </div>
      </div>
    </div>
  );
}
