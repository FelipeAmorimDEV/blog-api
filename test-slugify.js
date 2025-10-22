// Teste simples para verificar se a função slugify está funcionando
const { slugify } = require('./dist/core/utils/slugify.js');

console.log('Testando função slugify:');
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
