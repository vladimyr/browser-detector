'use strict';

const h = require('hyperscript');
const UAParser = require('ua-parser-js');
const version = require('ua-parser-js/package.json').version;
const ObjectInspector = require('Inspector-JSON');

const packageUrl = name => `https://www.npmjs.com/package/${ name }`;

let $output = document.querySelector('.inspectors');
let parser = new UAParser();
let $dump = template('ua-parser-js', version, parser.getResult());
$output.appendChild($dump);

function template(name, version, object) {
  let $dump = h('.object-dump');
  let inspector = new ObjectInspector({ element: $dump, collapsed: false });
  inspector.view(object);

  return h(`.inspector .inspector-${ name }`,
    h('a', { href: packageUrl(name), target: '_blank' },
      h('span.title', `${ name }@${ version }`)),
    $dump);
}
