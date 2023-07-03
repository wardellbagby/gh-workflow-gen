# GitHub Workflow Generator

Declare your GitHub Workflows in TypeScript or JavaScript instead of YAML!

[![npm (scoped)](https://img.shields.io/npm/v/@wardellbagby/gh-workflow-gen?style=for-the-badge)](https://www.npmjs.com/package/@wardellbagby/gh-workflow-gen)
[![GitHub](https://img.shields.io/github/license/wardellbagby/gh-workflow-gen?style=for-the-badge)](https://github.com/wardellbagby/gh-workflow-gen/blob/main/LICENSE.md)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/wardellbagby/gh-workflow-gen/Run-all-tests.yml?branch=main&style=for-the-badge)](https://github.com/wardellbagby/gh-workflow-gen/actions?query=workflow%3A%22Run+all+tests%22)

## What is it?

Github Workflow Generator is a library that enables you to write templates for your GitHub Workflows in JavaScript or Typescript and use that code to generate valid GitHub Workflows as YAML files.  

Admittedly, that's a long and complex sentence, so let's show a quick example instead:

```typescript
const workflow: Workflow = {
  name: "Simple Workflow",
  on: {
    push: {},
  },
  jobs: {
    echo: {
      name: "Echo",
      "runs-on": "macos-10.15",
      steps: [
        {
          name: "Echoing!",
          run: 'echo "Hello World!"',
        },
      ],
    },
  },
};
```

This will generate this Yaml file:

```yaml
name: 'Simple Workflow'
'on':
  push: {}
jobs:
  echo:
    name: 'Echo'
    runs-on: 'macos-10.15'
    steps:
      - name: 'Echoing!'
        run: 'echo "Hello World!"'
```

This Workflow will run on every new push to any branch, with a single job named "Echo" that runs on a macOS 10.15 runner that prints out "Hello World".

## I understand it, but why do I want this library?

If your Workflow is as simple as the Workflow listed above, you likely wouldn't want or need this library. However, if you have multiple Workflows that need to share steps, this library becomes very useful.

Imagine:

```typescript
const basicSetup: Step[] = [
  {
    name: "Checkout project",
    uses: 'actions/checkout@v2',
  },
  {
    name: "Install project dependencies",
    run: "npm ci",
  },
];

const buildAppWorkflow: Workflow = {
  name: "Build The App",
  on: {
    push: {},
  },
  jobs: {
    echo: {
      name: "Build",
      "runs-on": "macos-10.15",
      steps: [
        ...basicSetup,
        {
          name: "Build",
          run: 'npm run build',
        },
      ],
    },
  },
};

const buildLibraryWorkflow: Workflow = {
  name: "Build The Library",
  on: {
    push: {
        branches: ['special-branch']
    },
  },
  jobs: {
    echo: {
      name: "Build",
      "runs-on": "ubuntu-20.04",
      steps: [
        ...basicSetup,
        {
          name: "Build",
          run: 'npm run build-lib',
        },
      ],
    },
  },
};
```

This is only a small taste as well. You can share whole jobs, if needed.

### What's this I hear about easier versioning for my actions? Sounds cool!

Since everything is strongly-typed using TypeScript, you can also enforce that every Workflow uses the same version of your various actions, and update all of your actions at the same time. [See the "using versions" example here.](examples/using%20versions/)


### Any other neat things I can do?

Good question! Since this library doesn't currently exhaustively cover everything you can do in a Workflow, the type system has been purposefully made to be easily extensible, where possible. [Take a look at the "adding or modifying fields" example for how to do that.](examples/adding%20or%20modifying%20fields/)

### You talk a lot about TypeScript, but I prefer JavaScript. Can I still use this library?

Yup! Consider the typings just a bit of syntactical sugar; this library works just fine with pure JavaScript as well.


## So cool! How do I set this up for my project?!

First, let's install it:

```shell
npm install --save-dev @wardellbagby/gh-workflow-gen
```

Next, let's create our first Workflow:

```typescript
import { Workflow } from '@wardellbagby/gh-workflow-gen';

export const myWorkflow: Workflow = {
    // TODO fill this in.
}
```

Now, we need to create a simple script to import these Workflows and write them to a file.

```typescript
import { myWorkflow } from "myWorkflowFile";
import { writeWorkflow } from "@wardellbagby/gh-workflow-gen";

writeWorkflow(myWorkflow);
```

Lastly, we simply run the script you just created in the root of your project folder.

```shell
cd path/to/my/project
node generate_workflows.js
```

This will create the `workflows` directory inside your existing `.github` directory with the generated Workflows saved.

### That setup is...complex. Any other examples?

Yes! This project uses itself, and as a part of its setup, it uses [script created in the last step above](scripts/generate_workflows.ts) and runs as a pre-commit hook using Husky. If you'd like that as an example, [check this out.](.husky/pre-commit)
