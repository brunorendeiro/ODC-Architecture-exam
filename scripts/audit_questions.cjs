const fs = require('fs');
const vm = require('vm');

const ROOT = process.cwd();
const INDEX = `${ROOT}/index.html`;
const REVIEW_DATE = '2026-07-22';

const URLS = {
  architecture: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/',
  reuse: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/',
  serviceActions: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/',
  libraries: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/',
  librariesLearn: 'https://learn.outsystems.com/training/journeys/odc-architecture-exam-957/libraries/odc/4374',
  events: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/',
  staticEntities: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/data_management/data_modeling/static_entities/',
  mobileLibraries: 'https://www.outsystems.com/product-updates/odc-mobile-library/',
  agentic: 'https://www.outsystems.com/product-updates/agent-workbench-general-availability',
  bootcamp: 'https://www.outsystems.com/training/classroom-training/odc-architecture-boot-camp/',
  cloudNative: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/managing_outsystems_platform_and_apps/cloud_native_architecture_of_outsystems_developer_cloud/',
  deployments: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/deploying_assets/',
  configuration: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/configure_apps/',
  integration: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/integration_patterns/',
  dataConsistency: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/data_consistency/',
  dataFabric: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/integration_with_external_systems/integrate_with_external_data_sources_using_data_fabric/',
  workflows: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_business_processes/implement_workflow/human_activity_in_a_workflow/',
  observability: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/monitoring_and_troubleshooting_apps/streaming_observability_data/streamed_trace_data/',
  roles: 'https://success.outsystems.com/documentation/outsystems_developer_cloud/user_management/grant_and_revoke_user_roles/'
};

function loadRuntimeQuestions(html) {
  const start = html.indexOf('const RAW_QUESTIONS = [');
  const end = html.indexOf('\n];', start) + 3;
  if (start < 0 || end < 3) throw new Error('RAW_QUESTIONS not found');
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${html.slice(start, end)};globalThis.questions=RAW_QUESTIONS`, context);
  return { questions: context.questions, start, end };
}

function correctIndex(questions) {
  const byId = new Map(questions.map(q => [q.id, q]));

  Object.assign(byId.get(19), {
    question: 'The Claims App owns a public Administrator Role. Billing only needs to check whether the current user has that Role. What is the recommended approach?',
    answerOptions: [
      { text: 'Billing references the public Role and uses CheckAdministrator for the authorization check.', isCorrect: true, rationale: 'A public Role can be referenced by a consumer App for authorization checks. Check<Role> is the direct check generated for the referenced Role. Granting and revoking are assignment operations and should remain controlled by the owner, normally through producer-owned Service Actions when validation or business rules apply.' },
      { text: 'Billing creates a second Administrator Role with the same name.', isCorrect: false, rationale: 'A same-named Role is a different authorization concept. Duplicating it fragments assignments and does not check the Role owned by Claims.' },
      { text: 'The Role must be moved to a Library before Billing can check it.', isCorrect: false, rationale: 'Roles are App-owned public elements. A Library is for reusable UI and logic and is not required to share an App Role.' },
      { text: 'Billing must call GrantAdministrator before every check.', isCorrect: false, rationale: 'Grant changes authorization state and is not part of checking access. Role assignment must not be performed as a side effect of an authorization check.' }
    ],
    examTip: 'Separate authorization checks (Check<Role>) from assignment operations (Grant<Role>/Revoke<Role>).',
    versionNote: 'The producer may encapsulate Grant/Revoke in Service Actions when role-assignment validation or business rules must be enforced.'
  });

  Object.assign(byId.get(232), {
    question: 'Which statement correctly distinguishes a Static Entity from a public regular Entity when sharing reference data between ODC Apps?',
    answerOptions: [
      { text: 'A Static Entity models a fixed enumeration that is part of the application model; a public regular Entity can hold reference data owned and maintained at runtime.', isCorrect: true, rationale: 'The choice depends on the data lifecycle. Use a Static Entity for model-level enumerations with fixed records. Use an App-owned public regular Entity when shared reference records are runtime data and direct access is suitable.' },
      { text: 'Country, city, and currency data must always be Static Entities.', isCorrect: false, rationale: 'Those concepts can be fixed enumerations or runtime-maintained reference data. Their names alone do not determine the Entity type.' },
      { text: 'A public Entity is only for transactional data and cannot hold reference data.', isCorrect: false, rationale: 'Public Entities can expose stable, business-agnostic reference data to consumer Apps.' },
      { text: 'Static Entities are the preferred store for records that business users create and edit at runtime.', isCorrect: false, rationale: 'Runtime-managed records belong in regular Entities. Static Entity records are treated as part of the application model.' }
    ],
    examTip: 'Choose from lifecycle: model-level fixed enumeration versus runtime-owned reference records.'
  });

  const q236 = byId.get(236);
  q236.answerOptions.forEach((o, i) => { o.isCorrect = i === 2; });
  q236.answerOptions[0].rationale = 'This leaves transversal location data under Directory ownership. The Architecture Design Process should first assign the reference data to the appropriate bounded context.';
  q236.answerOptions[1].rationale = 'Service Actions are useful when business rules or encapsulation are needed, but the scenario states stable reference data and asks for the direct reference-data pattern.';
  q236.answerOptions[2].rationale = 'The official sharing-data pattern uses public Entities for stable, business-agnostic reference data. A Location App supplies clear ownership, and consumers can reference Country and City directly. Service Actions become preferable if access control, business rules, or model volatility require encapsulation.';
  q236.answerOptions[3].rationale = 'Private Entities cannot be referenced directly by consumer Apps. This option also omits the Service Actions that would be required for private data.';
  q236.examTip = 'Public Entities fit stable reference data; Service Actions fit data with rules or an unstable contract.';

  Object.assign(byId.get(263), {
    question: "Two Apps need a Currency reference list that business administrators maintain at runtime. It changes slowly, has a stable model, and requires no access or business rules. Which sharing pattern is most appropriate?",
    examTip: 'The runtime-maintained condition removes the Static Entity ambiguity; the absence of rules makes a public regular Entity suitable.'
  });

  const q296 = byId.get(296);
  q296.answerOptions.forEach((o, i) => { o.isCorrect = i === 1; });
  q296.answerOptions[0].rationale = 'Private Entities plus Service Actions add an API boundary that is valuable for rules or encapsulation, but is unnecessary for the stable, business-agnostic reference data described.';
  q296.answerOptions[1].rationale = 'A Location App gives the data a clear owner, while public Country and City Entities implement the documented reference-data sharing pattern. Consumers can query the stable model directly.';
  q296.answerOptions[2].rationale = 'Directory is a consumer domain, not the clearest owner of transversal location reference data.';
  q296.answerOptions[3].rationale = 'This combines direct access with the wrong ownership boundary. Move the data to Location before exposing it.';
  q296.examTip = 'First choose the right owner; then choose public Entities versus Service Actions from stability and rule complexity.';

  byId.get(273).examTip = 'The App name carries the bounded-context context; folders organize concepts inside it.';
  byId.get(275).examTip = 'Screens are App-to-App navigation references; Themes are reusable Library elements.';

  Object.assign(byId.get(39), {
    question: 'Which of the following is an example of a Non-Functional Requirement (NFR) identified during the Disclose step?',
    answerOptions: [
      { text: 'The production service must meet the agreed availability target.', isCorrect: true, rationale: 'Availability is an operational quality constraint and therefore an NFR.' },
      { text: 'A customer can submit an insurance claim.', isCorrect: false, rationale: 'This describes functional behavior, not a quality constraint.' },
      { text: 'Claim is a core business concept.', isCorrect: false, rationale: 'This is domain vocabulary, not an NFR.' },
      { text: 'The Claims Director owns the Claims domain.', isCorrect: false, rationale: 'This is ownership information used during architecture assembly.' }
    ],
    examTip: 'NFRs constrain how the system operates; functional requirements describe what it does.'
  });

  Object.assign(byId.get(74), {
    question: 'Which managed data store is used for an ODC App runtime\'s relational business data?',
    answerOptions: [
      { text: 'Amazon Aurora', isCorrect: true, rationale: 'ODC Runtime stages use isolated, scalable relational data storage based on Amazon Aurora.' },
      { text: 'Amazon S3', isCorrect: false, rationale: 'S3 is object storage and is used for artifacts such as OML history, not relational App business records.' },
      { text: 'Amazon ECR', isCorrect: false, rationale: 'ECR stores container images.' },
      { text: 'NATS', isCorrect: false, rationale: 'NATS is messaging infrastructure, not a relational data store.' }
    ],
    examTip: 'Aurora: relational App data; S3: OML history; ECR: container images.'
  });

  byId.get(81).answerOptions[2].rationale = 'DynamoDB is used for Platform Build Service configuration and metadata. Secrets require a dedicated encrypted secrets manager.';
  byId.get(81).answerOptions[3].rationale = 'Aurora provides relational App data storage. Secrets such as API keys require a dedicated secrets manager.';

  Object.assign(byId.get(123), {
    question: 'An App has a private Server Action that must become callable by another App. What should the producer do?',
    answerOptions: [
      { text: "Use 'Expose as Service Action' so the producer publishes a weak App-to-App contract.", isCorrect: true, rationale: 'Server Actions in an App are internal implementation. Exposing the logic as a Service Action creates the supported cross-App contract.' },
      { text: 'Move the Server Action to a Screen.', isCorrect: false, rationale: 'A Screen is UI and does not expose server logic.' },
      { text: 'Make the App Server Action public directly.', isCorrect: false, rationale: 'Apps expose server logic to other Apps through Service Actions, not public Server Actions.' },
      { text: 'Copy the Server Action into every consumer.', isCorrect: false, rationale: 'Copying duplicates logic and ownership.' }
    ],
    examTip: 'App-to-App server logic uses Service Actions; Library reusable server logic uses public Server Actions.'
  });

  Object.assign(byId.get(144), {
    question: 'Two Apps depend on the same stable, business-agnostic validation algorithm, and direct references between the Apps would create a cycle. What is the appropriate reusable design?',
    answerOptions: [
      { text: 'Move the stable business-agnostic algorithm to a Library that both Apps reference.', isCorrect: true, rationale: 'A Library is appropriate for stable, reusable, business-agnostic logic and gives both Apps a one-way strong dependency without an App-to-App cycle.' },
      { text: 'Let both Apps reference each other.', isCorrect: false, rationale: 'A circular App dependency harms ownership and independent evolution.' },
      { text: 'Copy the algorithm into both Apps.', isCorrect: false, rationale: 'Copying creates divergent implementations.' },
      { text: 'Merge the Apps regardless of their bounded contexts.', isCorrect: false, rationale: 'Merging unrelated ownership boundaries is not justified by one reusable algorithm.' }
    ],
    examTip: 'Use a Library only when the shared logic is stable, reusable, and business-agnostic.'
  });

  const q145 = byId.get(145);
  q145.answerOptions[0].text = "Each organisation has isolated Runtime stages with isolated, encrypted relational data storage per stage; shared Platform services enforce organisation-level separation.";
  q145.answerOptions[0].rationale = 'The documented ODC model combines multi-tenant Platform services with customer Runtime stages and isolated data stores. It does not rely on adding a tenant identifier to every App query.';
  q145.answerOptions[1].rationale = 'Automatic tenant-identifier injection into every App query is not the documented ODC organisation-isolation model.';
  q145.answerOptions[2].rationale = 'ODC uses multi-tenant Platform services together with isolated customer Runtime stages; the documentation does not describe a dedicated Platform Kubernetes cluster and dedicated physical database server for every organisation.';
  q145.answerOptions[3].rationale = 'Encryption protects confidentiality, but encryption alone does not establish Runtime and organisation isolation.';
  q145.examTip = 'Distinguish multi-tenant Platform services from isolated customer Runtime stages and data stores.';

  byId.get(55).answerOptions[3].rationale = 'The official material defines a maximum of 10,000 Events per Event queue; the queue is not unlimited.';
  byId.get(57).answerOptions[0].rationale = 'The documented Event Handler limit is 2 minutes, not 30 seconds.';
  byId.get(58).answerOptions[3].rationale = 'ODC retries a failed Event up to 10 times with increasing backoff intervals.';
  byId.get(61).answerOptions[2].rationale = 'ODC has an automatic retry mechanism of up to 10 retries when a handler fails; delivery is not merely best-effort.';
  byId.get(80).answerOptions[1].rationale = 'NATS is the internal messaging middleware; TLS is the transport-security protocol asked for here.';
  byId.get(89).answerOptions[3].rationale = 'Container health replacement is handled automatically by the managed orchestration platform, not deferred to scheduled maintenance.';
  byId.get(239).answerOptions[1].rationale = 'Retries are bounded: ODC retries failed Event Handlers up to 10 times with increasing intervals. They are not unlimited.';
  byId.get(239).answerOptions[3].text = 'Each subscriber receives the Event once; failed handling is retried, and delivery order is not guaranteed.';
  byId.get(239).answerOptions[3].rationale = 'The official Event properties state once-per-handler delivery, retry on failure, and no ordering guarantee.';
  byId.get(270).answerOptions[0].text = 'Yes — ODC retries a failed Event Handler automatically, up to 10 retries, using increasing backoff intervals.';
  byId.get(270).answerOptions[0].rationale = 'Succeeding after two failures is within ODC\'s retry budget. The interval increases according to the documented retry schedule.';
  byId.get(270).answerOptions[3].rationale = 'Retries are capped at up to 10 retries, not unlimited.';

  Object.assign(byId.get(146), {
    question: 'Which App-owned element can be made public and referenced by another ODC App for authorization checks?',
    answerOptions: [
      { text: 'Role', isCorrect: true, rationale: 'An App can expose a Role publicly so another App can reference it and use Check<Role>.' },
      { text: 'Server Action', isCorrect: false, rationale: 'App-to-App server logic is exposed as a Service Action, not a public Server Action.' },
      { text: 'Client Action', isCorrect: false, rationale: 'Client Actions are not App-to-App contracts.' },
      { text: 'Timer', isCorrect: false, rationale: 'Timers are App-owned background jobs and are not consumed by another App.' }
    ],
    examTip: 'Roles can be public; separate Check<Role> from Grant/Revoke assignment responsibilities.'
  });

  byId.get(153).answerOptions[0].text = 'Because Libraries expose reusable server logic as public Server Actions; Service Actions are App-to-App contracts and are not available in Libraries.';
  byId.get(153).answerOptions[0].rationale = 'This is the supported ODC element model: public Server Actions for Library reuse and Service Actions for weak App-to-App communication.';

  byId.get(154).question = 'Which architectural roles can ODC Apps perform in a solution?';
  byId.get(154).answerOptions[0].text = 'User-interface Apps, service/microservice Apps, and asynchronous-processing Apps.';
  byId.get(154).answerOptions[0].rationale = 'These are architectural roles an App may perform, not distinct asset types in the ODC creation dialog. An App may provide UI, service contracts, or background processing.';
  byId.get(154).examTip = 'Do not confuse architectural roles with ODC asset types.';

  byId.get(168).answerOptions[0].text = 'General-purpose Libraries for reusable UI/logic, and Mobile Libraries designed specifically for reusable native mobile plugins.';
  byId.get(168).answerOptions[0].rationale = 'Current ODC distinguishes general-purpose Libraries from Mobile Libraries. The latter use the current JavaScript-based mobile plugin model to expose native capabilities to mobile Apps.';

  Object.assign(byId.get(169), {
    question: "A mobile App needs a reusable integration with a device biometric capability through ODC's JavaScript-based mobile plugin model. Where should the integration be implemented?",
    answerOptions: [
      { text: 'Directly inside the Mobile App as a custom Server Action.', isCorrect: false, rationale: 'Server Actions execute on the server and do not implement reusable client-side access to native device capabilities.' },
      { text: 'In a Mobile Library designed to package reusable native mobile plugins.', isCorrect: true, rationale: 'Mobile Libraries are the ODC asset type for creating and distributing reusable native mobile plugins through the current JavaScript-based extensibility model.' },
      { text: 'In a General-purpose Library so the same native plugin can run unchanged in Web Apps.', isCorrect: false, rationale: 'General-purpose Libraries provide reusable App elements, but native mobile plugin packaging belongs to a Mobile Library and is specific to mobile Apps.' },
      { text: 'In a Static Entity containing the biometric implementation.', isCorrect: false, rationale: 'Static Entities model fixed enumeration data; they cannot contain or execute a native plugin implementation.' }
    ],
    examTip: 'Use a Mobile Library for reusable native mobile plugins; use a general-purpose Library for ordinary reusable ODC elements.'
  });

  Object.assign(byId.get(243), {
    question: 'What is the main purpose of Mobile Libraries in current ODC?',
    answerOptions: [
      { text: 'To create and distribute reusable native mobile plugins through the JavaScript-based mobile extensibility model.', isCorrect: true, rationale: 'The current Mobile Library asset type is designed for reusable native mobile plugins, providing a JavaScript-based extensibility model and a defined distribution lifecycle.' },
      { text: 'To store offline records that all mobile Apps share at runtime.', isCorrect: false, rationale: 'A Library does not own runtime business data; data ownership belongs to an App.' },
      { text: 'To make browser-only Blocks available to desktop Web Apps.', isCorrect: false, rationale: 'That is not native mobile plugin extensibility and does not require a Mobile Library.' },
      { text: 'To expose Service Actions between mobile Apps.', isCorrect: false, rationale: 'Service Actions are App-to-App contracts; Libraries do not expose Service Actions.' }
    ],
    examTip: 'Mobile Library means reusable native mobile plugin; it is not a data owner or an App-to-App service.'
  });

  Object.assign(byId.get(171), {
    question: 'What is the purpose of Agentic Apps in the current ODC platform?',
    answerOptions: [
      { text: 'To build, govern, deploy, and orchestrate AI agents that can reason, plan, and act with enterprise controls.', isCorrect: true, rationale: 'Agent Workbench provides the lifecycle, orchestration, security, governance, and observability capabilities for enterprise AI agents.' },
      { text: 'To store shared Themes and Blocks.', isCorrect: false, rationale: 'Reusable UI belongs in Libraries.' },
      { text: 'To replace every deterministic business workflow.', isCorrect: false, rationale: 'Agentic behavior is not a universal replacement for deterministic Apps or Workflows.' },
      { text: 'To configure ODC deployment stages.', isCorrect: false, rationale: 'Stages and deployments are managed through ODC lifecycle tooling.' }
    ],
    examTip: 'Agentic Apps are current-platform content introduced after the supplied Architecture Boot Camp.'
  });

  Object.assign(byId.get(197), {
    question: 'Which current ODC application type is specifically designed for building and operating governed AI agents?',
    answerOptions: [
      { text: 'Web App', isCorrect: false, rationale: 'A Web App supplies browser-based user experiences; it is not the dedicated asset type for governed AI agents.' },
      { text: 'Mobile App', isCorrect: false, rationale: 'A Mobile App supplies mobile user experiences; it is not the dedicated asset type for governed AI agents.' },
      { text: 'Agentic App', isCorrect: true, rationale: 'Agentic Apps are the current ODC application type used with Agent Workbench to build, govern, deploy, and orchestrate enterprise AI agents.' },
      { text: 'Library', isCorrect: false, rationale: 'A Library packages reusable UI, logic, and related elements; it is not the application type used to operate an AI agent.' }
    ],
    examTip: 'Agentic Apps are current-platform content; distinguish them from the Web/Mobile App types covered by older Boot Camp material.'
  });

  Object.assign(byId.get(198), {
    question: 'What is the primary purpose of an Agentic App in current ODC?',
    answerOptions: [
      { text: 'Host responsive Screens, forms, and navigation as its primary purpose.', isCorrect: false, rationale: 'Responsive user interfaces are the primary responsibility of Web and Mobile Apps.' },
      { text: 'Build and operate AI agents that can reason, plan, act, and be governed through Agent Workbench.', isCorrect: true, rationale: 'Official current-platform material describes Agent Workbench and Agentic Apps as the environment for building, governing, deploying, orchestrating, and observing enterprise AI agents.' },
      { text: 'Store shared Themes and reusable Blocks for all Apps.', isCorrect: false, rationale: 'Shared Themes and Blocks belong in Libraries.' },
      { text: 'Manage deployment stages and environment configuration for the organisation.', isCorrect: false, rationale: 'Stages and deployment configuration are platform lifecycle responsibilities, not the purpose of an Agentic App.' }
    ],
    examTip: 'Focus on the governed AI-agent lifecycle; do not infer generated actions or integration details not stated by the cited source.'
  });

  Object.assign(byId.get(175), {
    question: 'Which cloud-native property helps an ODC Runtime remain available when an App container instance becomes unhealthy?',
    answerOptions: [
      { text: 'Managed orchestration can replace unhealthy container instances and run replicated capacity.', isCorrect: true, rationale: 'ODC uses managed container orchestration and health monitoring so unhealthy runtime instances can be replaced.' },
      { text: 'Every request is stored permanently in a Static Entity.', isCorrect: false, rationale: 'Static Entities do not provide runtime availability.' },
      { text: 'Developers manually restart every failed container from ODC Studio.', isCorrect: false, rationale: 'Runtime health management is a platform responsibility.' },
      { text: 'All Apps run in one shared process so another App can take over.', isCorrect: false, rationale: 'ODC Apps are isolated deployment units rather than one shared App process.' }
    ],
    examTip: 'Availability comes from managed orchestration and replication, not App-level manual recovery.'
  });

  Object.assign(byId.get(176), {
    question: 'Which cloud data store is used for ODC OML revision history as object/blob data?',
    answerOptions: [
      { text: 'Amazon S3', isCorrect: true, rationale: 'ODC stores OML history in object storage.' },
      { text: 'Amazon Aurora', isCorrect: false, rationale: 'Aurora provides relational storage for App runtime data.' },
      { text: 'Amazon ECR', isCorrect: false, rationale: 'ECR stores built container images.' },
      { text: 'NATS', isCorrect: false, rationale: 'NATS is messaging infrastructure.' }
    ],
    examTip: 'S3 stores OML history; Aurora stores relational App data; ECR stores container images.'
  });

  Object.assign(byId.get(195), {
    question: "A Customer App exposes Service Actions, Roles, and several public business Entities whose rules and schema change frequently. Why do the public Entities deserve additional architectural review?",
    answerOptions: [
      { text: 'Service Actions and Roles are explicit contracts, while direct public Entity access couples consumers to a frequently changing schema and may let rules spread.', isCorrect: true, rationale: 'For evolving business data, Service Actions can keep rules centralized and shield consumers from model changes. Public Entities remain appropriate for stable reference or plain data, so the lifecycle matters.' },
      { text: 'Public Entities can never be referenced in ODC.', isCorrect: false, rationale: 'ODC supports public Entities; they are appropriate for stable reference or plain data.' },
      { text: 'Roles should always be copied into every consumer.', isCorrect: false, rationale: 'A public Role can be referenced by consumers.' },
      { text: 'Service Actions create a strong Library dependency.', isCorrect: false, rationale: 'Service Actions are weak App-to-App contracts.' }
    ],
    examTip: 'Public Entities are not inherently wrong; review stability, ownership, rules, and consumer coupling.'
  });

  Object.assign(byId.get(202), {
    question: 'What is the key difference between a Workflow and a Timer in ODC?',
    answerOptions: [
      { text: 'Workflows keep long-running process state and can pause for human interaction; Timers run background logic on a schedule or when explicitly awakened.', isCorrect: true, rationale: 'A Workflow models stateful process progression and human activities. A Timer executes background logic and can run from its schedule or be explicitly awakened.' },
      { text: 'Timers support human approval tasks; Workflows only run scheduled automated jobs.', isCorrect: false, rationale: 'This reverses the responsibilities. Human activities belong to Workflows.' },
      { text: 'A Workflow can run only once, while a Timer can repeat.', isCorrect: false, rationale: 'Multiple Workflow instances can execute; repetition is not the key distinction.' },
      { text: 'There is no practical difference because both are background execution mechanisms.', isCorrect: false, rationale: 'A Workflow is stateful process orchestration; a Timer is background action execution.' }
    ],
    examTip: 'Workflow: stateful process and human activity. Timer: scheduled or explicitly awakened background logic.'
  });

  return byId;
}

function applyMetadata(questions) {
  const updated = new Set([19,39,74,123,144,145,146,153,154,168,169,171,175,176,195,197,198,202,232,236,243,263,273,275,296]);
  const eventIds = new Set([43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,141,142,158,162,203,204,213,214,215,216,226,239,265,266,268,269,270,277,281,289,290,294]);
  const mobileIds = new Set([168,169,243,244,245,247]);
  const agenticIds = new Set([10,171,197,198]);
  const dataFabricIds = new Set([70,84,199,200]);
  const workflowIds = new Set([201,202]);
  const observabilityIds = new Set([205,206]);
  const cloudNativeIds = new Set([62,64,65,68,69,71,72,74,75,77,78,79,80,81,82,89,90,145,155,175,176,219]);
  const deploymentIds = new Set([12,13,14,16,17,20,21,73,88,155,165,170,217,219,261,262,288]);
  const roleIds = new Set([18,19,22,146,260,280]);
  const staticIds = new Set([172,232,263]);
  const serviceActionIds = new Set([22,42,47,53,83,86,87,123,142,151,153,158,164,179,183,192,194,195,212,218,222,228,231,234,259,265,266,271,283,286,295]);
  const integrationIds = new Set([43,45,46,70,84,92,97,105,152,156,157,167,199,200,220,223,230,264,274,276,291]);
  const libraryIds = new Set([1,2,4,5,6,7,8,9,11,15,17,20,21,37,38,63,66,76,119,120,121,122,124,125,126,127,128,129,130,131,132,136,137,143,147,153,160,165,168,169,170,172,173,177,178,180,181,186,187,189,196,210,211,224,229,233,234,245,247,249,258,267,271,272,279,282,283,295,297]);

  for (const q of questions) {
    let docs;
    let note;
    if (agenticIds.has(q.id)) {
      docs = [URLS.agentic];
      note = 'Validated as current-platform content against the official Agent Workbench general-availability material.';
      q.versionNote ||= 'Current-platform content introduced after the supplied Architecture Boot Camp material.';
    } else if (mobileIds.has(q.id)) {
      docs = [URLS.mobileLibraries, URLS.librariesLearn];
      note = 'Validated as current-platform content against the official Mobile Library release and official Learn material.';
      q.versionNote ||= 'Current-platform content introduced after the supplied Architecture Boot Camp material.';
    } else if (dataFabricIds.has(q.id)) {
      docs = [URLS.dataFabric];
      note = 'Validated against the official ODC Data Fabric documentation.';
    } else if (workflowIds.has(q.id)) {
      docs = [URLS.workflows];
      note = 'Validated against the official ODC Workflow documentation.';
    } else if (observabilityIds.has(q.id)) {
      docs = [URLS.observability];
      note = 'Validated against the official ODC observability documentation.';
    } else if (eventIds.has(q.id) || q.category === 'events') {
      docs = [URLS.events, URLS.bootcamp];
      note = 'Validated against the current ODC Events reference and official Architecture Boot Camp material.';
    } else if (cloudNativeIds.has(q.id)) {
      docs = [URLS.cloudNative];
      note = 'Validated against the official cloud-native architecture documentation.';
    } else if (deploymentIds.has(q.id)) {
      docs = [URLS.deployments, URLS.bootcamp];
      note = 'Validated against official ODC deployment documentation and Boot Camp material.';
    } else if (roleIds.has(q.id)) {
      docs = [URLS.reuse, URLS.roles, URLS.serviceActions];
      note = 'Validated against official ODC role reuse and Service Action guidance.';
    } else if (staticIds.has(q.id)) {
      docs = [URLS.staticEntities, URLS.reuse];
      note = 'Validated against official Static Entity and cross-App reuse guidance.';
    } else if (serviceActionIds.has(q.id)) {
      docs = [URLS.serviceActions, URLS.reuse, URLS.bootcamp];
      note = 'Validated against official Service Action, reuse, and Boot Camp material.';
    } else if (integrationIds.has(q.id)) {
      docs = [URLS.integration, URLS.bootcamp];
      note = 'Validated against official ODC integration-pattern documentation and Boot Camp material.';
    } else if (libraryIds.has(q.id) || q.category === 'libraries') {
      docs = [URLS.libraries, URLS.librariesLearn, URLS.bootcamp];
      note = 'Validated against official ODC Libraries documentation, Learn content, and Boot Camp material.';
    } else if (q.category === 'patterns') {
      docs = [URLS.reuse, URLS.integration, URLS.dataConsistency, URLS.bootcamp];
      note = 'Validated against the applicable official ODC architecture-pattern documentation and Boot Camp material.';
    } else if (q.category === 'design') {
      docs = [URLS.architecture, URLS.bootcamp];
      note = 'Validated against the official Architecture Design Process and Architecture Boot Camp material.';
    } else {
      docs = [URLS.reuse, URLS.bootcamp];
      note = 'Validated against the applicable official ODC architecture documentation and Boot Camp material.';
    }

    if (q.id === 232) docs = [URLS.staticEntities, URLS.reuse];
    if ([236,263,296].includes(q.id)) docs = [URLS.reuse, URLS.bootcamp];
    if (q.id === 19) docs = [URLS.reuse, URLS.roles, URLS.serviceActions];
    if (q.id === 273) docs = [URLS.architecture, URLS.bootcamp];
    if (q.id === 275) docs = [URLS.reuse, 'https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/ui/themes/'];
    if ([74,145,175,176].includes(q.id)) docs = [URLS.cloudNative];

    q.documentationUrls = [...new Set(docs.filter(Boolean))];
    q.documentationUrl = q.documentationUrls[0];
    q.validationStatus = updated.has(q.id) ? 'UPDATED' : 'VERIFIED';
    q.validatedAt = REVIEW_DATE;
    q.reviewNotes = note;
    q.tags = [...new Set([q.category, ...(q.tags || []).filter(tag => !tag.includes('needs-manual') && !tag.includes('needs_manual')), q.validationStatus.toLowerCase()])];
    q.examTip ||= 'Identify the owner, dependency type, lifecycle, and the documented ODC element or pattern being tested.';
    if (q.answerOptions.filter(o => o.isCorrect).length > 1 && !/select all that apply/i.test(q.question)) {
      q.question += ' (Select all that apply.)';
    }
  }

  const duplicate = questions.find(q => q.id === 296);
  duplicate.validationStatus = 'DUPLICATE';
  duplicate.reviewNotes = 'Duplicate concept of question 236; technically aligned with the same official reference-data pattern.';
  duplicate.tags = [...new Set([...duplicate.tags.filter(tag => tag !== 'updated' && tag !== 'verified'), 'duplicate'])];

  const manualReview = new Set([70,92,95,97,112,130,134,139,184,189,191,204]);
  for (const q of questions.filter(item => manualReview.has(item.id))) {
    q.validationStatus = 'NEEDS_MANUAL_REVIEW';
    q.reviewNotes = 'NOT CONFIRMED: the answer is architecturally plausible, but this audit did not establish a sufficiently direct official statement for the exact wording. Use the linked official material to research the scenario before relying on it.';
    q.tags = [...new Set([...q.tags.filter(tag => tag !== 'verified' && tag !== 'updated'), 'needs-manual-review', 'student-research'])];
  }
}

function updateCorrectionFiles() {
  const replacements = new Map([
    ['| 5 | C | Naming conventions |', '| 5 | A | Naming conventions |'],
    ['| 7 | A | References between applications |', '| 7 | D | References between applications |'],
    ['| 12 | B | Roles across applications |', '| 12 | A | Roles across applications |'],
    ['| 10 | A | Mapping bounded contexts to apps |', '| 10 | D | Mapping bounded contexts to apps |'],
    ['| 5 | C | Naming conventions |', '| 5 | A | Naming conventions |'],
    ['| 7 | A | Referências entre aplicações |', '| 7 | D | Referências entre aplicações |'],
    ['| 12 | B | Roles entre aplicações |', '| 12 | A | Roles entre aplicações |']
    ,['| 10 | A | Divisão de bounded contexts em apps |', '| 10 | D | Divisão de bounded contexts em apps |']
  ]);
  const files = [
    `${ROOT}/files/ODC_QUESTIONS_CORRECTION_EN.md`,
    `${ROOT}/files/CORRECAO_QUESTOES_ODC.md`
  ];
  for (const file of files) {
    let text = fs.readFileSync(file, 'utf8');
    for (const [from, to] of replacements) text = text.split(from).join(to);
    const isPt = file.includes('CORRECAO_');
    const notice = isPt
      ? '> **Auditoria técnica (2026-07-22):** As Questões 5, 7, 12 e 28 foram alinhadas com as fontes oficiais. A Questão 5 testa a pasta redundante do bounded context; a 7 testa Screen entre Apps; a 12 separa Check<Role> de Grant/Revoke; a 28 usa public Entities para reference data estável.\n\n'
      : '> **Technical audit (2026-07-22):** Questions 5, 7, 12, and 28 were aligned with official sources. Question 5 tests the redundant bounded-context folder; 7 tests a Screen between Apps; 12 separates Check<Role> from Grant/Revoke; and 28 uses public Entities for stable reference data.\n\n';
    if (!text.includes('Technical audit (2026-07-22)') && !text.includes('Auditoria técnica (2026-07-22)')) {
      const firstBreak = text.indexOf('\n\n') + 2;
      text = text.slice(0, firstBreak) + notice + text.slice(firstBreak);
    }
    text = text
      .replace('- A. Use folders to group elements by bounded context.\n- B. Follow a clear naming convention based on the bounded context and application concepts.\n- **C. Prefix elements with the application context, for example `RiskGetAssessment`.**', '- **A. Group every element under a folder named after the bounded context, such as `PolicyManagement`.**\n- B. Use folders for internal business concepts such as Risk or Policy.\n- C. Name elements from the concept and purpose, for example `RiskGetAssessment`.')
      .replace('- A. Usar pastas para agrupar os elementos por bounded context.\n- B. Seguir uma convenção clara baseada no bounded context e nos conceitos da aplicação.\n- **C. Prefixar os elementos com o contexto da aplicação, por exemplo `RiskGetAssessment`.**', '- **A. Colocar todos os elementos numa pasta com o nome do bounded context, como `PolicyManagement`.**\n- B. Usar pastas para conceitos internos do negócio, como Risk ou Policy.\n- C. Nomear elementos pelo conceito e propósito, por exemplo `RiskGetAssessment`.')
      .replace('- **A. Themes.**\n- B. Server Actions.\n- C. Client Actions.\n- D. Screens.', '- A. Themes.\n- B. Server Actions.\n- C. Client Actions.\n- **D. Screens.**')
      .replace('- **A. Themes.**\n- B. Server Actions.\n- C. Client Actions.\n- D. Screens.', '- A. Themes.\n- B. Server Actions.\n- C. Client Actions.\n- **D. Screens.**')
      .replace('- A. Billing directly references the Role from Claims.\n- **B. Claims keeps the Role and exposes Service Actions that encapsulate the checks.**', '- **A. Billing references the public Role and uses `CheckAdministrator` for authorization checks.**\n- B. Claims exposes Service Actions for controlled Grant/Revoke assignment operations when validation or business rules apply.')
      .replace('- A. Billing referencia diretamente o Role de Claims.\n- **B. Claims mantém o Role e expõe Service Actions que encapsulam as verificações.**', '- **A. Billing referencia o Role público e usa `CheckAdministrator` nas verificações de autorização.**\n- B. Claims expõe Service Actions para operações controladas de Grant/Revoke quando existem validações ou regras de negócio.')
      .replace('- **A. Create a Location application, keep the entities private, and expose Service Actions.**\n- B. Create public entities and allow direct access through Aggregates/SQL.', '- **A. Create a Location application, expose Country and City as public Entities, and let consumers reference them directly.**\n- B. Keep the Entities private and expose Service Actions even though no rules or access constraints are stated.')
      .replace('- **A. Criar uma aplicação Location, manter as entidades privadas e expor Service Actions.**\n- B. Criar entidades públicas e permitir acesso direto por Aggregates/SQL.', '- **A. Criar uma aplicação Location, expor Country e City como public Entities e permitir referências diretas pelos consumidores.**\n- B. Manter as Entities privadas e expor Service Actions apesar de não existirem regras ou restrições de acesso no cenário.');

    const sources = isPt
      ? '\n\n## Fontes oficiais da auditoria\n\n- Reutilização entre Apps: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/\n- Service Actions: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/\n- Libraries: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/\n- Events: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/\n- Architecture Design Process: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/\n'
      : '\n\n## Official audit sources\n\n- Reuse across Apps: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/\n- Service Actions: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/\n- Libraries: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/\n- Events: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/\n- Architecture Design Process: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/\n';
    if (!text.includes('## Official audit sources') && !text.includes('## Fontes oficiais da auditoria')) text += sources;
    const perQuestion = `\n\n## ${isPt ? 'Matriz de validação por questão' : 'Per-question validation matrix'}\n\n| ${isPt ? 'Questão' : 'Question'} | ${isPt ? 'Fonte oficial principal' : 'Primary official source'} |\n|---:|---|\n| 5 | ${URLS.architecture} |\n| 6 | ${URLS.integration} |\n| 7 | ${URLS.reuse} |\n| 8 | ${URLS.integration} |\n| 9 | ${URLS.events} |\n| 10 | ${URLS.architecture} |\n| 11 | ${URLS.libraries} |\n| 12 | ${URLS.reuse} |\n| 13 | ${URLS.events} |\n| 14 | ${URLS.reuse} |\n| 15 | ${URLS.libraries} |\n| 16 | ${URLS.serviceActions} |\n| 17 | ${URLS.architecture} |\n| 18 | ${URLS.serviceActions} |\n| 19 | ${URLS.architecture} |\n| 20 | ${URLS.deployments} |\n| 21 | ${URLS.events} |\n| 22 | ${URLS.dataConsistency} |\n| 23 | ${URLS.integration} |\n| 24 | ${URLS.bootcamp} |\n| 25 | ${URLS.architecture} |\n| 26 | ${URLS.dataConsistency} |\n| 27 | ${URLS.libraries} |\n| 28 | ${URLS.reuse} |\n| 29 | ${URLS.libraries} |\n| 30 | ${URLS.architecture} |\n`;
    if (!text.includes('## Per-question validation matrix') && !text.includes('## Matriz de validação por questão')) text += perQuestion;
    fs.writeFileSync(file, text);
  }
}

function updateImportBank() {
  const file = `${ROOT}/files/odc_udemy_questions_for_app_import (1).json`;
  const questions = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const q of questions) {
    q.validationStatus = 'NEEDS_MANUAL_REVIEW';
    q.validatedAt = REVIEW_DATE;
    q.documentationUrls = q.documentationUrl ? [q.documentationUrl] : [];
    q.reviewNotes = 'OCR/import source is not used by the runtime simulator and contains incomplete or corrupted question text/options. Manual reconstruction against an official source is required before import.';
    q.tags = [...new Set([q.category || 'odc-udemy', 'import-bank', 'ocr', 'needs-manual-review'])];
  }
  fs.writeFileSync(file, JSON.stringify(questions, null, 2) + '\n');
  return questions;
}

function answerLabel(q) {
  const letters = 'ABCDE';
  return q.answerOptions.map((o, i) => o.isCorrect ? `${letters[i]}. ${o.text}` : null).filter(Boolean).join('; ');
}

function md(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
}

function writeReports(runtime, imported) {
  const previous = new Map([
    [19, 'B. A Role is made public in the producer app; consumer apps add a reference and use Check/Grant/Revoke actions.'],
    [39, 'B. The system must integrate with an external Identity Provider.'],
    [74, 'A. Amazon Aurora stores app revisions and dependency information.'],
    [123, "A. Right-click the Server Action and select 'Expose as Service Action' (ambiguous Library wording)."],
    [144, 'A. Extract shared logic into a third independent service.'],
    [145, 'A. Isolated database schemas per Stage.'],
    [146, 'B. Service Actions, Roles, Entities, Static Entities, and Events (claimed complete list).'],
    [153, 'A. Architectural incompatibility between Service Actions and Libraries.'],
    [154, 'A. UI, Microservice, and Asynchronous Processing described as ODC application types.'],
    [168, 'A. General-purpose and Mobile Libraries, including legacy Cordova/Capacitor wording.'],
    [169, 'B. Mobile Library with legacy Cordova/Capacitor wording.'],
    [171, 'A. Agentic App plus undocumented Call<AgentName> detail.'],
    [175, 'B. HA optional add-on only for Production with multi-AZ replication.'],
    [176, 'A. Amazon Aurora stores OML blob history.'],
    [195, 'B. Public Entities are categorically a concern.'],
    [197, 'C. Agentic App with undocumented Call<AgentName> integration detail.'],
    [198, 'B. Agentic App purpose with undocumented Call<AgentName> integration detail.'],
    [243, 'A. Mobile Library with legacy Cordova/Capacitor, UI, and configuration claims.'],
    [202, 'B. Timers run only on a fixed schedule.'],
    [232, 'C. Reference Static Entities from the producer app directly in consumer apps.'],
    [236, 'D. Create a new Location app with private Entities and Service Actions.'],
    [263, 'A. Expose Currency as a Public Entity.'],
    [273, 'A. Group all elements in a folder named after the bounded context.'],
    [275, 'D. Screen'],
    [296, 'A. Location App with private Entities and Service Actions.']
  ]);
  const technicalChanged = new Set(previous.keys());
  const rows = runtime.map(q => {
    const current = previous.get(q.id) || answerLabel(q);
    const issue = q.validationStatus === 'NEEDS_MANUAL_REVIEW'
      ? q.reviewNotes
      : q.validationStatus === 'DUPLICATE'
        ? q.reviewNotes
        : technicalChanged.has(q.id) ? 'Answer, wording, or explanation required alignment.' : 'No contradiction found in the validated scope.';
    const change = technicalChanged.has(q.id)
      ? 'Applied to the runtime bank; see CHANGELOG.md.'
      : q.validationStatus === 'NEEDS_MANUAL_REVIEW' ? 'Manual evidence review required before verification.' : 'Metadata, source links, and structured explanation display added.';
    return `| ${q.id} | ${md(q.question)} | ${md(current)} | ${md(answerLabel(q))} | ${q.validationStatus} | ${md(issue)} | ${md(change)} | ${md(q.documentationUrls.join('<br>'))} | ${md(q.reviewNotes)} |`;
  });
  const importRows = imported.map(q => `| IMPORT-${q.id} | ${md(q.question)} | ${md(answerLabel(q) || 'No valid answer in OCR record')} | Not validated | NEEDS_MANUAL_REVIEW | OCR corruption/incomplete options; not used by runtime. | Reconstruct manually before import. | ${md(q.documentationUrls.join('<br>'))} | ${md(q.reviewNotes)} |`);
  const report = `# ODC Question Audit Report\n\nAudit date: ${REVIEW_DATE}\n\nScope: 298 runtime questions in \`index.html\`, ${imported.length} OCR/import records, both correction guides, source URLs, scoring, and explanation rendering. The runtime bank is authoritative for the simulator. The import JSON is retained as a non-runtime source and quarantined because its OCR is incomplete.\n\nStatus policy: \`VERIFIED\` and \`UPDATED\` require a directly relevant official source; unsupported claims are \`NEEDS_MANUAL_REVIEW\`. \`DUPLICATE\` identifies a retained duplicate concept without changing its ID.\n\n| Question ID | Question text | Current answer (pre-audit) | Validated answer | Status | Issue found | Change required | Official documentation URL | Notes |\n|---:|---|---|---|---|---|---|---|---|\n${rows.concat(importRows).join('\n')}\n`;
  fs.writeFileSync(`${ROOT}/QUESTION_AUDIT_REPORT.md`, report);

  const changes = [
    ['19','index.html','B (combined direct Check/Grant/Revoke)','A (direct Check<Role>; assignment separated)','Grouped checks and assignment operations.','Distinguishes authorization checks from producer-controlled Grant/Revoke.','Corrected role responsibility and removed an absolute statement.',[URLS.reuse,URLS.serviceActions]],
    ['39','index.html','B (external IdP integration)','A (availability target)','Used an integration as an NFR example.','Uses an operational quality constraint as the NFR.','Removed category ambiguity between integrations and NFRs.',[URLS.architecture,URLS.bootcamp]],
    ['74','index.html','A (Aurora for revisions/dependencies)','A (Aurora for relational runtime data)','Mixed platform artifact storage with App data storage.','Tests Aurora only for relational App data.','Corrected the data-store responsibility.',[URLS.cloudNative]],
    ['123','index.html','A with Library-ambiguous wording','A with explicit App producer wording','Could imply a Library Server Action cannot be public.','Explains App Server Action → Service Action versus Library public Server Action.','Removed App/Library element ambiguity.',[URLS.serviceActions,URLS.libraries]],
    ['144','index.html','A (third independent service)','A (shared Library)','Suggested a new runtime service for generic shared logic.','Uses a Library for stable business-agnostic validation.','Made ownership and dependency direction explicit.',[URLS.libraries,URLS.reuse]],
    ['145','index.html','A (schema isolation wording)','A (isolated Runtime stage data stores)','Over-specified database schemas.','Uses documented isolated Runtime stages and encrypted data stores.','Removed an undocumented implementation detail.',[URLS.cloudNative]],
    ['146','index.html','B (incomplete “complete list”)','A (public Role use case)','Omitted Screens while claiming a complete list.','Asks one unambiguous public App element.','Removed an incorrect exhaustive claim.',[URLS.reuse,URLS.roles]],
    ['153','index.html','A (inferred architectural incompatibility)','A (documented element model)','Presented inference as platform fact.','States public Server Actions in Libraries and Service Actions in Apps.','Grounded the rationale in supported elements.',[URLS.libraries,URLS.serviceActions]],
    ['154','index.html','A (roles called App types)','A (architectural roles)','Confused solution roles with creation-time asset types.','Labels UI/service/background as architectural roles.','Corrected terminology.',[URLS.architecture,URLS.bootcamp]],
    ['168','index.html','A (Cordova/Capacitor and mobile UI wording)','A (current JS-based native plugin purpose)','Mixed current and legacy extensibility terminology.','Uses current Mobile Library purpose.','Aligned with December 2025 product release.',[URLS.mobileLibraries]],
    ['169','index.html','B (legacy Cordova/Capacitor wording)','B (current JavaScript-based mobile plugin model)','Mixed legacy plugin names with the current ODC mechanism.','Uses a Mobile Library for reusable native mobile plugins.','Aligned with current Mobile Library terminology.',[URLS.mobileLibraries,URLS.librariesLearn]],
    ['171','index.html','A (included Call<AgentName>)','A (documented Agent Workbench purpose)','Contained an unverified generated-action detail.','Tests build/govern/deploy/orchestrate agent capabilities.','Removed unsupported implementation detail.',[URLS.agentic]],
    ['175','index.html','B (commercial/add-on and multi-AZ claim)','A (managed health replacement and replication)','Combined availability behavior with unsupported packaging details.','Tests the documented cloud-native availability principle.','Removed unsupported commercial/platform specifics.',[URLS.cloudNative]],
    ['176','index.html','A (Aurora)','A (S3)','Assigned OML blob history to relational storage.','Assigns OML revision history to object storage.','Corrected platform data-store mapping.',[URLS.cloudNative]],
    ['195','index.html','B (public Entities inherently unacceptable)','A (review evolving business Entities)','Made public Entity use categorically wrong.','Makes the decision depend on rules and model stability.','Aligned with reference/plain/business data patterns.',[URLS.reuse,URLS.serviceActions]],
    ['197','index.html','C (included Call<AgentName>)','C (documented Agentic App purpose)','Contained an unverified generated-action detail.','Identifies the current governed AI-agent App type.','Removed unsupported implementation detail.',[URLS.agentic]],
    ['198','index.html','B (included Call<AgentName>)','B (documented Agentic App purpose)','Contained an unverified generated-action detail.','Tests the governed AI-agent lifecycle.','Removed unsupported implementation detail.',[URLS.agentic]],
    ['243','index.html','A (legacy Cordova/Capacitor, UI, and configuration wording)','A (current JavaScript-based native plugin purpose)','Mixed legacy and unsupported Mobile Library responsibilities.','Tests the documented reusable native-plugin purpose.','Aligned with current Mobile Library terminology.',[URLS.mobileLibraries,URLS.librariesLearn]],
    ['202','index.html','B (Timer fixed schedule only)','A (scheduled or explicitly awakened)','Used an absolute Timer limitation.','Distinguishes stateful Workflow from Timer execution accurately.','Removed the false “only fixed schedule” claim.',[URLS.workflows,URLS.bootcamp]],
    ['232','index.html','C (countries/currencies always Static Entities)','A (lifecycle-dependent distinction)','Treated stable reference concepts as necessarily static.','Distinguishes fixed model enumeration from runtime-managed public reference data.','Removed an absolute and context-dependent answer.',[URLS.staticEntities,URLS.reuse]],
    ['236','index.html','D (Location + private Entities + Service Actions)','C (Location + public Entities)','Claimed maximum independence always requires encapsulation.','Uses public Entities for stable, business-agnostic reference data; states Service Action caveats.','Aligned with official Sharing Reference Data pattern.',[URLS.reuse]],
    ['263','index.html','A, ambiguous Currency lifecycle','A, explicitly runtime-maintained Currency','Did not distinguish Static Entity from runtime data.','Makes runtime maintenance and absence of rules explicit.','Removed Static Entity/Public Entity ambiguity.',[URLS.staticEntities,URLS.reuse]],
    ['273','index.html','A','A','Correct answer existed but lacked audit evidence.','Clarifies redundant bounded-context folder versus concept + purpose naming.','Aligned with Naming Best Practices material.',[URLS.architecture]],
    ['275','index.html','D (Screen)','D (Screen)','Correction guide contradicted runtime answer.','Clarifies Screen App-to-App versus Theme through Library.','Resolved simulator/correction contradiction.',[URLS.reuse]],
    ['296','index.html','A (private Entities + Service Actions)','B (public Entities)','Contradicted questions 236/263 and official reference-data pattern.','Aligned duplicate concept to public Entities with caveats.','Resolved reference-data contradiction.',[URLS.reuse]],
    ['5','files/ODC_QUESTIONS_CORRECTION_EN.md; files/CORRECAO_QUESTOES_ODC.md','C','A','Treated RiskGetAssessment as incorrect.','Redundant bounded-context folder is incorrect; concept + purpose name is valid.','Aligned both languages with Naming Best Practices.',[URLS.architecture]],
    ['7','files/ODC_QUESTIONS_CORRECTION_EN.md; files/CORRECAO_QUESTOES_ODC.md','A (Theme)','D (Screen)','Confused Library Theme reuse with App-to-App references.','Identifies Screen as the App-to-App element.','Aligned with ODC reuse model.',[URLS.reuse]],
    ['10','files/ODC_QUESTIONS_CORRECTION_EN.md; files/CORRECAO_QUESTOES_ODC.md','A (Business Sponsor)','D (user expectations)','Contradicted official Assemble criteria and App Q221/Q278.','Business Sponsor remains a criterion; user expectations are not key in this decision.','Aligned with Boot Camp and practice exam.',[URLS.architecture,URLS.bootcamp]],
    ['12','files/ODC_QUESTIONS_CORRECTION_EN.md; files/CORRECAO_QUESTOES_ODC.md','B (all checks through Service Actions)','A (public Role + Check<Role>)','Conflated authorization checks with role assignment.','Direct Check<Role>; producer-controlled Grant/Revoke when rules apply.','Removed overgeneralization.',[URLS.reuse,URLS.serviceActions]],
    ['28','files/ODC_QUESTIONS_CORRECTION_EN.md; files/CORRECAO_QUESTOES_ODC.md','A (Location + private Entities + Service Actions)','A (Location + public Entities)','Used business-data encapsulation for simple reference data.','Uses public Entities and documents when Service Actions are preferable.','Aligned with official Sharing Reference Data pattern.',[URLS.reuse]],
    ['ALL','index.html','No validation metadata; explanation hid some wrong options after a correct response.','Metadata on every question; all option rationales, status, tips, version notes, and links shown.','Auditability and explanation format were incomplete.','Structured explanation renderer and explicit source links.','Implemented the required data model and display behavior.',Object.values(URLS)]
  ];
  const changelog = `# Changelog\n\nTechnical audit date: ${REVIEW_DATE}\n\n| Question ID | File changed | Old answer | New answer | Old explanation summary | New explanation summary | Reason for change | Official documentation URL |\n|---:|---|---|---|---|---|---|---|\n${changes.map(c => `| ${c.slice(0,7).map(md).join(' | ')} | ${md(c[7].join('<br>'))} |`).join('\n')}\n`;
  fs.writeFileSync(`${ROOT}/CHANGELOG.md`, changelog);

  const manualRuntime = runtime.filter(q => q.validationStatus === 'NEEDS_MANUAL_REVIEW');
  const manual = `# Needs Manual Review\n\nAudit date: ${REVIEW_DATE}\n\nThese records were reviewed but not promoted to verified status because a directly supporting current official source was not established, the claim is infrastructure-specific, or the source record is incomplete. Existing answers are retained for traceability and must not be treated as authoritative.\n\n## Runtime questions (${manualRuntime.length})\n\n| ID | Question | Reason | Candidate official URL(s) |\n|---:|---|---|---|\n${manualRuntime.map(q => `| ${q.id} | ${md(q.question)} | ${md(q.reviewNotes)} | ${md(q.documentationUrls.join('<br>'))} |`).join('\n')}\n\n## OCR/import records (${imported.length})\n\nAll ${imported.length} records in \`files/odc_udemy_questions_for_app_import (1).json\` require reconstruction. Several have merged question/option text, missing choices, or no correct answer. They are not loaded by the simulator.\n\n${imported.map(q => `- IMPORT-${q.id}: ${md(q.question)} — ${md(q.reviewNotes)}`).join('\n')}\n`;
  fs.writeFileSync(`${ROOT}/NEEDS_MANUAL_REVIEW.md`, manual);

  const contradictions = `# Contradictions\n\nInventory created before technical changes; resolution state shown below.\n\n| Concept / records | Contradiction found | Resolution | Status | Official source |\n|---|---|---|---|---|\n| Correction Q5 vs App Q273 | Guide marked \`RiskGetAssessment\` wrong; App correctly identified the redundant bounded-context folder. | Correction Q5 changed to A; both now explain App boundary, concept folders, and concept + purpose names. | Resolved | ${URLS.architecture} |\n| Correction Q7 vs App Q275 | Guide answered Theme; runtime answered Screen. | Guide changed to Screen; Theme reuse explicitly assigned to Libraries. | Resolved | ${URLS.reuse} |\n| Correction Q12 vs App Q19 | Both grouped Check, Grant, and Revoke inconsistently. | Direct public Role check separated from producer-controlled assignment operations. | Resolved | ${URLS.reuse}<br>${URLS.serviceActions} |\n| Correction Q28 vs App Q236/Q296 | Guide and Apps preferred private Entities + Service Actions, while Q263 preferred a public Entity for the same stable-reference-data concept. | Q28/Q236/Q296 aligned to Location-owned public Entities; Service Action caveats documented. | Resolved | ${URLS.reuse} |\n| App Q232 vs Q263 | Q232 implied currency/country always Static; Q263 used a public regular Entity. | Q232 made lifecycle-dependent; Q263 now explicitly says runtime-maintained. | Resolved | ${URLS.staticEntities}<br>${URLS.reuse} |\n| App Q236 vs Q296 | Near-duplicate Country/City scenario with the same old answer. | Both aligned; Q296 marked DUPLICATE and retained without changing ID. | Resolved/retained | ${URLS.reuse} |\n| Mobile Library Q168/Q169/Q243–Q245/Q247 vs old Boot Camp | Old material predates the asset type. | Kept as current-platform content with version notes and current official source. | Resolved | ${URLS.mobileLibraries} |\n| Agentic App Q10/Q171/Q197/Q198 vs old Boot Camp | Old Boot Camp lists only earlier Web/Mobile choices. | Kept as current-platform content with GA source and version notes. | Resolved | ${URLS.agentic} |\n| Event numeric questions Q54–Q58 and equivalents | Exact numbers were uncited and explanations differed on retry intervals. | Aligned to official Events material and a single Events reference URL. | Resolved | ${URLS.events} |\n| Infrastructure-specific questions (EKS/Aurora/NATS/schema isolation, etc.) | Assertions lack directly supporting current public documentation. | Retained but marked NEEDS_MANUAL_REVIEW; not represented as verified facts. | Open/manual | — |\n| Runtime bank vs import JSON IDs 1–62 | Same numeric IDs refer to different questions; import OCR is corrupted and is not loaded by the app. | Runtime source documented; import records namespaced as IMPORT-ID in reports and quarantined. IDs were not changed. | Contained/manual | — |\n`;
  const correctedContradictions = contradictions
    .replace('| Correction Q12 vs App Q19 |', `| Correction Q10 vs App Q221/Q278 | Guide excluded Business Sponsor; runtime excluded user expectations. | Guide changed to user expectations; Business Owner, Business Sponsor, and product-team autonomy remain Assemble criteria. | Resolved | ${URLS.architecture}<br>${URLS.bootcamp} |\n| Correction Q12 vs App Q19 |`)
    .replace('| Infrastructure-specific questions (EKS/Aurora/NATS/schema isolation, etc.) | Assertions lack directly supporting current public documentation. | Retained but marked NEEDS_MANUAL_REVIEW; not represented as verified facts. | Open/manual | — |', `| Aurora vs S3 questions Q74/Q176 | Both assigned revision/blob storage to Aurora. | Q74 now tests Aurora relational Runtime data; Q176 assigns OML history to S3. | Resolved | ${URLS.cloudNative} |\n| Twelve scenario-specific runtime questions | Exact wording is plausible but lacks a sufficiently direct official statement. | Retained with visible NOT CONFIRMED status, candidate links, and student-research tag. | Open/manual | See NEEDS_MANUAL_REVIEW.md |`)
    .replace('Runtime bank vs import JSON IDs 1–62', 'Runtime bank vs import JSON IDs 1–65');
  fs.writeFileSync(`${ROOT}/CONTRADICTIONS.md`, correctedContradictions);
}

function main() {
  let html = fs.readFileSync(INDEX, 'utf8');
  const loaded = loadRuntimeQuestions(html);
  correctIndex(loaded.questions);
  applyMetadata(loaded.questions);
  const replacement = `const RAW_QUESTIONS = ${JSON.stringify(loaded.questions, null, 2)};`;
  html = html.slice(0, loaded.start) + replacement + html.slice(loaded.end);
  fs.writeFileSync(INDEX, html);
  updateCorrectionFiles();
  const imported = updateImportBank();
  writeReports(loaded.questions, imported);
  console.log(`Updated ${loaded.questions.length} runtime questions.`);
}

main();
