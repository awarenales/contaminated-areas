export const ROUTES = [
  { path: '/points/register', title: 'Cadastro de Pontos' },
  { path: '/parameters/register', title: 'Cadastro de Parâmetros' },
  { path: '/points/search', title: 'Pesquisar Pontos' },
  { path: '/parameters/search', title: 'Pesquisar Parâmetro' },
  { path: '/points/critical', title: 'Pontos Críticos' },
  { path: '/points/showAll', title: 'Todos os Pontos' },
]

export const getRouteTitle = (pathname: string) =>
  ROUTES.find(({ path }) => path === pathname)?.title || ''
