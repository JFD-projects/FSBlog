import httpService from './http.service'

const articleEndpoint = '/articles'

const currentArticleService = {
  get: async (id) => {
    const data = await httpService.get(`${articleEndpoint}/${id}`)
    return data
  }
}

export default currentArticleService