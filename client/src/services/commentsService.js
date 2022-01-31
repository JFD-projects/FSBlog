import httpService from './http.service'

const commentsEndpoint = 'comments/'

const commentsService = {
  get: async () => {
    const { data } = await httpService.get(commentsEndpoint)
    return data
  }
}

export default commentsService