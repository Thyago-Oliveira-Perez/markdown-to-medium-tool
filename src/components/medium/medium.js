import React, { useMemo, useState } from 'react';
import './medium.css';
import { connect } from 'react-redux';
import converter from '../../converter.js';

const Medium = props => {
  const html = useMemo(() => converter(props), [props.content, props.codespan]);
  const content = useMemo(() => ({ __html: html }), [html]);
  const [copyState, setCopyState] = useState('idle');

  const copyToClipboard = async () => {
    if (!html || html.trim() === '') return;

    try {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const plainText = temp.innerText || temp.textContent || '';

      if (navigator.clipboard && window.ClipboardItem && navigator.clipboard.write) {
        const item = new window.ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(html);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = html;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-1000px';
        textarea.style.left = '-1000px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1200);
    } catch (e) {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 1200);
    }
  };

  return (
    <div className="mediumWrapper">
      <div className="mediumToolbar">
        <button
          type="button"
          className="mediumCopyButton"
          onClick={copyToClipboard}
          disabled={!html || html.trim() === ''}
          aria-label="Copy converted content to clipboard"
        >
          {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy to clipboard'}
        </button>
      </div>
      <div id="medium" className="medium" dangerouslySetInnerHTML={content}></div>
    </div>
  );
};

export default connect(state => ({
  content: state.content,
  codespan: state.codespan
}))(Medium);
