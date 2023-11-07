# XState Classy Tools

`xstate-classy` is a fork of `xstate-tools` that brings enhanced support for state machines defined within JavaScript classes, making it more convenient for developers who follow an object-oriented approach to state management. This tool extends the usability of the powerful XState VSCode extension, allowing for the visualization and editing of class-based state machines.

## Features

- **Integration with Class Methods**: Enables state machines to be defined within class methods, specifically through `getMachineConfig`.
- **VSCode Extension Compatibility**: Class-defined state machines are fully compatible with the visualization and linting features of the XState VSCode extension.

## Usage

Define your state machines within a class using `getMachineConfig`. The XState VSCode extension will automatically recognize these machines for visualization and simulation.

## Example

```ts
// Simplified example of a state machine class using xstate-classy
export class UserStateMachine {
  // Other class properties and methods

  private getMachineConfig() {
    // Return the state machine configuration
    return {
      id: 'user',
      initial: 'inactive',
      states: {
        inactive: { on: { ACTIVATE: 'active' } },
        active: { on: { DEACTIVATE: 'inactive' } },
      },
    };
  }
}
```
