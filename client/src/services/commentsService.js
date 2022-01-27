import httpService from './http.service'

const commentsEndpoint = 'comments/'

const articlesService = {
  get: async () => {
    const { data } = await httpService.get(commentsEndpoint)
    return data
  }
}

export default articlesService