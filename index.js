'use strict';

import assign from 'object-assign';
import h from 'hyperscript';
import ObjectInspector from 'Inspector-JSON';
import UAParser, { VERSION as version } from 'ua-parser-js';
const urlParser = document.createElement('a');

const domain = url => {
  urlParser.href = url;
  return urlParser.hostname;
};
const packageUrl = name => `https://npm.im/${name}`;

const parser = new UAParser();
const $output = document.querySelector('.inspectors');
const $fragment = template('ua-parser-js', version, parser.getResult());
$output.appendChild($fragment);

function template(name, version, obj) {
  const json = JSON.stringify(obj, null, 2);
  return h(`.inspector .inspector-${name}`,
    h('a', { href: packageUrl(name), target: '_blank' },
      h('span.title', `${name}@${version}`)),
    jsonInspector(obj, { collapsed: false }),
    h('.upload',
      uploadButton('http://ix.io', { 'f:1': json }),
      uploadButton('http://sprunge.us', { sprunge: json })));
}

function jsonInspector(obj, options) {
  const element = h('.object-dump');
  options = assign({ element }, options);
  const inspector = new ObjectInspector(options);
  inspector.view(obj);
  return element;
}

function uploadButton(action, payload, label = `Upload to ${domain(action)}`) {
  const [name] = Object.keys(payload);
  const value = payload[name];
  return h('form.upload-form', { action, method: 'POST', 'accept-charset': 'UTF-8' },
    h('textarea', { name, value }),
    h('input.btn-upload', { type: 'submit', value: label }));
}
