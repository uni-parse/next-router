import getUsersArrRoutes from '@/lib/getUsersArrRoutes'

const domain = 'http://localhost:3000'

export default async function sitemap() {
  return [...getStaticRoutes(), ...getDynamicRoutes()]
}

function getStaticRoutes() {
  const localPaths = [
    '',
    'admin',
    'log-in',
    'sign-up',
    'server-component',
    'test-error',
    'users',
  ]

  const staticRoutes = localPaths.map(path => ({
    url: `${domain}/${path}`,
    lastModified: new Date().toISOString(),
  }))

  return staticRoutes
}

function getDynamicRoutes() {
  const usersArrRoutes = getUsersArrRoutes()

  const dynamicRoutes = usersArrRoutes.map(arrRoute => ({
    url: `${domain}/users/${arrRoute.join('/')}`,
    lastModified: new Date().toISOString(),
  }))

  return dynamicRoutes
}
