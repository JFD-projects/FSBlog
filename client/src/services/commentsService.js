import httpService from './http.service'

const commentsEndpoint = '/comments'

const commentsService = {
  get: async () => {
    const { data } = await httpService.get(commentsEndpoint)
    return data
  },
  post: async (payload) => {
    const { data } = await httpService.post(commentsEndpoint, payload)
    return data
  },
  delete: async (id) => {
    const { data } = await httpService.delete(`${commentsEndpoint}/${id}`)
    return data
  }
}

export default commentsService