import NavList from './NavList'

export default function SubHeader() {
  const mainMenu = [
    { name: '필기구', href: '/products/writing' },
    { name: '페이퍼', href: '/products/paper' },
    { name: '다꾸/데코', href: '/products/deco' },
    { name: '사무/데스크용품', href: '/products/office' },
  ]

  return (
    <NavList
      label="main-menu"
      items={mainMenu}
      className="md:absolute md:left-1/2 md:-translate-x-1/2"
      mainMenu
    />
  )
}
