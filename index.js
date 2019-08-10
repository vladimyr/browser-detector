'use strict';

import html from 'nanohtml';
import ObjectInspector from 'Inspector-JSON';
import UAParser, { VERSION as version } from 'ua-parser-js';

const domain = url => (new URL(url)).hostname;
const packageUrl = (name, version) => `https://npmjs.com/package/${name}/v/${version}`;

const parser = new UAParser();
const $output = document.querySelector('.inspectors');
$output.appendChild(app({
  name: 'ua-parser-js',
  version,
  result: parser.getResult()
}));

function app({ name, version, result } = {}) {
  const json = JSON.stringify(result, null, 2);
  return html`
    <div class="inspector inspector-${name}">
      <a href=${packageUrl(name, version)} target="_blank">
        <span class="title">${`${name}@${version}`}</span>
      </a>
      ${jsonInspector({ value: result, config: { collapsed: false } })}
      <div class="upload">
        ${uploadButton({ action: 'http://ix.io', value: { 'f:1': json } })}
        ${uploadButton({ action: 'http://sprunge.us', value: { sprunge: json } })}
      </div>
    </div>
  `;
}

function jsonInspector({ value, config } = {}) {
  const element = html`
    <div class="object-dump"></div>
  `;
  const inspector = new ObjectInspector({ ...config, element });
  inspector.view(value);
  return element;
}

function uploadButton({ action, value, label = `Upload to ${domain(action)}` } = {}) {
  const [name] = Object.keys(value);
  value = value[name];
  return html`
    <form class="upload-form" action=${action} method="POST" accept-charset="UTF-8">
      <textarea name=${name}>${value}</textarea>
      <input class="btn-upload" type="submit" value=${label}></input>
    </form>
  `;
}
