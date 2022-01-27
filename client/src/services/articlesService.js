import httpService from './http.service'

const articlesEndpoint = 'articles/'

const articlesService = {
  get: async () => {
    const { data } = await httpService.get(articlesEndpoint)
    return data
  }
}

export default articlesService