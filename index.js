"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var express = _interopRequireWildcard(require("express"));
var bodyParser = _interopRequireWildcard(require("body-parser"));
var _contacts = _interopRequireDefault(require("./controller/contacts"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
const APP_HOST = '0.0.0.0';
const APP_PORT = 8080;
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await _contacts.default.gets();
    res.send(contacts);
  } catch (e) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong');
  }
});
app.post('/contacts', async (req, res) => {
  try {
    const payload = req.body;
    const id = await _contacts.default.create(payload);
    res.send({
      id
    });
  } catch (e) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong');
  }
});
app.get('/contacts/:id', async (req, res) => {
  try {
    const contact = await _contacts.default.get(req.params.id);
    res.send({
      contact
    });
  } catch (e) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong');
  }
});
app.put('/contacts/:id', async (req, res) => {
  try {
    const payload = req.body;
    const contactId = req.params.id;
    const contact = await _contacts.default.update(contactId, payload);
    res.send({
      contact
    });
  } catch (e) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong');
  }
});
app.delete('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await _contacts.default.del(contactId);
    res.send({
      contact
    });
  } catch (e) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong');
  }
});
app.listen(APP_PORT, APP_HOST, () => {
  console.log('VERSION 3');
  console.log(`Example app listening on http://${APP_HOST}:${APP_PORT}`);
});
var _default = app;
exports.default = _default;