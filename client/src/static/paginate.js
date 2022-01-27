export function paginate (articles, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize
  return articles.slice(startIndex, pageSize + startIndex)
}