import fetch from 'node-fetch'
import { FormData } from 'node-fetch'

const API = 'https://sm.ms/api/v2/'

const {
  SMMS_APIKEY,
  SMMS_USERNAME,
  SMMS_PASSWORD,
} = process.env

const getAPIToken = async () => {
  const response = await fetch(API + '/', {
    method: 'POST',
    body: {
      username: 'kuyermqi@outlook.com',
      password: 'bqm6QFE6mvp*rgm3hjg',
    },
  })
  return response.json().then(res => res.data.token)
}

const upload = async imagePath => {
  const body = new FormData()
  body.append()
  const response = await fetch(API + '/', { method: 'POST', body })
}

const uploadImages = async () => {
  const apiToken = await getAPIToken()
}

export default uploadImages
