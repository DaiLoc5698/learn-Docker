import db from '../../database';
import { Contacts } from 'types';
import activitiesController from '../activities'

const create = async (payload: Contacts) => {
  try {
    const id = await db('contacts').insert(payload)
    // activitiesController.create(id[0], 'POST', 'contacts')

    return id[0];
  } catch (e: any) {
    throw e
  }
}

const update = async (id: number, payload: Contacts) => {
  try {
    await db('contacts').where({ id: id }).update(payload)
    // activitiesController.create(id, 'PUT', 'contacts')

    const contact = await db('contacts').where({ id: id })

    return contact;
  } catch (e: any) {
    throw e
  }
}

const del = async (id: number) => {
  try {
    await db('contacts').where({ id: id }).del()
    // activitiesController.create(id, 'DELETE', 'contacts')

    return id
  } catch (e: any) {
    throw e
  }
}

const gets = async () => {
  try {
    const contacts = await db('contacts')
    return contacts
  } catch (e: any) {
    throw e;
  }
}

const get = async (id: number) => {
  try {
    const contact = await db('contacts').where({ id: id })
    return contact
  } catch (e: any) {
    throw e;
  }
}

export default {
  get,
  del,
  gets,
  create,
  update
}