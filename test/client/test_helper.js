import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import jsdom from 'jsdom';

process.env.NODE_ENV = 'test';

chai.use(chaiEnzyme());

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
