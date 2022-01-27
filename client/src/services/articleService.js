import httpService from './http.service'

const articleEndpoint = 'articles'

const articleService = {
  get: async (id) => {
    const { data } = await httpService.get(`${articleEndpoint}/${id}`)
    return data
  }
}

export default articleService