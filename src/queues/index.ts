import * as Queue from 'bull';
import config from '../config';
import db from '../database';
import { Activities } from 'types';

const itemQueue = new Queue('item CURD', {
  redis: {
    port: config.redis.port,
    host: config.redis.addr
  }
})

const createJob = (options: Activities) => {
  itemQueue.add(options)
}

itemQueue.process((job: any, done: Function) => {
  crudItem(job, done)
})

const crudItem = async (job: any, done: any) => {
  try {
    const payload: Activities = job.data
    await db('activities').insert(payload)
    done();
  } catch (e: any) {
    console.log('catch', e)
  }
}

export default { createJob }