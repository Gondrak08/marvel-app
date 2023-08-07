
## MarvelApp
Bem-vindo ao Marvel App.

Este aplicativo foi criado para um teste de desenvolvimento.

A aplicação foi desenvolvida utilizando `Next.js 13.4`, `TypeScript` e `TailwindCSS`.
Para as rotas públicas e privadas, e o sistema de autenticação, foram utilizadas as bibliotecas `next-auth`, `jsonwebtoken`.
As rotas necessárias foram mockadas com a biblioteca `mswjs`.

A aplicação conta com três páginas: `login`, `home` e `profile`
A página `login` se encontra em uma rota pública.
`Home` e `Profile` são rotas privadas.

Caso o usuário tente acessar qualquer uma das rotas privadas e não esteja autenticado em nossa aplicação, ele será automaticamente redirecionado para a página de  `login`.

### Validação de usuário
Na página de login, o usuário pode fazer login na aplicação utilizando as seguintes credenciais:
```
email:"teste@exemplo.com",
password:"password"
```
O usuário pode validar o seu e-mail e senha. Caso o usuário erre o e-mail, será informado do mesmo. Caso o usuário erre a senha, ele receberá um aviso.
O usuário será avisado em tela a respeito dos erros.

Assim que o usuário tem seu acesso validado, ele é redirecionado para a página de seleção de agente, onde pode escolher o agente de sua escolha. Após a seleção do agente, o usuário é redirecionado para a página de perfil, onde encontrará todos os dados do agente.

Na página home, temos a paginação dos dados da API.

### Recuperação de senha
O usuário pode utilizar a `sessão de recuperação de senhas`. Ela acessa uma mock API feita com `mswjs`, retornando `status 200` para um e-mail de acesso válido e `status 404` para o inválido.


### Home
A página home exibe todos os dados coletados da API da Marvel, retornando os heróis de forma paginada na tela, respeitando o limite de itens por tela e o `layout` proposto.
O usuário também pode pesquisar o herói desejado utilizando a barra de pesquisa na barra de navegação.

### Profile 
A página de perfil mostra o herói selecionado e os dados coletados através da API, como sugerido.

