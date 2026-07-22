# ODC Architecture Specialist — Question Review and Study Guide

> **Technical audit (2026-07-22):** Questions 5, 7, 12, and 28 were aligned with official sources. Question 5 tests the redundant bounded-context folder; 7 tests a Screen between Apps; 12 separates Check<Role> from Grant/Revoke; and 28 uses public Entities for stable reference data.

## Scope

The available photographs cover **questions 5–30**. Questions 1–4 are not present in the folder.

Images `IMG_8881.JPG` through `IMG_8886.JPG` repeat questions 27–30. The orange border indicates the answer selected during the test; it does **not** necessarily indicate the correct answer.

> **Transcription note:** the wording below was reconstructed from the photographs. It preserves the visible meaning and answer choices, although a few sentences may not be word-for-word identical to the exam.

## Quick answer key

| Question | Answer | Main topic |
|---:|:---:|---|
| 5 | A | Naming conventions |
| 6 | B | Direct Integration vs. Cold Cache |
| 7 | D | References between applications |
| 8 | D | Cold Cache |
| 9 | B | Event-Driven Architecture |
| 10 | D | Mapping bounded contexts to apps |
| 11 | C | Settings in Libraries |
| 12 | A | Roles across applications |
| 13 | A | Event processing capacity |
| 14 | D | Navigation across applications |
| 15 | B | Elements consumed from a Library |
| 16 | A | Encapsulation of business data |
| 17 | B | Ownership and release independence |
| 18 | A | Sharing data with business rules |
| 19 | B | NFRs vs. Business Concepts |
| 20 | B | Containers and stages |
| 21 | C | Event delivery order |
| 22 | D | Saga compensation |
| 23 | A | Integration Service Wrappers |
| 24 | A | Timers |
| 25 | C | Clear ownership |
| 26 | D | Distributed transaction compensation |
| 27 | D | Reusable Blocks |
| 28 | A | Shared reference data |
| 29 | D | Purpose of Libraries |
| 30 | A | Architecture Design Process |

## Questions and answer choices

The correct choice is shown in **bold**.

### Question 5

Considering naming best practices for the **Policy Management** bounded context, which of the following options is incorrect?

- **A. Group every element under a folder named after the bounded context, such as `PolicyManagement`.**
- B. Use folders for internal business concepts such as Risk or Policy.
- C. Name elements from the concept and purpose, for example `RiskGetAssessment`.
- D. Name the application after its bounded context, for example `PolicyManagement`.

### Question 6

In which scenario should a **Direct Integration** be used instead of a **Cold Cache**?

- A. When application performance is not a concern.
- **B. When the application cannot tolerate data update delays.**
- C. When frequent data updates are required.
- D. When the source API does not support differential synchronization.

### Question 7

Which of the following elements can be referenced between ODC applications?

- A. Themes.
- B. Server Actions.
- C. Client Actions.
- **D. Screens.**

### Question 8

Which option describes a purpose of using a **Cold Cache Pattern** when integrating with an external system?

- A. To reduce the development complexity required when connecting directly to an external system's APIs.
- B. To ensure real-time data integration with the external system.
- C. To abstract several implementations of the same service in a single Library.
- **D. To prevent the overload of the external system's APIs.**

### Question 9

What is a benefit of using **Event-Driven Architecture** between applications?

- A. It creates a global, always-consistent view of decentralized data.
- **B. It promotes loose coupling and independent lifecycles.**
- C. It automatically creates a distributed transaction.
- D. It creates strong dependencies between producers and consumers.

### Question 10

Which of the following is **not** a key criterion for choosing a simple or distributed approach when mapping bounded contexts to applications?

- **A. Business Sponsor.**
- B. Business Owner.
- C. Number and autonomy of product teams.
- D. User expectations and experience consistency.

### Question 11

A Library contains a secret Setting consumed by multiple applications. Which statement is correct?

- A. Its value is permanently defined in the Library during the first promotion to QA.
- B. A change is immediately and synchronously applied to every instance and consumer.
- **C. The Setting is configured in the consuming application and may differ by stage.**
- D. Every change requires editing the value in ODC Studio and publishing a new version.

### Question 12

The **Claims** application owns the `Administrator` Role, and **Billing** needs to check the same authorization. What is the recommended approach?

- **A. Billing references the public Role and uses `CheckAdministrator` for authorization checks.**
- B. Claims exposes Service Actions for controlled Grant/Revoke assignment operations when validation or business rules apply.
- C. Billing creates another `Administrator` Role.
- D. Move the Role to a shared Library.

### Question 13

What happens when more Events are triggered than can be processed concurrently?

- **A. Events are added to the runtime queue until the queue reaches its capacity.**
- B. The entire application pauses until processing capacity is available.
- C. The platform shortens the execution time of Events already running.
- D. Excess Events are immediately discarded.

### Question 14

A common menu implemented as a Block in a Library must navigate to Screens in several applications. What is the recommended approach?

- A. Store URLs in an entity and create one Service Action per application.
- B. Directly reference the applications' Screens from the Block.
- C. Retrieve all URLs through Service Actions from every application.
- **D. Use static external URLs for the Screens in the respective applications.**

### Question 15

Which element from a Library can be consumed by an application?

- A. Service Action.
- **B. Server Action.**
- C. Persistent business entity.
- D. Role.

### Question 16

Orders and Shipping use the public `Supplier` entity and duplicate Aggregates and calculations. How should the architecture be improved?

- **A. Make Supplier private and encapsulate its data and rules in Service Actions.**
- B. Split Supplier into separate entities for each supplier type.
- C. Expose Server Actions directly between the applications.
- D. Keep the entity public and the calculations in each consumer.

### Question 17

In one scenario, Claims and Billing have different Business Owners but belong to the same application. Which statement is correct?

- A. All presented scenarios guarantee independent releases.
- **B. Claims and Billing should be separated into different applications.**
- C. The only problem is having multiple Business Sponsors.
- D. Having both a Business Owner and Business Sponsor compromises autonomy.

### Question 18

How should data be shared between applications when access rules and business requirements also apply?

- **A. Encapsulate access and business rules in Service Actions.**
- B. Convert the data into Static Entities.
- C. Expose Server Actions between applications.
- D. Directly expose public entities.

### Question 19

Which statement correctly distinguishes **Non-Functional Requirements (NFRs)** from **Business Concepts**?

- A. NFRs describe external integrations only.
- **B. NFRs describe technical and operational qualities; Business Concepts describe the domain.**
- C. NFRs primarily define owners, sponsors, and teams.
- D. The terms are equivalent and both describe functional requirements.

### Question 20

How is an application published and promoted through ODC stages?

- A. Its code can be modified and published independently in any stage.
- **B. It is published in Development, and the same container is promoted separately and sequentially.**
- C. Publishing in Development automatically deploys it to every stage.
- D. All promotions are automatic and require no deployment controls.

### Question 21

Which statement about Event delivery order is correct?

- A. Delivery always follows the order in which Events were triggered.
- B. A developer-defined global priority determines the order.
- **C. Delivery order is not guaranteed.**
- D. The runtime queue always provides strict FIFO ordering.

### Question 22

Which of the following is **not** a compensation mechanism in a Saga?

- A. Delete or invalidate data created by an earlier step.
- B. Execute an inverse operation, such as a debit that reverses a credit.
- C. Restore the application to a consistent business state.
- **D. Retry the failed operation.**

### Question 23

Which statement about **Integration Service Wrappers** is false?

- **A. A dependency from an application to a Library is a loosely coupled runtime integration.**
- B. A reusable wrapper can hide API implementation details and may be a good Forge component candidate.
- C. A wrapper allows the same external integration to be reused by several applications.
- D. Centralizing API adaptation reduces the impact of changes by the external provider.

### Question 24

Which statement about **Timers** is correct?

- **A. A Timer can only be created in an application.**
- B. Its schedule is exclusively defined in the ODC Portal.
- C. Its schedule must be identical in every stage.
- D. A Timer can only run on its periodic schedule and never manually.

### Question 25

Why is clear ownership important in architecture design?

- A. It guarantees lower technical complexity.
- B. It increases the flow of communication.
- **C. It helps explain the organization and who is accountable for each domain.**
- D. Its only purpose is to reduce developers' cognitive load.

### Question 26

In a Saga, `Subscribe Policy` succeeds and then `Create Payment` fails. What should happen?

- A. Delete the records from the failed payment.
- B. Repeat the whole transaction from the beginning.
- C. Ignore the failure and continue.
- **D. Execute the compensation for `Subscribe Policy`.**

### Question 27

Orders and Shipping need to reuse the same Block. Which step is **not** part of the recommended approach?

- A. Move the Block into a new Library.
- B. Make the Block receive data through an Input Parameter.
- C. Have Orders expose required data/calculations to Shipping through a Service Action.
- **D. Put business-specific logic and data inside the shared Block.**

### Question 28

Country and City are reference data used by Directory, Vacations, and Travel Portal. What is the recommended architecture?

- **A. Create a Location application, expose Country and City as public Entities, and let consumers reference them directly.**
- B. Keep the Entities private and expose Service Actions even though no rules or access constraints are stated.
- C. Keep ownership of the data in the Directory application.
- D. Directly expose Country and City to Vacations and Travel Portal.

### Question 29

What is the main architectural purpose of **Libraries**?

- A. To create strong build-time coupling.
- B. To automatically package code in the consuming container.
- C. To share any kind of code, including business-specific logic.
- **D. To implement reusable, business-agnostic components.**

### Question 30

What is the first step of the **Architecture Design Process** for identifying bounded contexts?

- **A. Interview the stakeholders.**
- B. Map the relationships between concepts.
- C. Organize the collected concepts.
- D. Define boundaries and responsibilities.

## Explained answers

### Question 5 — A

The App normally represents the bounded context, so placing every element under another `PolicyManagement` folder repeats the same boundary. Folders should organize internal business concepts, while an element name such as `RiskGetAssessment` states the concept and purpose. App names should follow the bounded context.

Official documentation: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/

### Question 6 — B

Direct Integration retrieves external data at the time it is needed and is appropriate when stale data is unacceptable. A Cold Cache trades some freshness for lower latency, fewer external calls, and greater operational resilience.

### Question 7 — D

A public Screen can be referenced between Apps, creating the cross-App navigation dependency tested here. Themes intended for reuse belong in Libraries; Server Actions and Client Actions are not App-to-App contracts.

Official documentation: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/

### Question 8 — D

A Cold Cache keeps a local copy and refreshes it according to a synchronization strategy. This reduces API calls, latency, and reliance on the external system, but it does not guarantee real-time data.

### Question 9 — B

The producer publishes an Event without knowing consumer implementations. Consumers can evolve and be deployed independently. This does not create an automatic distributed transaction or globally consistent data view.

### Question 10 — D

Business Owners, Business Sponsors, and the number/autonomy of product teams are explicit Assemble criteria because they determine ownership and release pace. User expectations and look & feel are not the key criterion in this specific simple-versus-distributed decision.

Official documentation: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/

### Question 11 — C

The consuming application configures the Setting for each stage, allowing Development, QA, and Production to use different secret values without hard-coding or republishing the application for every operational change.

### Question 12 — A

Claims can make the Role public and Billing can reference it for authorization checks through `CheckAdministrator`. Assignment is a separate responsibility: Grant/Revoke should normally remain controlled by Claims and can be encapsulated in producer-owned Service Actions when validation or business rules apply. Duplicating the Role creates a distinct authorization identity.

Official documentation: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/

Official documentation: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/

### Question 13 — A

The queue absorbs bursts while consumers process Events as capacity becomes available. Reaching the parallel-processing limit does not pause the full application, shorten running work, or immediately discard new Events.

### Question 14 — D

A shared Block should remain application-agnostic. Static external URLs allow cross-application navigation without direct Screen references, unnecessary persistence, or coordinated runtime calls to every application.

### Question 15 — B

A Library can expose reusable Server Actions that are packaged into the consuming application's container. Service Actions are runtime contracts between applications; business entities and Roles should remain application-owned.

### Question 16 — A

The data owner should keep Supplier private and control access, calculations, and model evolution through Service Actions. Consumers should not duplicate Aggregates or business rules over another application's entity.

### Question 17 — B

Different Business Owners generally imply different priorities and delivery cycles. Keeping Claims and Billing in one application ties their releases together; separating them restores clear ownership and independent evolution.

### Question 18 — A

Service Actions create a stable contract and keep access and business rules beside the data owner. Direct entity access exposes the physical model and lets consumers bypass or duplicate those rules.

### Question 19 — B

NFRs cover qualities such as performance, availability, security, scalability, and operations. Business Concepts describe the domain being modeled: they answer different architectural questions.

### Question 20 — B

The application is published in Development, after which the same container is promoted through controlled deployments to later stages. This preserves traceability and ensures the same artifact moves through the pipeline.

### Question 21 — C

Asynchronous processing, concurrency, retries, and different processing times mean delivery order cannot be assumed. Consumers should be idempotent and able to handle out-of-order Events.

### Question 22 — D

Compensation semantically reverses an already completed step. A retry attempts the original failed operation again; it does not undo a previous successful change.

### Question 23 — A

A Library dependency is a build/package-time dependency, not a loosely coupled runtime integration between applications. Wrappers remain useful for reuse, hiding external API details, and limiting the impact of provider changes.

### Question 24 — A

A Timer needs an application's independent runtime and lifecycle. Schedules may differ by stage, and a Timer may also be manually awakened; it is not restricted to periodic execution only.

### Question 25 — C

Clear ownership shows who decides, prioritizes, funds, maintains, and is accountable for a domain or application. It supports autonomy and architectural decisions, although it does not automatically eliminate technical complexity.

### Question 26 — D

Because `Subscribe Policy` completed before payment failed, the Saga must compensate that completed business step. Retrying everything could duplicate work, while ignoring the failure leaves an active policy without payment.

### Question 27 — D

The shared Block should be placed in a Library and remain business-agnostic by receiving data through an Input Parameter. Domain logic stays with its owner and is exposed to another application through a Service Action when required.

### Question 28 — A

A Location application provides the correct owner for Country and City. Because the scenario describes stable, business-agnostic reference data without complex rules, the documented pattern is to expose public Entities and let consumers reference them directly. Prefer Service Actions when access control, complex rules, an unstable model, or ownership constraints require encapsulation.

Official documentation: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/

### Question 29 — D

Libraries are intended for reusable, business-agnostic components. Their code is packaged into consuming containers and therefore creates build-time coupling; business-specific logic should remain with its owning application.

### Question 30 — A

Stakeholder interviews reveal language, concepts, processes, ownership, and business problems. Concepts can only be organized, related, and divided into bounded contexts after that discovery step.

## Rules to remember

### Application vs. Library

- **Application:** owns business data, Screens, Roles, Timers, and domain-specific logic.
- **Library:** contains reusable UI/Blocks, Themes, utilities, integrations, and business-agnostic logic.
- A Library is packaged into the consuming container, creating build-time coupling.
- Between applications, use a **Service Action** as the internal API.
- From a Library, reusable logic is normally provided through a **Server Action**.

### Data across applications

- The data owner should control read/write business rules.
- When business rules apply, keep the entity private and use Service Actions.
- Avoid duplicating Aggregates and calculations over another application's entities.
- Cross-cutting reference data may deserve a dedicated owning application.

### Events and Sagas

- Events promote loose coupling and independent releases.
- Delivery order is not guaranteed.
- Consumers should be idempotent.
- Retry tries again; compensation semantically reverses an earlier step.
- A Saga manages eventual consistency, not a distributed ACID transaction.

### Integrations

- **Direct Integration:** current data, but stronger reliance on external latency and availability.
- **Cold Cache:** fewer calls and better resilience, while accepting potentially stale data.
- **Integration Service Wrapper:** hides an external API, promotes reuse, and limits the impact of provider changes.

## Short study plan

1. Cover the Answer column in the quick key and answer all 26 questions.
2. For each mistake, explain who owns the data/logic and what kind of dependency exists.
3. Focus on the pairs the exam tries to confuse:
   - Service Action vs. Server Action;
   - Application vs. Library;
   - Direct Integration vs. Cold Cache;
   - Retry vs. Compensation;
   - synchronous integration vs. Events.
4. On the following day, repeat only the questions you missed without consulting this guide.


## Official audit sources

- Reuse across Apps: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/reuse_elements_across_apps/
- Service Actions: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/service_actions/
- Libraries: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/libraries/
- Events: https://success.outsystems.com/documentation/outsystems_developer_cloud/building_apps/about_event_driven_architecture/events_reference/
- Architecture Design Process: https://success.outsystems.com/documentation/outsystems_developer_cloud/app_architecture/architecture_design_process/


## Per-question validation matrix

| Question | Primary official source |
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
