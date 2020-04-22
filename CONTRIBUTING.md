# Contributing

### Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

- [Code of Conduct](#code-of-conduct)
- [Installation](#installation)

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

[Style Guidelines](#style-guidelines)

- [Git Commit Messages](#git-commit-messages)
- [Code Format](#code-format)
- [Documentation](#documentation)

[Additional Stuff](#additional-stuff)

- [Tests](#tests)

## What should I know before I get started?

### Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

Please report unacceptable behavior to [opensource@lftechnology.com](mailto:opensource@lftechnology.com).

### Installation

To setup bulletin-board on your machine go through the [installation guide](INSTALL.md).

## How Can I Contribute?

### Reporting Bugs

Please make sure you go through the [issues](https://github.com/leapfrogtechnology/bulletin-board/issues) and [pull requests](https://github.com/leapfrogtechnology/bulletin-board/pulls) before reporting a bug. There could be a chance that someone might already have reported a bug. When you are creating a bug report, please include as many details as possible.

Explain the problem and include additional details to help maintainers reproduce the problem.

### Feature Requests

If you have any suggestions or new feature requests, create an [issue](https://github.com/leapfrogtechnology/bulletin-board/issues/new). Try to explain why the feature is important and how it helps.

## Style Guidelines

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move file to..." not "Moves file to...")

### Code Format

**Be Consistent.** If you're writing/editing code, take a few minutes to look at the code around you and determine it's style. If the code use spaces around if clauses, you should too. If the comments have little boxes of stars around them, make your comments have little boxes of stars around them too.

If the code you add to a file looks drastically different from the existing code around it, it throws readers out of their rhythm when they to read it.

We suggest you to `yarn lint:fix` your code before commit. This command will try to fix common linter issues automatically.

Here are some linting rules we enforce for [APP](app/.eslintrc) and [API](api/.eslintrc) .

### Documentation

Make sure you properly document the code you've written. For more information on how to properly document your code click [here](http://usejsdoc.org/about-getting-started.html).

Example:

```js
/**
 * Hit the twilio API to send notifications.
 *
 * @param {Object} payload
 * @returns {Promise}
 */
function sendNotification(payload) {
  return twilioClient.sendMessage(payload);
}
```

## Additional Stuff

### Tests

We recommend you to write tests for any changes you've made. If you are not good at writing tests feel free to start a discussion. We will be happy to help.

## License

Licensed under [The MIT License](LICENSE).
