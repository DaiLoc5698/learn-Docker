import * as express from 'express';
import * as bodyParser from "body-parser";
import contactsController from './controller/contacts';
import { Contacts } from 'types';
import db from './database';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const APP_HOST = '0.0.0.0'
const APP_PORT = 8080

app.get('/contacts', async (req: any, res: any) => {
  try {
    const contacts = await contactsController.gets()
    res.send(contacts)
  } catch (e: any) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong')
  }
})

app.post('/contacts', async (req: any, res: any) => {
  try {
    const payload: Contacts = req.body
    const id = await contactsController.create(payload)

    res.send({id})
  } catch (e: any) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong')
  }
})

app.get('/contacts/:id', async (req: any, res: any) => {
  try {
    const contact = await contactsController.get(req.params.id)
    res.send({contact})
  } catch (e: any) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong')
  }
})

app.put('/contacts/:id', async (req: any, res: any) => {
  try {
    const payload: Contacts = req.body
    const contactId = req.params.id
    const contact = await contactsController.update(contactId, payload)

    res.send({contact})
  } catch (e: any) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong')
  }
})

app.delete('/contacts/:id', async (req: any, res: any) => {
  try {
    const contactId = req.params.id
    const contact = await contactsController.del(contactId)

    res.send({contact})
  } catch (e: any) {
    res.status(e?.statusCode || 500).send(e?.message || 'Something went wrong')
  }
})

app.listen(APP_PORT, APP_HOST, () => {
  console.log('VERSION 3')
  console.log(`Example app listening on http://${APP_HOST}:${APP_PORT}`)
})

export default app;