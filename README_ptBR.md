# Guia de Verificação de Instalação

Este documento fornece um passo-a-passo para verificar se sua instalação do Cartão Digital está funcionando corretamente.

## Checklist de Arquivos

Antes de fazer upload para seu servidor, verifique se você tem todos estes arquivos:

- [x] `index.html` - O arquivo HTML principal
- [x] `styles.css` - Todos os estilos CSS
- [x] `script.js` - Todo o código JavaScript
- [x] `contact-data.json` - Seus dados de contato
- [x] (Opcional) Sua foto de perfil

## Verificação do JSON

Verifique se o arquivo `contact-data.json` está formatado corretamente:

1. O arquivo precisa ser válido em formato JSON
2. Não deve ter vírgulas extras ou incorretas
3. Todas as strings devem estar entre aspas duplas
4. Nomes de propriedades também precisam estar entre aspas duplas

Você pode validar seu JSON em: [JSONLint](https://jsonlint.com/)

## Teste Local

Para testar localmente antes de fazer upload:

1. Coloque todos os arquivos na mesma pasta
2. Use uma extensão como Live Server no VS Code para iniciar um servidor local
3. Nunca abra diretamente o arquivo HTML pelo sistema de arquivos (file://), pois isso pode causar problemas com o carregamento do JSON

## Verificação no Console

Após abrir a página, verifique o console do navegador (F12):

1. Não deve haver mensagens de erro
2. Você deve ver mensagens como:
   - "Script.js está carregando..."
   - "Tentando carregar dados de contact-data.json"
   - "Dados carregados com sucesso"
   - "Perfil inicializado com sucesso"

## Teste de Funcionamento

Para verificar o funcionamento completo:

1. **Carregamento de Dados**: Seu nome e informações de contato devem aparecer corretamente
2. **Imagem de Perfil**: Sua foto deve carregar (ou iniciais em caso de erro)
3. **Links de Contato**: Teste clicar em todos os links (email, telefone, redes sociais)
4. **Botão de Salvar Contato**: Deve abrir um arquivo vCard ou o QR Code
5. **QR Code**: Teste escanear o QR Code com outro dispositivo
6. **Formulário**: Tente enviar o formulário para testar a integração com FormSubmit

## Upload para Cloudflare Pages

Para fazer upload para o Cloudflare Pages:

1. Acesse o dashboard do Cloudflare
2. Vá para "Pages" e clique em "Create a project"
3. Escolha "Direct Upload"
4. Arraste todos os arquivos para a área indicada
5. Clique em "Deploy site"

## Verificação Após Upload

Após o upload, acesse a URL fornecida pelo Cloudflare Pages e:

1. Verifique novamente usando o console do navegador (F12)
2. Se houver problemas, verifique o painel do Cloudflare Pages em "Deployments" para possíveis erros
3. Teste todas as funcionalidades novamente

## Solução de Problemas Comuns

### Problema: Página em branco ou dados não carregam
- Verifique se todos os arquivos foram enviados
- Verifique o console do navegador para erros
- Confirme que o arquivo contact-data.json está acessível e formatado corretamente

### Problema: Links não funcionam
- Verifique se os URLs no contact-data.json estão corretos
- Confirme que os links têm o formato correto (com http:// ou https://)

### Problema: Formulário não envia emails
- Verifique se você confirmou o email de ativação do FormSubmit
- Tente enviar para um email de teste

## Conclusão

Se você seguiu todos os passos acima e tudo está funcionando corretamente, parabéns! Seu Cartão Digital está pronto para uso.

Se ainda estiver enfrentando problemas, revise este guia novamente e verifique cada passo cuidadosamente.