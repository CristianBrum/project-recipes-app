function headerBarByPathname(pathname) {
  switch (pathname) {
  case '/comidas':
    return ['', true];
  case '/bebidas':
    return ['', true];
  case '/explorar':
    return ['Explorar', false];
  case '/perfil':
    return ['Perfil', false];
  case '/explorar/comidas':
    return ['Explorar Comidas', false];
  case '/explorar/bebidas':
    return ['Explorar Bebidas', false];
  case '/explorar/comidas/ingredientes':
    return ['Explorar Ingredientes', false];
  case '/explorar/bebidas/ingredientes':
    return ['Explorar Ingredientes', false];
  case '/explorar/comidas/area':
    return ['Explorar Origem', false];
  case '/receitas-feitas':
    return ['Receitas Feitas', false];
  case '/receitas-favoritas':
    return ['Receitas Favoritas', false];
  default:
    return [null, null];
  }
}

export default headerBarByPathname;
