import { Link } from '@chakra-ui/next-js'

import { ROUTES } from '../utils/routes'

const linkStyle = {
  p: 2,
  borderTop: '1px',
  borderColor: 'white',
  fontWeight: 'bold',
  backgroundColor: 'gray.100',
  color: 'brand.orange',
}

export function Navbar() {
  return (
    <>
      {ROUTES.map(({ path, title }) => (
        <Link key={path} href={path} {...linkStyle}>
          {title}
        </Link>
      ))}
    </>
  )
}
