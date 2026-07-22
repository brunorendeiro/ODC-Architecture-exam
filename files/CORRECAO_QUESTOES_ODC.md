# Correção e guia de estudo — ODC Architecture Specialist

> **Auditoria técnica (2026-07-22):** As Questões 5, 7, 12 e 28 foram alinhadas com as fontes oficiais. A Questão 5 testa a pasta redundante do bounded context; a 7 testa Screen entre Apps; a 12 separa Check<Role> de Grant/Revoke; a 28 usa public Entities para reference data estável.

## Âmbito

As fotografias disponíveis cobrem as **questões 5 a 30**. As questões 1 a 4 não estão na pasta.

As imagens `IMG_8881.JPG` a `IMG_8886.JPG` são fotografias repetidas das questões 27 a 30. A moldura laranja mostra a opção selecionada durante o teste; **não significa necessariamente que esteja correta**.

## Gabarito rápido

| Questão | Resposta | Tema principal |
|---:|:---:|---|
| 5 | A | Naming conventions |
| 6 | B | Direct Integration vs. Cold Cache |
| 7 | D | Referências entre aplicações |
| 8 | D | Cold Cache |
| 9 | B | Event-Driven Architecture |
| 10 | D | Divisão de bounded contexts em apps |
| 11 | C | Settings em Libraries |
| 12 | A | Roles entre aplicações |
| 13 | A | Capacidade de processamento de Events |
| 14 | D | Navegação entre aplicações |
| 15 | B | Elementos consumidos de uma Library |
| 16 | A | Encapsulamento de dados de negócio |
| 17 | B | Ownership e independência de releases |
| 18 | A | Partilha de dados com regras de negócio |
| 19 | B | NFRs vs. Business Concepts |
| 20 | B | Containers e stages |
| 21 | C | Ordem de entrega de Events |
| 22 | D | Saga e compensação |
| 23 | A | Integration Service Wrappers |
| 24 | A | Timers |
| 25 | C | Ownership claro |
| 26 | D | Compensação de uma transação distribuída |
| 27 | D | Blocks reutilizáveis |
| 28 | A | Dados de referência partilhados |
| 29 | D | Objetivo das Libraries |
| 30 | A | Architecture Design Process |

## Perguntas e opções

> **Nota de transcrição:** os enunciados abaixo foram reconstruídos a partir das fotografias. Mantêm o significado e as opções visíveis, embora algumas frases possam não coincidir palavra por palavra com o exame. As opções a **negrito** são as respostas corretas.

### Questão 5

Considerando as boas práticas de naming no bounded context **Policy Management**, qual das seguintes opções está incorreta?

- **A. Colocar todos os elementos numa pasta com o nome do bounded context, como `PolicyManagement`.**
- B. Usar pastas para conceitos internos do negócio, como Risk ou Policy.
- C. Nomear elementos pelo conceito e propósito, por exemplo `RiskGetAssessment`.
- D. Dar à aplicação o nome do bounded context, por exemplo `PolicyManagement`.

### Questão 6

Em que cenário deve ser usada uma **Direct Integration** em vez de uma **Cold Cache**?

- A. Quando o desempenho da aplicação não é uma preocupação.
- **B. Quando a aplicação não tolera atrasos na atualização dos dados.**
- C. Quando são necessárias atualizações frequentes dos dados.
- D. Quando a API de origem não suporta sincronização diferencial.

### Questão 7

Qual dos seguintes elementos pode ser referenciado entre aplicações ODC?

- A. Themes.
- B. Server Actions.
- C. Client Actions.
- **D. Screens.**

### Questão 8

Qual das seguintes opções descreve uma finalidade da utilização de uma **Cold Cache Pattern** numa integração com um sistema externo?

- A. Reduzir a complexidade de desenvolvimento necessária numa ligação direta.
- B. Garantir integração de dados em tempo real.
- C. Abstrair várias implementações do mesmo serviço numa única Library.
- **D. Evitar sobrecarregar as APIs do sistema externo.**

### Questão 9

Qual é um benefício da utilização de **Event-Driven Architecture** entre aplicações?

- A. Criar uma vista global e sempre consistente de dados descentralizados.
- **B. Promover baixo acoplamento e ciclos de vida independentes.**
- C. Criar automaticamente uma transação distribuída.
- D. Criar dependências fortes entre produtores e consumidores.

### Questão 10

Qual dos seguintes **não** é um critério-chave para escolher uma abordagem simples ou distribuída ao mapear bounded contexts para aplicações?

- **A. Business Sponsor.**
- B. Business Owner.
- C. Número e autonomia das equipas de produto.
- D. Expectativas dos utilizadores e coerência da experiência.

### Questão 11

Uma Library contém um Setting secreto consumido por várias aplicações. Qual afirmação está correta?

- A. O valor é definido definitivamente na Library na primeira promoção para QA.
- B. Uma alteração é imediatamente aplicada, de forma síncrona, a todas as instâncias e consumidores.
- **C. O Setting é configurado na aplicação consumidora e pode variar por stage.**
- D. Cada alteração exige mudar o valor no ODC Studio e publicar uma nova versão.

### Questão 12

A aplicação **Claims** possui o Role `Administrator` e **Billing** precisa de verificar a mesma autorização. Qual é a abordagem recomendada?

- **A. Billing referencia o Role público e usa `CheckAdministrator` nas verificações de autorização.**
- B. Claims expõe Service Actions para operações controladas de Grant/Revoke quando existem validações ou regras de negócio.
- C. Billing cria outro Role `Administrator`.
- D. O Role é movido para uma Library partilhada.

### Questão 13

O que acontece quando são disparados mais Events do que a capacidade de processamento simultâneo?

- **A. Os Events são adicionados à runtime queue até esta atingir a sua capacidade.**
- B. A aplicação inteira fica pausada até existir capacidade.
- C. A plataforma reduz o tempo de execução dos Events em curso.
- D. Os Events excedentes são imediatamente descartados.

### Questão 14

Um menu comum, implementado num Block de uma Library, deve navegar para Screens de várias aplicações. Qual é a abordagem recomendada?

- A. Guardar os URLs numa entidade e criar um Service Action em cada aplicação.
- B. Referenciar diretamente os Screens no Block.
- C. Obter todos os URLs através de Service Actions das aplicações.
- **D. Usar URLs externos estáticos para os Screens das respetivas aplicações.**

### Questão 15

Qual dos seguintes elementos de uma Library pode ser consumido por uma aplicação?

- A. Service Action.
- **B. Server Action.**
- C. Entidade de negócio persistente.
- D. Role.

### Questão 16

Orders e Shipping usam a entidade pública `Supplier` e repetem Aggregates e cálculos. Como deve ser melhorada a arquitetura?

- **A. Tornar Supplier privada e encapsular dados e regras em Service Actions.**
- B. Dividir Supplier em entidades separadas por tipo de fornecedor.
- C. Expor Server Actions diretamente entre as aplicações.
- D. Manter a entidade pública e os cálculos em cada consumidor.

### Questão 17

Num cenário, Claims e Billing têm Business Owners diferentes mas estão na mesma aplicação. Qual afirmação está correta?

- A. Todos os cenários apresentados garantem independência de releases.
- **B. Claims e Billing devem ser separados em aplicações diferentes.**
- C. O problema é apenas existirem vários Business Sponsors.
- D. Ter um Business Owner e um Business Sponsor compromete a autonomia.

### Questão 18

Como devem ser partilhados dados entre aplicações quando existem também regras de acesso e requisitos de negócio?

- **A. Encapsular o acesso e as regras em Service Actions.**
- B. Converter os dados em Static Entities.
- C. Expor Server Actions entre as aplicações.
- D. Expor diretamente as entidades públicas.

### Questão 19

Qual afirmação distingue corretamente **Non-Functional Requirements (NFRs)** de **Business Concepts**?

- A. NFRs descrevem apenas integrações externas.
- **B. NFRs descrevem qualidades técnicas/operacionais; Business Concepts descrevem o domínio.**
- C. NFRs definem sobretudo owners, sponsors e equipas.
- D. Os dois termos são equivalentes e descrevem requisitos funcionais.

### Questão 20

Como é publicada e promovida uma aplicação através dos stages ODC?

- A. O código pode ser alterado e publicado independentemente em qualquer stage.
- **B. A aplicação é publicada em Development e o mesmo container é promovido separada e sequencialmente.**
- C. Publicar em Development faz deployment automático em todos os stages.
- D. Todas as promoções são automáticas e não exigem controlos de deployment.

### Questão 21

Qual afirmação sobre a ordem de entrega de Events está correta?

- A. É sempre igual à ordem em que foram disparados.
- B. É definida por uma prioridade global escolhida pelo developer.
- **C. A ordem de entrega não é garantida.**
- D. Existe sempre uma ordem FIFO estrita na runtime queue.

### Questão 22

Qual das seguintes opções **não** é um mecanismo de compensação numa Saga?

- A. Apagar ou invalidar dados criados num passo anterior.
- B. Executar uma operação inversa, como um débito que anula um crédito.
- C. Repor a aplicação num estado de negócio consistente.
- **D. Fazer retry da operação que falhou.**

### Questão 23

Qual afirmação sobre **Integration Service Wrappers** é falsa?

- **A. Uma dependência de uma aplicação para uma Library é uma integração runtime fracamente acoplada.**
- B. Um wrapper reutilizável pode esconder a implementação da API e ser candidato a componente Forge.
- C. Um wrapper permite reutilizar a mesma integração externa em várias aplicações.
- D. Centralizar a adaptação reduz o impacto de alterações do fornecedor.

### Questão 24

Qual afirmação sobre **Timers** é correta?

- **A. Um Timer só pode ser criado numa aplicação.**
- B. O horário é definido exclusivamente no ODC Portal.
- C. O horário tem obrigatoriamente de ser igual em todos os stages.
- D. Um Timer só pode executar no horário periódico e nunca manualmente.

### Questão 25

Porque é importante ter ownership claro no desenho da arquitetura?

- A. Porque garante a redução da complexidade técnica.
- B. Porque aumenta o fluxo de comunicação.
- **C. Porque ajuda a compreender a organização e quem responde por cada domínio.**
- D. Apenas porque reduz a carga cognitiva dos developers.

### Questão 26

Numa Saga, `Subscribe Policy` termina com sucesso e depois `Create Payment` falha. O que deve acontecer?

- A. Apagar os registos do pagamento falhado.
- B. Repetir toda a transação desde o início.
- C. Ignorar a falha e continuar.
- **D. Executar a compensação de `Subscribe Policy`.**

### Questão 27

Orders e Shipping precisam de reutilizar o mesmo Block. Qual etapa **não** pertence à abordagem recomendada?

- A. Colocar o Block numa nova Library.
- B. Fazer o Block receber dados por Input Parameter.
- C. Orders expor por Service Action os dados/cálculos de que Shipping necessita.
- **D. Colocar lógica e dados específicos do negócio dentro do Block partilhado.**

### Questão 28

Country e City são dados de referência usados por Directory, Vacations e Travel Portal. Qual é a arquitetura recomendada?

- **A. Criar uma aplicação Location, expor Country e City como public Entities e permitir referências diretas pelos consumidores.**
- B. Manter as Entities privadas e expor Service Actions apesar de não existirem regras ou restrições de acesso no cenário.
- C. Manter ownership dos dados na aplicação Directory.
- D. Expor Country e City diretamente a Vacations e Travel Portal.

### Questão 29

Qual é o principal propósito arquitetural das **Libraries**?

- A. Criar forte acoplamento de build.
- B. Empacotar automaticamente código no container consumidor.
- C. Partilhar qualquer tipo de código, incluindo lógica específica do negócio.
- **D. Implementar componentes reutilizáveis e agnósticos ao negócio.**

### Questão 30

Qual é o primeiro passo do **Architecture Design Process** para identificar bounded contexts?

- **A. Entrevistar os stakeholders.**
- B. Mapear as relações entre conceitos.
- C. Organizar os conceitos recolhidos.
- D. Definir as fronteiras e responsabilidades.

## Correção explicada

### Questão 5 — A

**A opção incorreta é a A**, que repete o bounded context numa pasta `PolicyManagement` quando a própria App já representa essa fronteira.

As pastas devem organizar conceitos internos do negócio. Um nome como `RiskGetAssessment` combina o conceito e o propósito e segue a recomendação. A App deve receber o nome do bounded context.

Documentação oficial: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/

### Questão 6 — B

Usa-se **Direct Integration quando a aplicação não tolera atrasos na atualização dos dados**.

Uma integração direta consulta o sistema externo no momento da utilização e favorece dados atuais. Uma Cold Cache aceita alguma desatualização em troca de menor dependência operacional, menor latência e menor carga sobre a API externa.

### Questão 7 — D

O elemento indicado é **Screen**.

Uma App pode referenciar um Screen público de outra App para navegação cross-App. Themes reutilizáveis são partilhados através de Libraries; Server Actions e Client Actions não são contratos App-to-App.

Documentação oficial: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/

### Questão 8 — D

Uma finalidade importante da **Cold Cache é evitar sobrecarregar as APIs do sistema externo**.

A aplicação guarda localmente uma cópia dos dados e atualiza-a segundo uma estratégia definida. Isso reduz chamadas, latência e dependência da disponibilidade do sistema externo. Não garante dados em tempo real.

### Questão 9 — B

A Event-Driven Architecture promove **baixo acoplamento e ciclos de vida independentes** entre aplicações.

O produtor publica um evento sem ter de conhecer a implementação dos consumidores. Cada consumidor pode evoluir e ser publicado separadamente. A arquitetura não cria transações distribuídas automáticas nem garante uma vista global consistente dos dados.

### Questão 10 — D

**As expectativas dos utilizadores/look & feel não são o critério-chave** apresentado para decidir entre uma abordagem simples ou distribuída ao mapear bounded contexts para aplicações.

Business Owner, Business Sponsor e número/autonomia das equipas de produto são critérios explícitos do Assemble porque determinam ownership e ritmo de releases.

Documentação oficial: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/

### Questão 11 — C

O valor do Setting é **configurado na aplicação consumidora e pode variar por stage**, por exemplo Development, QA e Production.

Um Setting secreto não deve ser fixado no código nem transportado como se fosse igual em todos os ambientes. A alteração operacional do valor também não exige criar uma nova versão do código da aplicação.

### Questão 12 — A

Claims pode tornar o Role público e Billing pode referenciá-lo para verificações com `CheckAdministrator`.

Grant/Revoke são operações de atribuição diferentes da verificação: devem permanecer controladas pelo owner e podem ser encapsuladas em Service Actions de Claims quando existem validações ou regras de negócio. Duplicar o Role criaria uma identidade de autorização diferente.

Documentação oficial: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/

Documentação oficial: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/

### Questão 13 — A

Os Events continuam a ser adicionados à **runtime queue até esta atingir a respetiva capacidade**.

A plataforma não acelera artificialmente os eventos já em execução nem descarta imediatamente os eventos excedentes. A fila absorve o pico e os consumidores processam os eventos à medida que existe capacidade.

### Questão 14 — D

Para um menu comum em várias aplicações, as entradas que navegam para outras aplicações devem usar **URLs externas estáticas para os respetivos Screens**.

Um Screen de uma aplicação não deve ser diretamente referenciado como destino dentro do Block da Library. O Block partilhado mantém-se agnóstico e usa os URLs das aplicações.

### Questão 15 — B

Uma aplicação pode consumir um **Server Action** público de uma Library.

As Libraries fornecem código reutilizável que é incluído no container da aplicação consumidora. `Service Action` é o mecanismo de comunicação entre aplicações; `Server Action` é o mecanismo adequado para lógica reutilizável fornecida por uma Library.

### Questão 16 — A

Deve-se tornar a entidade Supplier privada e **encapsular os dados e as regras em Service Actions** usadas por Orders e Shipping.

As aplicações consumidoras não devem repetir Aggregates e cálculos sobre uma entidade partilhada. O proprietário dos dados deve controlar acesso, cálculos e evolução do modelo. Server Actions não são o contrato entre aplicações.

### Questão 17 — B

O **cenário 1 não garante independência de releases**, porque Claims e Billing estão na mesma aplicação apesar de representarem ownerships distintos. A correção é separá-los em duas aplicações, cada uma com o seu Business Owner e fronteira de responsabilidade.

Uma aplicação deve estar alinhada com um ownership e um ciclo de entrega coerentes. Ter mais de um sponsor não é, por si só, a causa de dependência técnica.

### Questão 18 — A

Quando a partilha de dados inclui também regras de acesso e requisitos de negócio, deve-se **encapsular essas regras em Service Actions**.

Referenciar entidades diretamente expõe o modelo e permite que cada consumidor implemente regras diferentes. Service Actions criam um contrato estável e mantêm as regras junto do proprietário dos dados.

### Questão 19 — B

Os **NFRs** descrevem aspetos técnicos e operacionais — desempenho, disponibilidade, segurança, escalabilidade e semelhantes. Os **Business Concepts** descrevem o domínio e o contexto de negócio.

Ambos influenciam a arquitetura, mas respondem a perguntas diferentes: “como o sistema deve comportar-se?” versus “que parte do negócio estamos a modelar?”.

### Questão 20 — B

A aplicação é publicada em **Development** e o respetivo container é depois promovido/deployed separadamente e em sequência para os outros stages.

Não se altera nem republica livremente o código do mesmo container em QA ou Production. A promoção controlada preserva rastreabilidade e garante que o mesmo artefacto atravessa o pipeline.

### Questão 21 — C

**A ordem de entrega dos Events não é garantida.**

Os Events são assíncronos e podem ser processados em paralelo, sofrer retries ou demoras diferentes. Um desenho correto não depende da ordem de chegada; os consumidores devem ser idempotentes e lidar com estados eventualmente fora de ordem.

### Questão 22 — D

**Retry da operação falhada não é um mecanismo de compensação.**

Compensar significa executar uma ação semântica que neutraliza uma alteração anterior: apagar/invalidar dados criados, efetuar um débito que anule um crédito, ou restaurar um estado consistente. Retry tenta concluir a operação original; não desfaz uma operação já concluída.

### Questão 23 — A

A afirmação falsa é a **A**.

Uma dependência de uma aplicação para uma Library é uma dependência de build/empacotamento, não uma integração fracamente acoplada entre aplicações. Integration Service Wrappers são úteis para reutilizar integrações, esconder detalhes de APIs externas e limitar o impacto de alterações de terceiros.

### Questão 24 — A

Um **Timer só pode ser criado numa aplicação**.

Libraries não possuem o ciclo de execução autónomo necessário para agendar um Timer. O horário pode ser administrado por stage e o Timer também pode ser acionado fora do horário normal, portanto as restantes afirmações absolutas estão erradas.

### Questão 25 — C

Ownership claro **ajuda a compreender a organização**: quem decide, quem mantém, quem financia e que equipa responde por cada domínio/aplicação.

Esse alinhamento melhora autonomia e decisões arquiteturais. Não elimina automaticamente complexidade nem aumenta necessariamente o fluxo de comunicação.

### Questão 26 — D

Se `Create Payment` falhar depois de `Subscribe Policy` ter sido concluído, a Saga deve **compensar a subscrição já efetuada**, desfazendo `Subscribe Policy`.

Não há pagamento concluído para apagar. Repetir toda a transação pode duplicar passos já executados, e ignorar a falha deixaria uma apólice ativa sem pagamento.

### Questão 27 — D

A etapa que **não** faz parte da abordagem recomendada é colocar lógica e dados específicos do negócio dentro do Block partilhado.

O Block deve ficar numa Library e ser agnóstico. Recebe os dados por Input Parameter. A aplicação proprietária obtém/calcula os dados através da sua lógica e, quando outra aplicação precisar deles, expõe-os por Service Action.

### Questão 28 — A

Deve criar-se uma aplicação **Location**, proprietária de Country e City, expor as entidades como públicas e permitir que os consumidores as referenciem diretamente.

Este é o padrão documentado para reference data estável, agnóstica ao negócio e sem regras complexas. Service Actions são preferíveis quando há controlo de acesso, regras complexas, modelo instável ou necessidade de encapsulamento.

Documentação oficial: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/

### Questão 29 — D

O principal propósito arquitetural das Libraries é ajudar a implementar **componentes reutilizáveis e agnósticos ao negócio**.

“Partilhar código” é uma descrição genérica, mas não é suficiente como critério: lógica específica de um domínio deve permanecer na aplicação que possui esse domínio. O código da Library é empacotado nos containers consumidores e cria uma dependência forte de build.

### Questão 30 — A

O primeiro passo para identificar bounded contexts é **entrevistar os stakeholders**.

Primeiro recolhem-se conceitos, linguagem, processos, ownership e problemas do negócio. Só depois se organizam os conceitos, analisam relações e definem fronteiras e responsabilidades.

## Análise de todas as opções

Nesta secção, **“certa”** identifica a resposta a selecionar. Nas perguntas formuladas pela negativa — “incorreta”, “NOT” ou “FALSE” — identifica a afirmação que satisfaz essa condição.

### Questão 5

- **A — Certa:** uma pasta `PolicyManagement` repete a fronteira já representada pela App; as pastas devem organizar conceitos internos.
- **B — Errada como resposta:** organizar por conceitos como Risk ou Policy reduz a carga cognitiva e melhora a manutenção.
- **C — Errada como resposta:** `RiskGetAssessment` combina o conceito de negócio e o propósito da Action, seguindo a recomendação.
- **D — Errada como resposta:** dar à aplicação o nome do bounded context que representa, como `PolicyManagement`, torna ownership e propósito mais claros.

### Questão 6

- **A — Errada:** uma integração direta não deve ser escolhida apenas porque o desempenho “não é uma preocupação”; continua a existir dependência da latência e disponibilidade externas.
- **B — Certa:** se a aplicação não tolera atrasos na atualização, precisa de consultar a fonte diretamente para obter os dados mais atuais.
- **C — Errada:** atualizações frequentes, isoladamente, não obrigam a integração direta; uma Cold Cache pode usar sincronizações regulares ou diferenciais.
- **D — Errada:** a ausência de sincronização diferencial torna a cache menos eficiente, mas não é o critério principal para escolher Direct Integration.

### Questão 7

- **A — Errada:** Themes reutilizáveis são consumidos através de Libraries, não como o elemento App-to-App testado.
- **B — Errada:** a lógica de outra aplicação é consumida através do contrato de uma Service Action, não pela referência direta ao respetivo Server Action.
- **C — Errada:** Client Actions pertencem à implementação da aplicação e não constituem um contrato entre aplicações.
- **D — Certa:** um Screen público pode ser referenciado por outra App para navegação cross-App.

### Questão 8

- **A — Errada:** criar e manter uma cache aumenta, em vez de eliminar, alguma complexidade de desenvolvimento e sincronização.
- **B — Errada:** uma Cold Cache não assegura dados em tempo real; aceita explicitamente alguma desatualização.
- **C — Errada:** abstrair várias implementações do mesmo serviço é responsabilidade de um wrapper/Library, não a finalidade principal de uma Cold Cache.
- **D — Certa:** a cópia local reduz o número de pedidos e ajuda a evitar sobrecarga das APIs externas.

### Questão 9

- **A — Errada:** descentralizar dados não cria automaticamente uma vista consistente; normalmente conduz a consistência eventual.
- **B — Certa:** produtores e consumidores ficam fracamente acoplados e podem evoluir e ser publicados em ciclos independentes.
- **C — Errada:** Events não transformam vários passos numa transação distribuída automática; é necessário desenhar consistência e compensações.
- **D — Errada:** a arquitetura orientada a eventos pretende reduzir dependências diretas, não criar acoplamento forte.

### Questão 10

- **A — Errada como resposta:** o Business Sponsor é um critério do Assemble porque sponsors com ritmos diferentes não devem ficar presos à mesma App.
- **B — Errada como resposta:** o Business Owner define responsabilidade, prioridades e ritmo de evolução do domínio.
- **C — Errada como resposta:** o número e a autonomia das equipas de produto influenciam a necessidade de ciclos de release independentes.
- **D — Certa:** expectativas dos utilizadores/look & feel não são o critério-chave desta decisão específica entre abordagem simples ou distribuída.

### Questão 11

- **A — Errada:** o valor secreto não deve ser configurado definitivamente na Library durante a primeira promoção para QA; deve ser gerido no contexto da aplicação/stage.
- **B — Errada:** alterar um Setting não implica necessariamente atualização síncrona e imediata em todas as instâncias e consumidores.
- **C — Certa:** o Setting é configurável na aplicação consumidora e pode ter valores diferentes em Development, QA e Production.
- **D — Errada:** não é necessário alterar o Setting em ODC Studio e publicar uma nova versão da aplicação para cada stage.

### Questão 12

- **A — Certa:** Billing pode referenciar o Role público e usar `CheckAdministrator` para verificar autorização.
- **B — Errada como resposta:** Service Actions são apropriadas para encapsular Grant/Revoke quando há regras, mas não são obrigatórias para o `Check<Role>` direto descrito.
- **C — Errada:** criar outro Role `Administrator` em Billing produz duas identidades de autorização distintas e exige atribuições duplicadas.
- **D — Errada:** um Role é um conceito de segurança de uma aplicação e não deve ser movido para uma Library partilhada.

### Questão 13

- **A — Certa:** os Events aguardam na runtime queue enquanto não existe capacidade de execução, até aos limites suportados pela fila.
- **B — Errada:** a aplicação inteira não fica pausada à espera de capacidade; apenas o trabalho assíncrono aguarda na fila.
- **C — Errada:** a plataforma não reduz magicamente o tempo dos Events já em execução para acomodar os novos.
- **D — Errada:** Events não são descartados imediatamente só porque o limite de paralelismo foi atingido.

### Questão 14

- **A — Errada:** guardar URLs numa entidade e criar um Service Action por aplicação adicionaria persistência e chamadas desnecessárias para um menu estático.
- **B — Errada:** o Block da Library não pode apontar diretamente para Screens pertencentes a várias aplicações.
- **C — Errada:** recolher URLs de todas as aplicações através de Service Actions cria forte coordenação e complexidade para informação estática.
- **D — Certa:** ligações externas estáticas podem apontar diretamente para os URLs dos Screens das respetivas aplicações.

### Questão 15

- **A — Errada:** Service Actions são contratos runtime entre aplicações; não são o elemento normal de lógica fornecido por uma Library.
- **B — Certa:** uma Library pode expor um Server Action reutilizável, empacotado no container da aplicação consumidora.
- **C — Errada:** uma Library não é o local adequado para uma entidade de negócio persistente pertencente a uma aplicação.
- **D — Errada:** Roles pertencem a aplicações e ao seu modelo de segurança, não a Libraries reutilizáveis.

### Questão 16

- **A — Certa:** a aplicação proprietária mantém Supplier privado e expõe dados e cálculos através de Service Actions.
- **B — Errada:** dividir a entidade por tipo de fornecedor não resolve ownership, duplicação de cálculos nem acoplamento dos consumidores.
- **C — Errada:** Server Actions não são o contrato de integração entre aplicações; para isso usam-se Service Actions.
- **D — Errada:** a solução atual deixa consumidores dependentes da entidade e permite duplicação/divergência das regras de cálculo.

### Questão 17

- **A — Errada:** os três cenários não garantem todos independência; o cenário 1 mistura dois ownerships/domínios na mesma aplicação.
- **B — Certa:** Claims e Billing devem ser separados quando possuem Business Owners e ciclos de evolução diferentes.
- **C — Errada:** ter vários sponsors não é, por si só, o problema que impede independência de releases no cenário 2.
- **D — Errada:** uma aplicação ter um Business Owner e um Business Sponsor não compromete autonomia; esses papéis são complementares.

### Questão 18

- **A — Certa:** Service Actions mantêm as regras de acesso e de negócio junto do proprietário dos dados e oferecem um contrato estável.
- **B — Errada:** Static Entities servem conjuntos estáticos/enumerações e não substituem dados de negócio sujeitos a regras próprias.
- **C — Errada:** Server Actions não devem ser usados como contrato direto entre aplicações.
- **D — Errada:** expor entidades diretamente revela o modelo físico e permite que consumidores contornem ou dupliquem regras de negócio.

### Questão 19

- **A — Errada:** NFRs não se limitam a integrações externas; incluem segurança, desempenho, disponibilidade, escalabilidade e operação.
- **B — Certa:** NFRs descrevem qualidades técnicas e operacionais, enquanto Business Concepts descrevem o domínio de negócio.
- **C — Errada:** owners, sponsors e equipas dizem respeito a ownership/organização, não à definição principal de NFR.
- **D — Errada:** ambos podem vir de stakeholders, mas não são equivalentes nem descrevem apenas requisitos funcionais.

### Questão 20

- **A — Errada:** o código/container não pode ser alterado e publicado independentemente em qualquer stage sem respeitar o pipeline.
- **B — Certa:** a aplicação é publicada em Development e o mesmo container é promovido separadamente e sequencialmente pelos stages.
- **C — Errada:** a publicação em Development não provoca deployment automático em todos os stages.
- **D — Errada:** a promoção também não é automaticamente executada em todos os stages sem uma ação/controlos de deployment.

### Questão 21

- **A — Errada:** paralelismo, retries e tempos de processamento diferentes impedem garantir a ordem de trigger.
- **B — Errada:** não existe uma prioridade arbitrária definida pelo developer que determine a ordem global dos Events.
- **C — Certa:** a ordem de entrega não é garantida, pelo que os consumidores devem ser idempotentes e tolerar mensagens fora de ordem.
- **D — Errada:** também não existe uma garantia FIFO estrita dentro da fila quando há processamento paralelo e retries.

### Questão 22

- **A — Errada como resposta:** apagar ou invalidar os dados criados pode compensar semanticamente um passo anterior.
- **B — Errada como resposta:** uma operação inversa, como débito para anular um crédito, é um exemplo clássico de compensação.
- **C — Errada como resposta:** repor a aplicação num estado de negócio consistente é precisamente o objetivo de compensar.
- **D — Certa:** retry tenta concluir a operação original; não desfaz uma alteração anterior e, portanto, não é compensação.

### Questão 23

- **A — Certa:** é a afirmação falsa; uma dependência de Library é uma dependência de build/empacotamento, não uma integração runtime fracamente acoplada entre aplicações.
- **B — Errada como resposta:** wrappers reutilizáveis numa Library escondem a implementação da API e podem ser bons candidatos a componentes Forge.
- **C — Errada como resposta:** um wrapper permite reutilizar a integração externa em várias aplicações.
- **D — Errada como resposta:** centralizar a adaptação da API reduz o impacto das mudanças de um fornecedor externo.

### Questão 24

- **A — Certa:** um Timer precisa do runtime e do ciclo de vida de uma aplicação e, por isso, só é criado numa aplicação.
- **B — Errada:** o horário não é definido exclusivamente no ODC Portal; existe configuração associada ao Timer/aplicação.
- **C — Errada:** stages diferentes podem ter necessidades e horários diferentes.
- **D — Errada:** um Timer também pode ser executado manualmente/por wake-up; não está limitado de forma absoluta ao horário periódico.

### Questão 25

- **A — Errada:** ownership claro ajuda a gerir complexidade, mas não garante que a complexidade técnica diminua.
- **B — Errada:** clarificar ownership tende a tornar a comunicação mais objetiva, não simplesmente a aumentar o seu volume.
- **C — Certa:** torna visível quem decide, mantém, prioriza e responde por cada domínio e aplicação.
- **D — Errada:** reduzir carga cognitiva pode ser um efeito indireto, mas a razão central apresentada é compreender a estrutura e responsabilidades da organização.

### Questão 26

- **A — Errada:** se `Create Payment` falhou, normalmente não existem registos de pagamento concluídos para apagar; além disso, isso não desfaz a subscrição já criada.
- **B — Errada:** repetir a transação completa pode duplicar `Subscribe Policy` ou outros passos já concluídos.
- **C — Errada:** continuar após a falha deixaria uma apólice subscrita sem o pagamento correspondente.
- **D — Certa:** deve executar-se a compensação de `Subscribe Policy`, o último passo de negócio concluído antes da falha do pagamento.

### Questão 27

- **A — Errada como resposta:** colocar o Block numa nova Library é adequado para partilhar a mesma UI entre Orders e Shipping.
- **B — Errada como resposta:** um Input Parameter permite que o Block receba dados e permaneça agnóstico ao negócio.
- **C — Errada como resposta:** se Shipping necessitar de dados/cálculos pertencentes a Orders, Orders deve expô-los por Service Action.
- **D — Certa:** colocar lógica e dados específicos do negócio dentro do Block partilhado viola a separação de responsabilidades e reduz a reutilização.

### Questão 28

- **A — Certa:** Location torna-se proprietária de Country e City e expõe public Entities, o padrão para reference data estável e sem regras complexas.
- **B — Errada:** manter as Entities privadas e criar Service Actions é sobre-encapsulamento neste cenário; seria preferível se existissem regras, acesso controlado ou modelo instável.
- **C — Errada:** manter os dados na Directory deixa um domínio transversal preso a uma aplicação consumidora e não dá ownership independente a Location.
- **D — Errada:** expor diretamente a partir de Directory não resolve o ownership transversal, apesar de o acesso direto ser adequado depois de mover os dados para Location.

### Questão 29

- **A — Errada:** o forte acoplamento de build é uma consequência das Libraries, não o benefício arquitetural principal.
- **B — Errada:** o empacotamento no container explica como a Library funciona, mas não por que deve ser usada.
- **C — Errada:** “partilhar código” é demasiado genérico e pode incentivar a colocar lógica de negócio no sítio errado.
- **D — Certa:** Libraries destinam-se principalmente a componentes reutilizáveis e agnósticos ao negócio.

### Questão 30

- **A — Certa:** entrevistar stakeholders permite descobrir linguagem, conceitos, processos, dores e ownership antes de desenhar fronteiras.
- **B — Errada:** só é possível mapear relações depois de conhecer os conceitos relevantes.
- **C — Errada:** organizar os conceitos é uma etapa posterior à recolha e compreensão inicial do domínio.
- **D — Errada:** fronteiras e responsabilidades são definidas depois de compreender, organizar e relacionar os conceitos do negócio.

## Regras para memorizar

### Application vs. Library

- **Application:** possui dados de negócio, Screens, Roles, Timers e lógica específica do domínio.
- **Library:** contém UI/Blocks, Themes, utilitários, integrações e lógica reutilizável que não pertence a um domínio específico.
- A Library é empacotada no container consumidor; por isso cria acoplamento de build.
- Entre aplicações, a API interna recomendada é uma **Service Action**.
- De uma Library, reutiliza-se normalmente um **Server Action**.

### Dados entre aplicações

- O owner dos dados deve controlar as regras de leitura e escrita.
- Se existem regras de negócio, usar Service Actions e manter a entidade privada.
- Evitar que consumidores repitam Aggregates e cálculos sobre entidades de outra aplicação.
- Dados de referência transversais merecem ownership próprio quando a independência das aplicações é importante.

### Eventos e Sagas

- Events promovem baixo acoplamento e independência de releases.
- A ordem de entrega não é garantida.
- Consumidores devem ser idempotentes.
- Retry tenta novamente; compensação desfaz semanticamente um passo anterior.
- Uma Saga mantém consistência eventual, não uma transação ACID distribuída.

### Integrações

- **Direct Integration:** dados atuais, mas maior dependência de latência e disponibilidade externas.
- **Cold Cache:** menos chamadas e maior resiliência, aceitando dados potencialmente desatualizados.
- **Integration Service Wrapper:** esconde a API externa, promove reutilização e limita o impacto de alterações do fornecedor.

## Plano curto de estudo

1. Tapa a coluna “Resposta” do gabarito e responde às 26 questões pelas fotografias.
2. Para cada erro, explica em voz alta qual é o **owner** dos dados/lógica e que tipo de dependência existe.
3. Revê especialmente os pares que o exame tenta confundir:
   - Service Action vs. Server Action;
   - Application vs. Library;
   - Direct Integration vs. Cold Cache;
   - Retry vs. Compensation;
   - integração síncrona vs. Events.
4. No dia seguinte, repete apenas as questões erradas sem consultar este guia.


## Fontes oficiais da auditoria

- Reutilização entre Apps: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/
- Service Actions: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/
- Libraries: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/
- Events: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/
- Architecture Design Process: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/


## Matriz de validação por questão

| Questão | Fonte oficial principal |
|---:|---|
| 5 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/ |
| 6 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/integration_patterns/ |
| 7 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/ |
| 8 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/integration_patterns/ |
| 9 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/ |
| 10 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/ |
| 11 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/ |
| 12 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/ |
| 13 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/ |
| 14 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/ |
| 15 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/ |
| 16 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/ |
| 17 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/ |
| 18 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/ |
| 19 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/ |
| 20 | https://success.outsystems.com/documentation/outsystems_developer_cloud/deploying_assets/ |
| 21 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/ |
| 22 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/data_consistency/ |
| 23 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/integration_patterns/ |
| 24 | https://www.outsystems.com/training/classroom-training/odc-architecture-boot-camp/ |
| 25 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/ |
| 26 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/data_consistency/ |
| 27 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/ |
| 28 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/ |
| 29 | https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/ |
| 30 | https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/ |
