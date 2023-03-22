import * as moment from 'moment'
import db from '../../database';
import queues from "../../queues";

const create = (item_id: number, type: string, collection: string) => {
  try {
    queues.createJob({
      type,
      item_id,
      collection,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
  } catch (e: any) {
    throw e
  }
}

export default {
  create
}