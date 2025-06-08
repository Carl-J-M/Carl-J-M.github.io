type Article = {
  id?: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  type?: 'internal' | 'external';
  link?: string;
};

type WorkExperience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  description: string;
  highlights: string[];
  technologies?: string[];
};

type SkillsData = {
  technical: {
    [category: string]: string[];
  };
  soft: string[];
};

type Message = {
  from: 'carl' | 'user';
  text: string;
  delay: number;
  type?: 'skill-bubble';
  skills?: string[];
};

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Avatar, Button, Chip, IconButton, Divider } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import SpeedIcon from '@mui/icons-material/Speed';
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import WorkIcon from '@mui/icons-material/Work';
import CircleIcon from '@mui/icons-material/Circle';
import avatar from './assets/avatar.jpg';
import diagramScaleOpinionation from './assets/diagram-scale-opinionation.png';
import diagramScaleOpinionation2 from './assets/diagram-scale-opinionation-2.png';

const initialMessages: Message[] = [
  { from: 'carl', text: "Hey, I'm Carl 👋", delay: 1000 },
  { from: 'carl', text: "I'm a software developer from the UK, actively seeking out new opportunities.", delay: 1500 },
  { from: 'user', text: 'Hey Carl, what do you specialize in?', delay: 2000 },
  { from: 'carl', text: 'I specialize in:', delay: 1000 },
  { 
    from: 'carl', 
    text: 'React, TypeScript, and modern CSS', 
    type: 'skill-bubble',
    skills: ['React', 'Vue', 'Angular', 'TypeScript', 'Storybook', 'SCSS', 'Component Architecture', 'Responsive Design', 'Mobile first design'],
    delay: 1800 
  },
  { from: 'carl', text: 'I love building component systems that scale and delight users.', delay: 1700 },
  { from: 'user', text: 'That sounds great! What kind of projects have you worked on?', delay: 1500 },
  { from: 'carl', text: "I've built hundreds of complex forms and care about user experience. Each project taught me something new about performance, accessibility, and user experience.", delay: 2000 },
  { from: 'carl', text: "Most recently though, I've been working at Etch as a front-end developer, building and maintaing several component libraries and turning Figma prototypes into fully realised journeys.", delay: 2400 },
];

const articleContent = {
  'universal-components': {
    title: "What if components stopped pretending they were universal?",
    date: "March 2024",
    readTime: "8 min read",
    content: (
      <>
        <Typography level="h3" sx={{ mb: 3 }}>
          The Illusion of Universality
        </Typography>

        <Typography level="body-md" sx={{ mb: 2 }}>
          In modern component systems, we're taught to prize DRY reusable code above all else.
        </Typography>

        <Typography level="body-md" sx={{ mb: 2 }}>
          The ideal component, we're told, is flexible, generic, and universally applicable, it's totally context independent and able to be dropped into any layout, any theme, any interaction flow.
        </Typography>

        <Typography level="body-md" sx={{ mb: 2 }}>
          But this ideal often leads us down a path of brittle abstractions and hidden assumptions. Behind the clean surface of a "universal" component lies a tangle of implicit context: layout expectations, accessibility obligations, theming dependencies, and behavioural quirks.
        </Typography>

        <Typography level="body-md" sx={{ mb: 2 }}>
          When those assumptions go unmet, we're left debugging subtle failures that only appear when components are used "incorrectly".
        </Typography>

        <Typography level="body-md" sx={{ mb: 4 }}>
          This is the illusion of universality: the belief that components can work everywhere, when in truth, they were only ever designed to work somewhere, within some unspoken bounded context.
        </Typography>

        <Typography level="h3" sx={{ mb: 3 }}>
          🧩 Bounded Context Components – Compatibility Summary
        </Typography>

        <Typography level="h4" sx={{ mb: 2, color: 'success.600' }}>
          ✅ Core Idea
        </Typography>

        <Typography level="body-md" sx={{ mb: 2 }}>
          Components can belong to <strong>multiple contexts</strong>, each defining a set of behavioural guarantees.
        </Typography>

        <Typography level="body-md" sx={{ mb: 4 }}>
          <strong>Contextual compatibility</strong> becomes a <strong>metric of flexibility and composability</strong>, not just correctness.
        </Typography>

        <Typography level="h4" sx={{ mb: 2 }}>
          🔁 Components & Context Compatibility
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • Components can <strong>declare compatibility</strong> with various contexts.
          </Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • Contexts define <strong>constraints, guarantees, and concerns</strong> (e.g., FormContext, LayoutContext, ThemeContext, TypographicContext).
          </Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • Components adapt behavior based on active context(s).
          </Typography>
        </Box>

        <Typography level="body-sm" sx={{ mb: 2, fontWeight: 'bold' }}>
          Example Compatibility Table
        </Typography>

        <Box sx={{ mb: 4, overflowX: 'auto' }}>
          <Box sx={{ minWidth: 400, border: '1px solid', borderColor: 'divider', borderRadius: 'md', overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', bgcolor: 'neutral.100' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>
                Component
              </Typography>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold' }}>
                Compatible Contexts
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                Button
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Form, Layout, Action
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                Card
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Layout, Theme, Shadow
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                Tooltip
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Interaction, Accessibility
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography level="h4" sx={{ mb: 3 }}>
          📊 Compatibility as a First-Class Metric
        </Typography>

        <Typography level="body-sm" sx={{ mb: 2, fontWeight: 'bold' }}>
          1. Declarative Compatibility
        </Typography>

        <Box sx={{ bgcolor: 'neutral.100', p: 2, borderRadius: 'md', mb: 3 }}>
          <Typography level="body-sm" sx={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
{`Button.compatibility = {
  FormContext: 'full',
  LayoutContext: 'partial',
  PresentationalContext: 'none'
};`}
          </Typography>
        </Box>

        <Typography level="body-sm" sx={{ mb: 2, fontWeight: 'bold' }}>
          2. Context-Aware Linting
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          <strong>Example warning:</strong> "&lt;Tooltip&gt; used in &lt;FormContext&gt; without a focusable trigger."
        </Typography>

        <Typography level="body-sm" sx={{ mb: 2, fontWeight: 'bold' }}>
          3. Progressive Hardening
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • <strong>Phase 1</strong> → Permissive composition (no enforcement)
          </Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • <strong>Phase 2</strong> → Log actual usage/mismatches for observability
          </Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • <strong>Phase 3</strong> → Require explicit compatibility declarations and tooling support
          </Typography>
        </Box>

        <Typography level="h4" sx={{ mb: 3 }}>
          🧠 Mental Model Shift
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • <strong>Old mindset</strong>: "Can I use this here?"
          </Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>
            • <strong>New mindset</strong>: "What does this component guarantee in this context?"
          </Typography>
        </Box>

        <Typography level="h4" sx={{ mb: 3, color: 'success.600' }}>
          ✅ Benefits
        </Typography>

        <Box sx={{ mb: 4, overflowX: 'auto' }}>
          <Box sx={{ minWidth: 500, border: '1px solid', borderColor: 'divider', borderRadius: 'md', overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', bgcolor: 'neutral.100' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>
                Benefit
              </Typography>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold' }}>
                Description
              </Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                🔄 Reusability
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Adapt components to different use cases without rewriting
              </Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                📋 Auditability
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Understand and visualize where components are safe to use
              </Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                🔐 Behavioral Guarantees
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Improve consistency without rigidity
              </Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '150px 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>
                ⚖️ Flexibility with Control
              </Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>
                Encourage reuse while protecting system integrity
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ bgcolor: 'primary.50', p: 3, borderRadius: 'md', mb: 4 }}>
          <Typography level="body-md">
            💬 It creates a vocabulary for discussing component limitations. Instead of vague warnings like "don't use this here," you get precise statements about context compatibility.
          </Typography>
        </Box>

        <Typography level="body-md" sx={{ mb: 2 }}>
          I see this kinda like <strong>dependency injection for UX/behavior</strong>. By treating contexts like injectable services, you're formalizing the <em>environmental assumptions</em> of components which frees up the components to focus on handling a potential range of states within that boundary, a much more reasonable ask than must work everywhere no matter what.
        </Typography>

        <Typography level="body-md" sx={{ mb: 2 }}>
          We might end up with something like 'Presentational.Image' as a prefixing context boundary, or 'Accessible.Image', which will flag linting errors if the required props aren't present?
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          We could have context wrappers, which components could automatically derive their context from depending on their configuration of props, with a breakout of namespacing that component directly.
        </Typography>

        <Box sx={{ bgcolor: 'neutral.100', p: 2, borderRadius: 'md', mb: 4 }}>
          <Typography level="body-sm" sx={{ fontFamily: 'monospace', whiteSpace: 'pre' }}>
{`<FormContext>
  <Presentation.Image {...imgProps}></Presentation.Image>
  <Tag {...tagProps} for=""></Tag>
  ...
</FormContext>`}
          </Typography>
        </Box>
      </>
    )
  },
  'maintainable-code': {
    title: "Maintainability in UI Design Systems: Scale vs. Opinionation",
    date: "October 2023",
    readTime: "6 min read",
    content: (
      <>
        <Typography level="body-sm" sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary', display: 'block', borderLeft: '3px solid', borderColor: 'primary.300', pl: 2 }}>
          "This is a work-in-progress mental model I've been using to think about component design more clearly. Curious if others have found something similar helpful — or see flaws I haven't."
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          Maintainability isn't a single axis—it's a balance between <strong>context independence</strong>, <strong>composability</strong>, and <strong>cognitive load</strong>. But there's another key dimension that influences maintainability and usability in component libraries:
        </Typography>

        <Box 
          component="img" 
          src={diagramScaleOpinionation} 
          alt="Scale vs Opinionation - Overlapping circles"
          sx={{ width: '100%', mb: 3, borderRadius: 'md' }}
          onError={(e) => {
            // Hide broken images gracefully
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />

        <Typography level="body-sm" sx={{ mb: 3, fontStyle: 'italic', textAlign: 'center', color: 'text.secondary' }}>
          The relationship between a component's scale and its level of opinionation.
        </Typography>

        <Box 
          component="img" 
          src={diagramScaleOpinionation2} 
          alt="Scale vs Opinionation - Stepped layout"
          sx={{ width: '100%', mb: 3, borderRadius: 'md' }}
          onError={(e) => {
            // Hide broken images gracefully
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />

        <Typography level="body-md" sx={{ mb: 4 }}>
          If you were to plot all of the components in your design system on this chart, anything which falls into the overlapping areas is likely to be bending the rules in a way that causes significant maintenance overhead when changes are required as the design system progresses through its lifecycle.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          ⚖️ Scale vs. Opinionation Matrix
        </Typography>

        <Box sx={{ overflowX: 'auto', mb: 4 }}>
          <Box sx={{ minWidth: 600, border: '1px solid', borderColor: 'divider', borderRadius: 'md', overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', bgcolor: 'neutral.100' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Scale</Typography>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Focus</Typography>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Opinionation</Typography>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold' }}>Design Strategy</Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Atomic</Typography>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>Broad <em>coverage</em> for use cases</Typography>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>🔹 Very low</Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>Unopinionated and flexible — think buttons, icons, checkboxes.</Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Composed</Typography>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}><em>Context independence</em> within a known pattern</Typography>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>🔸 Medium</Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>Slightly opinionated — structured enough to be useful, flexible enough to be reused.</Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Templates</Typography>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}><em>Business logic & flow</em> for a specific feature</Typography>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>🔴 High</Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>Highly opinionated — intended for direct use in a specific context.</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Atomic components</strong> prioritize <strong>context independence</strong> and reduce <strong>cognitive load</strong>.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Composed components</strong> offer a trade-off between <strong>composability</strong> and <strong>independence</strong>.</Typography>
          <Typography level="body-md">• <strong>Templates</strong> focus on <strong>composability</strong>, but with greater <strong>cognitive overhead</strong> and reduced flexibility.</Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          💡 Design Guidelines
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 2 }}>
            🔹 <strong>Atomic components</strong> (e.g. <code>adm-btn</code>, <code>adm-icon</code>):
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Should cover many use cases</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Avoid assumptions about layout, size, or semantics</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Be extremely reusable</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 2 }}>
            🔸 <strong>Composed components</strong> (e.g. <code>adm-form-input</code>):
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Wrap atomic components into a useful pattern</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Have sensible defaults, but allow overrides</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Prioritize context independence for reuse in various flows</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="body-md" sx={{ mb: 2 }}>
            🔴 <strong>Templates</strong> (e.g. <code>user-registration-form</code>, <code>vehicle-risk-step</code>):
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Wire up multiple compositions into a single task-oriented unit</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Highly specific to a domain or flow</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Should favor clarity and maintainability over generalization</Typography>
          </Box>
        </Box>

        <Typography level="h3" sx={{ mb: 3 }}>
          💥 When to Break the Rules
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          While staying within the ideal zones of the scale/opinionation matrix encourages consistency, reusability, and maintainability, real-world product development often demands flexibility. There are valid reasons to break the rules — but it's important to do so <em>intentionally</em> and with an understanding of the tradeoffs.
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          Here's how bending the rules in each quadrant impacts your architecture:
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            🔹 Bottom Left: <em>Ultra-Generic Atomic Components</em>
          </Typography>
          
          <Typography level="body-md" sx={{ mb: 2 }}>
            <strong>Breaking the Rule</strong>: Adding slight opinionation (e.g., default styles, layout behavior)
          </Typography>

          <Typography level="body-md" sx={{ mb: 1 }}>
            <strong>When it's worth it</strong>:
          </Typography>
          <Box sx={{ pl: 3, mb: 2 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• When the component is used frequently enough to justify a convenience default</Typography>
            <Typography level="body-md">• To improve dev experience by reducing boilerplate for 80% of cases</Typography>
          </Box>

          <Typography level="body-md" sx={{ mb: 1 }}>
            <strong>Tradeoffs</strong>:
          </Typography>
          <Box sx={{ pl: 3, mb: 2 }}>
            <Typography level="body-md">• May unintentionally encode design assumptions that don't scale</Typography>
          </Box>

          <Typography level="body-md" sx={{ mb: 1 }}>
            <strong>Mitigation</strong>:
          </Typography>
          <Box sx={{ pl: 3, mb: 2 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Ensure overrides are easy and documented</Typography>
            <Typography level="body-md">• Keep defaults minimal and opt-in where possible</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          🌀 Long-Term Strategy
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Start unopinionated and context-independent.</strong> Early utilities should prioritize flexibility.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Let patterns emerge.</strong> As usage grows, refactor common combinations into composed components.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Build templates last.</strong> Only once needs are clear should highly opinionated templates emerge.</Typography>
        </Box>

        <Box sx={{ bgcolor: 'primary.50', p: 3, borderRadius: 'md', mb: 4 }}>
          <Typography level="body-md" sx={{ fontStyle: 'italic' }}>
            Some technical debt is just deferred decision-making. Let the usage surface show you where opinionation is truly needed.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          ✅ Summary
        </Typography>

        <Box>
          <Typography level="body-md" sx={{ mb: 1 }}>• Maintainability is a moving target—flexibility now enables better abstractions later.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• Don't over-engineer early. Keep atomic components lean and adaptable.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• Scale opinionation with component scope: <strong>small = flexible</strong>, <strong>large = opinionated</strong>.</Typography>
          <Typography level="body-md">• Use this model as a guidepost, not a hard rule. Design for the team that's maintaining the code next.</Typography>
        </Box>
      </>
    )
  },
  'generative-design-system': {
    title: "The Generative Design System: Why AI Should Learn Your Patterns, Not Follow Your Rules",
    date: "June 2025",
    readTime: "7 min read",
    content: (
      <>
        <Typography level="body-sm" sx={{ mb: 3, fontStyle: 'italic', color: 'text.secondary', display: 'block', borderLeft: '3px solid', borderColor: 'primary.300', pl: 2 }}>
          "Stop enforcing consistency manually. Start teaching it through examples. This is my framework for thinking about exemplar-driven architecture and self-improving design systems."
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          Traditional design systems are rigid, rule-bound, and manually enforced. But what if consistency wasn't enforced — but <strong>learned</strong>? This approach introduces a <strong>virtuous cycle of architectural refinement</strong>:
        </Typography>

        <Box sx={{ 
          bgcolor: 'neutral.50', 
          p: 3, 
          borderRadius: 'md', 
          mb: 4,
          fontFamily: 'monospace',
          fontSize: 'sm',
          textAlign: 'center'
        }}>
          Human creates exemplar → AI generates variants → Human refines → AI learns patterns → Better generation
        </Box>

        <Typography level="body-md" sx={{ mb: 4 }}>
          Where traditional design systems become brittle and bloated over time, a generative design system <strong>gets smarter</strong> — improving with every use, rather than decaying under complexity.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          🏗️ Core Components
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            1. The Exemplar Layer (Human-Crafted)
          </Typography>
          
          <Typography level="body-md" sx={{ mb: 3 }}>
            A curated "kitchen sink" file like <code>ArticleExemplar.tsx</code> serves as the architectural north star:
          </Typography>

          <Box sx={{ 
            bgcolor: 'neutral.50', 
            p: 3, 
            borderRadius: 'md', 
            mb: 3,
            fontFamily: 'monospace',
            fontSize: 'sm'
          }}>
            ArticleExemplar.tsx<br/>
            ├── Hero variations<br/>
            ├── Content block patterns<br/>
            ├── Sidebar configurations<br/>
            ├── Footer arrangements<br/>
            ├── Interactive elements<br/>
            └── Edge case handling
          </Box>

          <Typography level="body-md" sx={{ mb: 3 }}>
            It demonstrates every intended composition, from typical use cases to stylistic and structural edge cases.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            2. The Generation Layer (AI-Driven)
          </Typography>
          
          <Typography level="body-md" sx={{ mb: 2 }}>
            This layer references the exemplar to:
          </Typography>
          
          <Box sx={{ pl: 3, mb: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Generate structurally coherent variants</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Maintain architectural consistency</Typography>
            <Typography level="body-md">• Learn from human adjustments and corrections</Typography>
          </Box>

          <Typography level="body-md" sx={{ mb: 3 }}>
            Over time, the AI begins to predict and respect your team's idioms and stack-specific preferences.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            3. The Content Layer (Data-Driven)
          </Typography>
          
          <Typography level="body-md" sx={{ mb: 2 }}>
            Content — whether structured (JSON), semi-structured (markdown), or freeform (text) — flows into the system and is formatted according to learned patterns. The result:
          </Typography>
          
          <Box sx={{ pl: 3, mb: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Style is preserved</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Semantics are respected</Typography>
            <Typography level="body-md">• Compositional integrity is maintained</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          🔄 The Self-Improving Mechanism
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          Every generation-refinement cycle teaches the system something new:
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Stack-Specific Quirks</strong>: It learns how your particular frontend stack behaves in real usage.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Edge Cases</strong>: It adapts to unusual, valid combinations you surface through exemplars.</Typography>
          <Typography level="body-md" sx={{ mb: 1 }}>• <strong>Team Aesthetic</strong>: It internalizes visual and structural preferences specific to your team or product.</Typography>
          <Typography level="body-md">• <strong>Performance Patterns</strong>: It starts to understand what renders well and what doesn't — in real-world scenarios.</Typography>
        </Box>

        <Typography level="body-md" sx={{ mb: 4 }}>
          This feedback loop allows the system to grow <em>with</em> your codebase.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          💡 Why It Matters
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 2 }}>
            ⚡ <strong>Lower Cognitive Load</strong>:
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Developers learn by reading rich, concrete exemplars — not abstract API docs</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• New contributors can follow realistic compositions instead of deciphering configuration</Typography>
            <Typography level="body-md">• Component usage becomes obvious in context</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ mb: 2 }}>
            🔄 <strong>Built-in Consistency</strong>:
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Instead of enforcing rules manually, patterns are learned and reproduced automatically</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Generated variants stay architecturally coherent — no lint rules required</Typography>
            <Typography level="body-md">• Quality improves over time with minimal governance</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="body-md" sx={{ mb: 2 }}>
            📈 <strong>Scalable by Default</strong>:
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• New content types follow established, exemplar-based patterns</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• AI handles the boring, repetitive parts of system enforcement</Typography>
            <Typography level="body-md">• Developers focus on higher-leverage architectural decisions</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          🛠️ Implementation Considerations
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            Exemplar Design
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Must include all intended patterns and realistic usage</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Should include known edge cases and error states</Typography>
            <Typography level="body-md">• Needs to balance completeness with maintainability</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            Training Data Quality
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• Exemplars become the <strong>source of truth</strong> for architectural rules</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Every human refinement expands the system's internal dataset</Typography>
            <Typography level="body-md">• Poor-quality exemplars produce weak generation — garbage in, garbage out</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography level="h4" sx={{ mb: 2 }}>
            Guardrails and Boundaries
          </Typography>
          <Box sx={{ pl: 3 }}>
            <Typography level="body-md" sx={{ mb: 1 }}>• AI is scoped to compositional rules, not creative control</Typography>
            <Typography level="body-md" sx={{ mb: 1 }}>• Humans remain in charge of structure and semantics</Typography>
            <Typography level="body-md">• Boundaries prevent overgeneralization or pattern drift</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          🚀 The Long-Term Vision
        </Typography>

        <Typography level="body-md" sx={{ mb: 3 }}>
          This approach reframes frontend development:
        </Typography>

        <Box sx={{ overflowX: 'auto', mb: 4 }}>
          <Box sx={{ minWidth: 500, border: '1px solid', borderColor: 'divider', borderRadius: 'md', overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', bgcolor: 'neutral.100' }}>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Traditional</Typography>
              <Typography level="body-sm" sx={{ p: 2, fontWeight: 'bold' }}>Generative</Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>Manual consistency</Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>Learned pattern recognition</Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>Rigid component libraries</Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>Adaptive compositional systems</Typography>
            </Box>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography level="body-sm" sx={{ p: 2, borderRight: '1px solid', borderColor: 'divider' }}>Abstract rules</Typography>
              <Typography level="body-sm" sx={{ p: 2 }}>Concrete example learning</Typography>
            </Box>
          </Box>
        </Box>

        <Typography level="body-md" sx={{ mb: 4 }}>
          Instead of becoming brittle and bloated over time, the design system <strong>gets smarter</strong> — improving with every use, rather than decaying under complexity.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography level="h3" sx={{ mb: 3 }}>
          ✅ TL;DR
        </Typography>

        <Box sx={{ bgcolor: 'primary.50', p: 3, borderRadius: 'md', mb: 4 }}>
          <Typography level="body-md" sx={{ fontWeight: 'bold', mb: 2 }}>
            You don't enforce rules. You demonstrate patterns. The system learns.
          </Typography>
          <Typography level="body-md" sx={{ fontStyle: 'italic' }}>
            This is what happens when you treat your design system not as a rulebook — but as training data.
          </Typography>
        </Box>
      </>
    )
  }
};

// Fixed articles array - ensure all articles have consistent properties
const articles: Article[] = [
  {
  id: 'generative-design-system',
  title: "The Generative Design System: Why AI Should Learn Your Patterns, Not Follow Your Rules",
  description: "Stop enforcing consistency manually. Start teaching it through examples. How exemplar-driven architecture creates self-improving design systems.",
  date: "June 2025",
  readTime: "7 min read",
  type: 'internal'
  },
  {
    id: 'universal-components',
    title: "What if components stopped pretending they were universal?",
    description: "The illusion of the universal component, my hot take on the future of component libraries.",
    date: "March 2024",
    readTime: "8 min read",
    type: 'internal'
  },
  {
    id: 'maintainable-code',
    title: "What Makes Code Maintainable",
    description: "Maintainability in UI Design Systems: Scale vs. Opinionation",
    date: "October 2023",
    readTime: "6 min read",
    type: 'internal'
  },
  {
    id: 'tetris-demo',
    title: "Codepen Tetris demo",
    description: "Fun challenge to build playable tetris inside codpen.",
    date: "December 2023",
    readTime: "",
    link: "https://codepen.io/carl-j-m/pen/VYZxpWW",
    type: 'external'
  },
  {
    id: 'physics-demo',
    title: "Codepen physics demo",
    description: "Another game experiment, this time with physics.",
    date: "January 2024",
    readTime: "",
    link: "https://codepen.io/carl-j-m/pen/MYgVzKG",
    type: 'external'
  }
];

const workExperience: WorkExperience[] = [
  {
    company: "Etch",
    role: "Frontend Developer",
    period: "2022 - Present",
    description: "Building and maintaining component libraries, transforming Figma designs into production-ready code.",
    highlights: [
      "Developed reusable component systems used across multiple projects",
      "Collaborated with designers to ensure pixel-perfect implementations",
      "Improved build times by 40% through optimization strategies",
      "Mentored junior developers on React best practices"
    ]
  },
  {
    company: "Previous Company",
    role: "UI Developer",
    period: "2020 - 2022",
    description: "Focused on creating responsive, accessible web applications for e-commerce platforms.",
    highlights: [
      "Built custom checkout flows that increased conversion by 25%",
      "Implemented A/B testing framework for UI experiments",
      "Led migration from legacy jQuery to modern React architecture",
      "Established coding standards and review processes"
    ]
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2018 - 2020",
    description: "Worked with various clients to deliver custom web solutions and user interfaces.",
    highlights: [
      "Delivered 15+ projects on time and within budget",
      "Specialized in responsive design and performance optimization",
      "Built relationships with clients leading to repeat business",
      "Managed full project lifecycle from concept to deployment"
    ]
  }
];

const quickActions = [
  { label: 'View Projects', icon: <CodeIcon />, id: 'projects' },
  { label: 'Skills', icon: <BrushIcon />, id: 'skills' },
  { label: 'Work Experience', icon: <SpeedIcon />, id: 'experience' },
];

function App() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [activeContent, setActiveContent] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Data loading states
  const [articlesData, setArticlesData] = useState<Article[] | null>(null);
  const [experienceData, setExperienceData] = useState<WorkExperience[] | null>(null);
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  useEffect(() => {
    const timeoutIds: number[] = [];
    let cumulativeDelay = 0;

    initialMessages.forEach((message, index) => {
      cumulativeDelay += message.delay;
      
      // Show typing indicator before Carl's messages
      if (message.from === 'carl' && index > 0) {
        const typingTimeoutId = setTimeout(() => {
          setIsTyping(true);
        }, cumulativeDelay - 500);
        timeoutIds.push(typingTimeoutId);
      }

      // Show the actual message
      const messageTimeoutId = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((msgs) => [...msgs, message]);
        
        // Show quick actions after all messages
        if (index === initialMessages.length - 1) {
          setTimeout(() => setShowQuickActions(true), 500);
        }
      }, cumulativeDelay);
      
      timeoutIds.push(messageTimeoutId);
    });

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  // Simulate data fetching when content changes
  useEffect(() => {
    if (activeContent !== 'chat') {
      setIsLoading(true);
      
      // Simulate network delay
      const loadTimer = setTimeout(() => {
        if (activeContent === 'projects') {
          setArticlesData([...articles]);
        } else if (activeContent === 'experience') {
          setExperienceData(workExperience);
        } else if (activeContent === 'skills') {
          setSkillsData({
            technical: {
              'Frontend Frameworks': ['React', 'Vue', 'Angular', 'Next.js'],
              'Languages': ['TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'],
              'Styling': ['SCSS', 'CSS-in-JS', 'Tailwind', 'Material-UI'],
              'Tools & Testing': ['Storybook', 'Jest', 'Cypress', 'Webpack', 'Vite'],
              'Concepts': ['Component Architecture', 'Responsive Design', 'Accessibility', 'Performance Optimization']
            },
            soft: ['Lifelong learner', 'Systems thinker', 'Technical writing', 'Active listening', 'Mentoring', 'Cross-functional collaboration']
          });
        }
        setIsLoading(false);
      }, 600);
      
      return () => clearTimeout(loadTimer);
    }
  }, [activeContent]);

  const handleActionClick = (actionId: string) => {
    setActiveContent(actionId);
  };

  // Fixed handleArticleClick with proper type safety
  const handleArticleClick = (article: Article) => {
    if (article.type === 'internal' && article.id) {
      setCurrentArticle(article.id);
      setActiveContent('article');
    } else if (article.type === 'external' && article.link) {
      window.open(article.link, '_blank');
    }
  };

  const getHeaderTitle = () => {
    switch(activeContent) {
      case 'projects': return 'My Articles & Demos';
      case 'skills': return 'Skills';
      case 'experience': return 'Work Experience';
      case 'article': return currentArticle && articleContent[currentArticle as keyof typeof articleContent]?.title || 'Article';
      default: return null;
    }
  };

  // Loading component
  const LoadingContent = ({ text }: { text: string }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          // border: '3px solid',
          borderColor: 'primary.200',
          // borderTopColor: 'primary.500',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            to: { transform: 'rotate(360deg)' }
          }
        }}
      />
      <Typography level="body-lg" sx={{ color: 'text.secondary' }}>
        {text}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100vw'},
        height: { xs: '100vh'},
        maxHeight: { xs: 'none' },
        bgcolor: 'background.surface',
        borderRadius: { xs: 0},
        boxShadow: { xs: 'none'},
        overflow: 'hidden',
        mx: { xs: 0 },
        my: { xs: 0 },
        display: 'flex',
        flexDirection: 'column',
        border: { xs: 'none', xl: '1px inset silver' },
        borderColor: 'divider',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 2,
          px: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: 'sm',
          position: 'relative',
          minHeight: 64,
        }}
      >
        {activeContent !== 'chat' && (
          <IconButton
            onClick={() => {
              if (activeContent === 'article') {
                setActiveContent('projects');
                setCurrentArticle(null);
              } else {
                setActiveContent('chat');
              }
            }}
            sx={{
              position: 'absolute',
              left: 12,
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}
        
        {activeContent === 'chat' ? (
          <>
            <Box sx={{ position: 'relative' }}>
              <Avatar 
                alt='Carl Mensah'
                src={avatar}
              >
                C
              </Avatar>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  bgcolor: '#4caf50',
                  borderRadius: '50%',
                  border: '2px solid white',
                }}
              />
            </Box>
            <Box>
              <Typography level="title-md" sx={{ color: 'white', fontWeight: 600 }}>
                Carl Mensah
              </Typography>
              <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Frontend Developer • Available
              </Typography>
            </Box>
          </>
        ) : (
          <Typography level="title-lg" sx={{ color: 'white', fontWeight: 600, mx: 'auto' }}>
            {getHeaderTitle()}
          </Typography>
        )}
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.level1',
        }}
      >
        {activeContent === 'chat' && (
          <>
            {/* Messages Area */}
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                px: 2,
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                gap: 1.5,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'neutral.300',
                  borderRadius: '3px',
                },
              }}
            >
              {visibleMessages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                    animation: 'slideIn 0.3s ease-out',
                    '@keyframes slideIn': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(10px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  {msg.type === 'skill-bubble' ? (
                    <Box
                      sx={{
                        maxWidth: '85%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.8,
                        px: 2,
                        py: 1,
                        borderRadius: '16px',
                        bgcolor: 'primary.50',
                      }}
                    >
                      {msg.skills?.map((skill, idx) => (
                        <Chip
                          key={idx}
                          size="sm"
                          variant="soft"
                          color="primary"
                          sx={{
                            fontWeight: 500,
                            borderRadius: 'sm',
                          }}
                        >
                          {skill}
                        </Chip>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        maxWidth: '75%',
                        px: 2.5,
                        py: 1.5,
                        borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        bgcolor: msg.from === 'user' ? 'primary.500' : 'background.surface',
                        color: msg.from === 'user' ? 'white' : 'text.primary',
                        boxShadow: 'sm',
                        border: msg.from === 'carl' ? '1px solid' : 'none',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography 
                        level="body-sm" 
                        sx={{ 
                          lineHeight: 1.5,
                          color: msg.from === 'user' ? 'white' : 'text.primary',
                        }}
                      >
                        {msg.text}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
              
              {isTyping && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 2.5,
                    py: 1.5,
                    bgcolor: 'background.surface',
                    borderRadius: '18px 18px 18px 4px',
                    width: 'fit-content',
                    boxShadow: 'sm',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.3 }}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'neutral.400',
                          animation: `typing 1.4s ease-in-out ${i * 0.2}s infinite`,
                          '@keyframes typing': {
                            '0%, 60%, 100%': {
                              transform: 'translateY(0)',
                              opacity: 0.7,
                            },
                            '30%': {
                              transform: 'translateY(-10px)',
                              opacity: 1,
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Quick Actions */}
            {showQuickActions && (
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.surface',
                  display: 'flex',
                  gap: 1,
                  overflowX: 'auto',
                  flexShrink: 0,
                  '&::-webkit-scrollbar': { display: 'none' },
                  animation: 'fadeIn 0.5s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                  },
                }}
              >
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    size="sm"
                    startDecorator={action.icon}
                    onClick={() => handleActionClick(action.id)}
                    sx={{
                      borderRadius: 'xl',
                      whiteSpace: 'nowrap',
                      fontSize: 'xs',
                      py: 0.5,
                      px: 2,
                      minHeight: 32,
                      '&:hover': {
                        bgcolor: 'primary.50',
                        borderColor: 'primary.300',
                      },
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Input Area */}
            <Box
              sx={{
                px: 2,
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'background.surface',
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  bgcolor: 'background.level1',
                  borderRadius: 'xl',
                  px: 2.5,
                  py: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.300',
                    bgcolor: 'background.surface',
                  },
                }}
              >
                <Typography 
                  level="body-sm" 
                  sx={{ 
                    color: 'text.tertiary',
                    fontWeight: 400,
                  }}
                >
                  Email Carl
                </Typography>
              </Box>
              <Button 
                variant="solid" 
                color="primary"
                size="md"
                sx={{
                  borderRadius: '50%',
                  minWidth: 44,
                  height: 44,
                  p: 0,
                  boxShadow: 'sm',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 'md',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <SendIcon sx={{ fontSize: 20 }} />
              </Button>
            </Box>
          </>
        )}

        {activeContent === 'projects' && (
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'neutral.300',
                borderRadius: '3px',
              },
            }}
          >
            {isLoading ? (
              <LoadingContent text="Loading articles..." />
            ) : (
              articlesData?.map((article, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleArticleClick(article)}
                  sx={{
                    bgcolor: 'background.surface',
                    borderRadius: 'lg',
                    p: 2.5,
                    boxShadow: 'sm',
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    animation: 'fadeIn 0.4s ease-out',
                    animationDelay: `${idx * 0.1}s`,
                    animationFillMode: 'both',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    },
                    '&:hover': {
                      boxShadow: 'md',
                      borderColor: 'primary.300',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <ArticleIcon 
                      sx={{ 
                        color: 'primary.500',
                        fontSize: 24,
                        mt: 0.5,
                      }} 
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography level="title-md" sx={{ mb: 0.5 }}>
                        {article.title}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 1 }}>
                        {article.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                          {article.date}
                        </Typography>
                        {article.readTime && (
                          <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                            {article.readTime}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <OpenInNewIcon 
                      sx={{ 
                        fontSize: 16, 
                        color: 'text.tertiary',
                        mt: 0.5,
                      }} 
                    />
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}

        {activeContent === 'article' && currentArticle && articleContent[currentArticle as keyof typeof articleContent] && (
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 3 },
              maxWidth: 800,
              mx: 'auto',
              width: '100%',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'neutral.300',
                borderRadius: '3px',
              },
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography level="body-sm" sx={{ color: 'text.tertiary', mb: 1 }}>
                {articleContent[currentArticle as keyof typeof articleContent].date} · {articleContent[currentArticle as keyof typeof articleContent].readTime}
              </Typography>
            </Box>
            
            {articleContent[currentArticle as keyof typeof articleContent].content}
          </Box>
        )}

        {activeContent === 'skills' && (
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'neutral.300',
                borderRadius: '3px',
              },
            }}
          >
            {isLoading ? (
              <LoadingContent text="Loading skills..." />
            ) : skillsData && (
              <>
                <Box>
                  <Typography level="title-lg" sx={{ mb: 3, fontWeight: 600 }}>
                    Technical Skills
                  </Typography>
                  {Object.entries(skillsData.technical).map(([category, skills], catIdx) => (
                    <Box 
                      key={category} 
                      sx={{ 
                        mb: 3,
                        animation: 'fadeIn 0.4s ease-out',
                        animationDelay: `${catIdx * 0.1}s`,
                        animationFillMode: 'both',
                        '@keyframes fadeIn': {
                          from: { opacity: 0, transform: 'translateY(10px)' },
                          to: { opacity: 1, transform: 'translateY(0)' }
                        },
                      }}
                    >
                      <Typography level="title-sm" sx={{ mb: 1.5, color: 'text.secondary' }}>
                        {category}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1,
                        }}
                      >
                        {skills.map((skill, idx) => (
                          <Chip
                            key={idx}
                            size="md"
                            variant="soft"
                            color="primary"
                            sx={{
                              fontWeight: 500,
                            }}
                          >
                            {skill}
                          </Chip>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    animation: 'fadeIn 0.4s ease-out',
                    animationDelay: '0.5s',
                    animationFillMode: 'both',
                  }}
                >
                  <Typography level="title-lg" sx={{ mb: 2, fontWeight: 600 }}>
                    Soft Skills
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    {skillsData.soft.map((skill, idx) => (
                      <Chip
                        key={idx}
                        size="md"
                        variant="soft"
                        color="neutral"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}

        {activeContent === 'experience' && (
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                bgcolor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'neutral.300',
                borderRadius: '3px',
              },
            }}
          >
            {isLoading ? (
              <LoadingContent text="Loading experience..." />
            ) : (
              experienceData?.map((job, idx) => (
                <Box
                  key={idx}
                  sx={{
                    bgcolor: 'background.surface',
                    borderRadius: 'lg',
                    p: 2.5,
                    boxShadow: 'sm',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.2s',
                    animation: 'fadeIn 0.4s ease-out',
                    animationDelay: `${idx * 0.1}s`,
                    animationFillMode: 'both',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(10px)' },
                      to: { opacity: 1, transform: 'translateY(0)' }
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <WorkIcon 
                      sx={{ 
                        color: 'primary.500',
                        fontSize: 24,
                        mt: 0.5,
                      }} 
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography level="title-md" sx={{ mb: 0.5 }}>
                        {job.role}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'primary.600', mb: 0.5 }}>
                        {job.company}
                      </Typography>
                      <Typography level="body-xs" sx={{ color: 'text.tertiary', mb: 1.5 }}>
                        {job.period}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 1.5 }}>
                        {job.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {job.highlights.map((highlight, hIdx) => (
                          <Box key={hIdx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <CircleIcon sx={{ fontSize: 6, color: 'primary.400', mt: 0.7 }} />
                            <Typography level="body-xs" sx={{ color: 'text.primary', flex: 1 }}>
                              {highlight}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;