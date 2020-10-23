# Labs26 Citrics Front-End Team A

For steps on how to work with this repository [please see here](https://docs.labs.lambdaschool.com/labs-spa-starter/)

# Citrics

You can find the deployed project at [a.citrics.dev](https://a.citrics.dev/).

<p align='center'>
<img width="90%" src='./.github/CitricsEndLabs.gif' alt='Gif moving image of a preview of the citircs website at the end of Labs26'/>
</p>

> A walk through video with audio about each seciton found [on this video](https://youtu.be/zdBlEwy-V3M)

## Contributors

|                                            [Michael Perez](https://github.com/Perezented)                                            |                                         [Toricruz Mendiola](https://github.com/mtoricruz)                                          |
| :----------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|                   [<img src="https://i.ibb.co/JBq28bz/mperez.jpg" width = "135" />](https://github.com/Perezented)                   |                  [<img src="https://i.ibb.co/7yBt5rb/profpic.jpg" width = "200" />](https://github.com/mtoricruz)                  |
|                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Perezented)                        |                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mtoricruz)                       |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/perezenting-michael/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/toricruz-mendiola/) |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![cypress](https://img.shields.io/badge/cypress-%5E4.14.1-orange?style=flat-square)
![aws-amplify](https://img.shields.io/badge/aws--amplify-%5E3.1.1-darkblue?style=flat-square)
![axios](https://img.shields.io/badge/axios-%5E0.19.2-yellow?style=flat-square)
![ant-design](https://img.shields.io/badge/ant--design-%5E4.2.2-red?style=flat-square)
![craco](https://img.shields.io/badge/craco-%5E5.6.4-default?style=flat-square)
![plotly.js](https://img.shields.io/badge/plotly.js-%5E1.54.6-%23e4f5f2?style=flat-square)
![node-sass](https://img.shields.io/badge/node--sass-%5E4.14.1-darkgreen?style=flat-square)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

### How to Work App Locally

- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Front End Repository.
- run: `npm install` to download all dependencies.
- run: `npm start` to start your local development server.

> If using Okta for authentication, the app will need to run locally on port 3000.

### Key Features

- User can search any US city to view a statistical report on it
- User can compare up to 3 cities with preferred attributes (rent, job industry, etc.)
- User can Advanced Search based on preferences in Advanced Search form

#### Front end deployed to `AWS Amplify`

#### [Data Science API](https://ds.citrics.dev/) [Backup DS API](https://a-ds.citrics.dev/) built using:

#### Features

- Data pipeline using PostgreSQL via AWS RDS
- Predictive modeling via statsmodels time series analysis
- Visualizations created with Plotly Graph Objects

# Installation Instructions

## Scripts

> Enter `npm command_name` into your terminal to run scripts below

    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory \* eject - copy the configuration files and dependencies into the project so you have full control over them
    * e2e - opens cypress GUI

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## PR Template

Use this PR format as a 'Saved Reply' on Github

```
### Description
<br></br>

### Type of change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or  feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

### Change Status

- [ ] Complete, tested, ready to review and merge
- [ ] Complete, but not tested (may need new tests)
- [ ] Incomplete/work-in-progress, PR is for dicussion/feedback

### Has this Been Tested?

- [ ] Yes
- [ ] No
- [ ] Not Necessaary

### Checklist
- [ ] My code follows the style guidelines of this project
- [ ] At least 1 reviewer (2 person team as of 9/8/2020)
- [ ] I have performed a self-review of my own code
- [ ] My code has been reviewed by at least one peer
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] There are no merge conflicts

```

## Data Science Documentation

See [Backend Documentation](https://ds.citrics.dev/) for details on the backend of our project.

## Bugs/Issues

- Multiple duplicate useEffect calls on most endpoints.
  - This can be visualized by console logging a particular state such as cityData
    - Suspected to be what we have in the useEffect dependency arrays
    - Adding missing dependency items without endless loop
- Creating a separate backend for Front-end team of ALL US city names to prevent immediate crash
  - build a backend where you can call an endpoint to GET city names separate from DS API
    - Add full CRUD ops to endpoint if you plan to add worldwide cities

## Future Improvements

- Sign-up/Log-in capability to save cities
- Display list of cities results from Advanced Search
- Implementing a redux store
- Separate larger SASS files into individual section files
