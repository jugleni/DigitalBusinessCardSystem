# Instruções para Implantação do Cartão de Visita Digital

Este guia fornece instruções passo a passo para configurar e hospedar seu cartão de visita digital na Cloudflare Pages.

## Arquivos Necessários

1. `index.html`: O arquivo principal contendo todo o código HTML, CSS e JavaScript
2. `contact-data.json`: Arquivo JSON com suas informações de contato
3. Uma imagem de perfil (upload separado ou usando URL)

## Configuração do Projeto

### 1. Configurar o arquivo contact-data.json

Edite o arquivo `contact-data.json` para incluir suas informações:
```json
{
  "name": "Jugleni Krinski",
  "title": "Network Support | Software & App Development | Digital Marketing for Funnels",
  "company": "Krinski",
  "email": "jugleni@krinski.com",
  "phone": "+1 469-000-0000",
  "website": "https://www.jugleni.com",
  "instagram": "@jugleni",
  "linkedin": "https://linkedin.com/in/jugleni",
  "twitter": "https://twitter.com/jugleni",
  "facebook": "https://facebook.com/jugleni",
  "github": "https://github.com/jugleni",
  "profileImage": "https://placehold.co/200x200"
}
```

### 2. Configurar o Formulário para Receber Emails

O sistema usa [FormSubmit.co](https://formsubmit.co/), um serviço gratuito para processamento de formulários. O formulário já está configurado para enviar dados para o email definido no arquivo JSON, mas você precisa ativá-lo:

1. A primeira vez que alguém enviar um formulário, você receberá um email de confirmação do FormSubmit.co
2. Siga as instruções nesse email para ativar o serviço
3. Após a confirmação, todos os formulários preenchidos serão enviados diretamente para seu email

#### Primeira Configuração do FormSubmit

Na primeira vez que alguém enviar um formulário, você receberá um email de confirmação do FormSubmit.co. Siga as instruções para ativar o serviço.

### 3. Opcional: Configurar Integração com Planilha Google

Se preferir receber os dados em uma planilha Google:

1. Crie uma nova planilha no Google Sheets
2. Use o complemento [FormSubmit for Google Sheets](https://workspace.google.com/marketplace/app/formsubmit_for_google_sheets/262617744923)
3. Configure o complemento para receber os dados do seu formulário

## Hospedagem na Cloudflare Pages

### 1. Criar Conta na Cloudflare (se ainda não tiver)

1. Acesse [cloudflare.com](https://cloudflare.com) e crie uma conta gratuita
2. Confirme seu email e acesse o painel de controle

### 2. Hospedar o Projeto na Cloudflare Pages

#### Opção 1: Usando GitHub ou outro repositório Git

1. Crie um repositório com seus arquivos
2. No painel da Cloudflare, vá para "Pages" > "Create a project"
3. Conecte sua conta GitHub/GitLab e selecione o repositório
4. Configure como:
   - Framework preset: None
   - Build command: deixe em branco
   - Build output directory: deixe em branco
5. Clique em "Save and Deploy"

#### Opção 2: Upload direto (mais fácil)

1. No painel da Cloudflare, vá para "Pages" > "Create a project"
2. Selecione "Direct Upload"
3. Arraste e solte sua pasta contendo os arquivos ou selecione os arquivos individualmente
4. Clique em "Deploy site"

### 3. Configurar Domínio Personalizado (Opcional)

1. No painel do projeto na Cloudflare Pages, vá para "Custom domains"
2. Clique em "Set up a custom domain"
3. Siga as instruções para configurar seu domínio personalizado

## Funcionalidades e Uso

### Como Funciona o Cartão Digital:

1. **Visualização de Contato**: Os visitantes verão suas informações em um layout bonito e profissional
2. **Salvar Contato**: Os visitantes podem baixar um arquivo VCF compatível com Android e iOS
3. **Compartilhar QR Code**: Você pode compartilhar o QR Code para acesso rápido ao seu contato
4. **Formulário de Retorno**: Os visitantes podem compartilhar suas informações, que serão enviadas para seu email

### Como Usar:

1. Compartilhe o link da Cloudflare (exemplo: `seu-projeto.pages.dev`)
2. Ou compartilhe o QR Code acessando o site e clicando em "Save contact"
3. Se tiver um domínio personalizado, use-o para um endereço mais profissional

## Dicas para Personalização

Se quiser personalizar seu cartão digital:

1. **Cores**: No arquivo HTML, modifique as variáveis CSS em `:root` para alterar as cores
2. **Ícones**: Você pode encontrar mais ícones em [Font Awesome](https://fontawesome.com/icons) e substituir no HTML
3. **Imagem de perfil**: Faça upload de uma imagem de alta qualidade (recomendado: quadrada, 500x500px)

## Solução de Problemas

### Formulário não está enviando emails:
- Verifique se configurou corretamente o email no FormSubmit
- Verifique sua pasta de spam para o email de confirmação do FormSubmit

### QR Code não está funcionando:
- Certifique-se de estar usando HTTPS (Cloudflare Pages já fornece isso)
- Teste o QR Code em diferentes dispositivos

### Arquivo de contato não está salvando em alguns dispositivos:
- Certifique-se de que o formato do número de telefone está correto (+XX XX XXXXX-XXXX)
- Verifique se o arquivo VCF está formatado corretamente

## Suporte

Para problemas com a Cloudflare Pages, consulte a [documentação oficial](https://developers.cloudflare.com/pages/).

Para problemas com o FormSubmit, visite [formsubmit.co/help](https://formsubmit.co/help).