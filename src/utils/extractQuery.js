/* ?search=data&rows=3 */

/* Extracting Query Params */

export function extractQueryParams(query) {
  return query
    ? query
        .substr(1)
        .split('&')
        .reduce((queryParams, params) => {
          const [key, value] = params.split('=')
          queryParams[key] = value
          return queryParams
        }, {})
    : {}
}
