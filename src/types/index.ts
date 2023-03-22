type Contacts = {
  id?: number
  name: string
  phone: string
}

type Activities = {
  id?: number
  type: string
  created_at?: string
  collection: string
  item_id: number
}

export {
  Contacts,
  Activities
}