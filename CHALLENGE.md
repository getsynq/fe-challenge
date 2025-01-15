# Wizard Component Optimization Challenge

Hi there, we're excited to see you here. Thank you for taking the time to apply to SYNQ!

The objective of this challenge is to understand your philosophy and approach to solving problems. We're not looking for you to write a lot of code from scratch. We wanted to make this two-way evaluation, so we've extracted a real challenge from our codebase to give you flavour of type of problems we are solving in our day-to-day. Hopefully what follows is something you're excited to solve.

## Background

Our application heavily relies on multi-step workflows. We implemented them as wizards. These wizards manage complex form state, step navigation, and data collection across multiple steps. While our current implementation works, the complexity of setting up new wizards feel too high.

To provide enough context, we've extracted subset of our component library and wizard implementation from SYNQ codebase into a small standalone Remix application.

The technology stack related to the challenge we use is:

- Remix — we use Remix for routing and server-side rendering
- Tailwind — we use Tailwind for styling
- TypeScript — we use TypeScript for type safety and to make it easier to write code
- zod — schema validation library
- conform — form state management library

We provide this codebase to ensure you don't have to spend time setting the environment up and writing a lot of code but we're completely fine for the solution to be ported to any other similar stack which uses modern TypeScript and has SSR (React, Vue, Svelte, etc).

## Current State

Looking at `./app/routes/wizard.tsx` and `./app/components/wizard/wizard.tsx`, we can see we have:

- Complex state management across multiple contexts (WizardContext and WizardDataContext)
- A lot of boilerplate for setting up new wizard workflows
- Coupling between form state management and wizard navigation
- Repetitive patterns in step definitions and form handling

## Challenge

Your task is to optimize and simplify the wizard component to provide the best possible developer experience while maintaining its robust functionality. The goal is to make it easier for
developers to create new wizards without sacrificing features or type safety.

### Objectives

You should optimise your solution for the following objectives:

1. **Easy to use API Surface** — component should be easy to use and understand, have minimal boilerplate and be easy to use with the right default behaviours (with ability to override them).

2. **Improve State Management** — evaluate complexity of state management and what would be the alternatives.

3. **Ensure Type Safety** — ensure type inference works well across the wizard and make it hard to make mistakes when defining new wizards.

4. **Form Integration** — ensure your improvements keep (or improve) the integration with form libraries, make it easier to validate across multiple steps, improve handling of form submission.

### Requirements

You are welcome to change anything in the codebase but we would love to see the following:

- Maintain current functionality (Multi-step navigation, Form state persistence, Conditional paths based on user input, Step validation, Final submission handling)
- Keep or improve type safety
- Support both linear and branching wizard flows
- Maintain good separation of concerns
- Deliver your solution as a PR or fork of this repository with sufficient documentation for us to review your solution and prepare for the interview.

### Evaluation Criteria

Above all we would love to understand the following:

1. How do you approach development of reusable FE components that are easy to use and understand.
2. How do you design layers of abstractions? Where you expose / abstract certain behaviours.
3. How do you maximise type safety and robustness of your code.
4. How do you balance flexibility for different use cases and simplicity of the API.
5. How do you manage state in your components.
6. What is your general approach and philosophy to developing FE systems and codebases.

## Tips

- Think about what frustrated you when working with wizards
- Consider composition over inheritance
- Think about error handling and edge cases
