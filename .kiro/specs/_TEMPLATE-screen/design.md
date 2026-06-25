# Screen: <NAME> — Design

## Structure
<Sketch the component tree, e.g.:>
```
<AppShell>
  <AppBar>            title · ThemeToggle
  <SideNav>           sections...
  <Main>
    <Header>
    <MessageList>     MessageTurn[] · StreamingText · CitationCard
    <Composer>        AgentStatus · PromptInput · SuggestionChips
```

## Layout
- Grid: <which breakpoints collapse what; max content width 1440 at 2xl>.
- Density: <comfortable default; compact for any dense list>.

## Behavior
- <Streaming: append into one live region; reveal on completion.>
- <HITL: surface HumanInLoopCard when the agent needs approval.>
- <Empty/error/loading transitions and their copy.>

## Out of scope
New components, new tokens, bespoke styling. If needed, send back to p0-components.
