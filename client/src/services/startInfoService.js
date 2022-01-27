import api from '../api'

const startInfoService = {
  fetchAll: async () => {
    const startInfo = await api.articles.fetchAllMain()
    return startInfo
  }
}

export default startInfoService