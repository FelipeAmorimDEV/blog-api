// Teste manual da função slugify
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    // Remove acentos e caracteres especiais
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Substitui ç por c
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
    // Remove caracteres que não são letras, números, espaços ou hífens
    .replace(/[^\w\s-]/g, '')
    // Substitui espaços e underscores por hífens
    .replace(/[\s_-]+/g, '-')
    // Remove hífens do início e fim
    .replace(/^-+|-+$/g, '')
}

console.log('=== Testando função slugify ===');
console.log('Ação ->', slugify('Ação'));
console.log('Correção ->', slugify('Correção'));
console.log('Configuração ->', slugify('Configuração'));
console.log('Educação ->', slugify('Educação'));
console.log('Como Configurar a Aplicação ->', slugify('Como Configurar a Aplicação'));
console.log('Guia de Configuração Avançada ->', slugify('Guia de Configuração Avançada'));
console.log('Tutorial de Programação em JavaScript ->', slugify('Tutorial de Programação em JavaScript'));
console.log('Açúcar ->', slugify('Açúcar'));
console.log('Ção ->', slugify('Ção'));
console.log('Ação e Reação ->', slugify('Ação e Reação'));
console.log('Café ->', slugify('Café'));
console.log('API v2.0 ->', slugify('API v2.0'));
console.log('Hello, World! ->', slugify('Hello, World!'));
console.log('Multiple   Spaces ->', slugify('Multiple   Spaces'));
