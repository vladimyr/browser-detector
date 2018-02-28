'use strict';

const h = require('hyperscript');
const UAParser = require('ua-parser-js');
const version = require('ua-parser-js/package.json').version;
const ObjectInspector = require('Inspector-JSON');

const packageUrl = name => `https://www.npmjs.com/package/${name}`;

const $output = document.querySelector('.inspectors');
const parser = new UAParser();
const $dump = template('ua-parser-js', version, parser.getResult());
$output.appendChild($dump);

function template(name, version, obj) {
  const $objectDump = h('.object-dump');
  const inspector = new ObjectInspector({ element: $objectDump, collapsed: false });
  inspector.view(obj);

  return h(`.inspector .inspector-${name}`,
    h('a', { href: packageUrl(name), target: '_blank' },
      h('span.title', `${name}@${version}`)),
    $objectDump,
    h('form.upload-form', { action: 'http://sprunge.us', method: 'POST', 'accept-charset': 'UTF-8' },
      h('textarea', { name: 'sprunge', value: JSON.stringify(obj, null, 2) }),
      h('input.btn-upload', { type: 'submit', value: 'Upload to sprunge.us' })));
}
