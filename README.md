# WHAT 
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
[![Github Issues](https://img.shields.io/github/issues/ita-social-projects/what-front?style=flat-square)](https://github.com/ita-social-projects/what-front/issues)
[![Pending Pull-Requests](https://img.shields.io/github/issues-pr/ita-social-projects/what-front?style=flat-square)](https://github.com/ita-social-projects/what-front/pulls)

## 1. About the project
"WHAT" (Who is absent today) is a project for control education process in the training centers. The main purpose is to control the quality of education: attendance, achievement, materials studied, etc.

## 2. Where to find back-end part of the project
Here is the back-end part of our project: _https://github.com/ita-social-projects/what-back_.

---

## Table of Contents

- [Installation](#installation)
  - [Required to install](#Required-to-install)
  - [Clone](#Clone)
  - [Setup](#Setup)
  - [How to run local](#How-to-run-local)
  - [Production](#Production)
- [Documentation](#Documentation)
  - [Git flow](#git-flow)
  - [Issue flow](#issue-flow)
  - [Debugging](#Debugging)
- [Team](#Team)
- [FAQ](#faq)
- [License](#license)

---

## Installation

### Required to install
* NodeJS (14.15.0)

### Clone

- Clone this repo to your local machine using `https://github.com/ita-social-projects/what-front`

### Setup

- install npm packages:
  ```properties
  npm install
  ```
### How to run local

- open terminal
- write to start:
  ```properties
  npm run dev
  ```
- open _http://localhost:8080_ to view it in the browser.

### Production

- To create production build use:
  ```properties
  npm run build
  ```

---

## Documentation

---

### Git flow

> We have **master** , **dev** and **feature** branches.  
>>All **feature** branches must be merged into **[dev](https://github.com/ita-social-projects/what-front/tree/dev)** branch.

![Github flow](https://www.programmersought.com/images/446/b01b2a0649fee64c9ba71fc10a0ef886.png)

#### Step 1

- **Clone dev**
  - Open terminal
  - To clone repo to your local machine write:
    ```
    git clone https://github.com/ita-social-projects/what-front.git
    ```    

- **Create new feature branch**
  - To create new branch write:
    ```
    git branch branch_name
    ```
  - Branch name format: `[surname]-[#issue]-[name_of_issue]`
  - Branch name example: `drozdov-3-project_documentation`

#### Step 2

- Add files to staged 
  - to add all files
    ```
    git add .
    ```
  - to add a specific file
    ```
    git add file_name
    ```
- Add commits to your branch changes
  ```
  add commit -m 'messege'
  ```
- Push new changes to repo
  ```
  git push origin branch_name
  ```

#### Step 3

- Create a new pull request using _<a href="https://github.com/ita-social-projects/what-front/compare/" target="_blank">github.com/ita-social-projects/what-front</a>_.

---

### Issue flow

#### Step 1

- To create new issue go to _[issue](https://github.com/ita-social-projects/what-front/issues)_ and press **New issue** button.
- When creating _[issue](https://github.com/ita-social-projects/what-front/issues)_ you should add name of the issue, description, choose label and project.

#### Step 2

- Choose assignee to issue.
- Move issue on dashboard according to its status.

### Debugging

#### Useful plugins for chrome to debugging 

- _[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)_
- _[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)_

---

## Team

### Front-end development team

[![@so2niko](https://avatars2.githubusercontent.com/u/9075641?s=200&v=4)](https://github.com/so2niko)
[![@archontis-cpu](https://avatars0.githubusercontent.com/u/57407473?s=200&v=4)](https://github.com/archontis-cpu)
[![@Anastasiia0999](https://avatars0.githubusercontent.com/u/55295369?s=200&v=4)](https://github.com/Anastasiia0999)
[![@Icemandov](https://avatars2.githubusercontent.com/u/50587976?s=200&v=4)](https://github.com/Icemandov)
[![@Winchestery](https://avatars1.githubusercontent.com/u/56606870?s=200&v=4)](https://github.com/Winchestery)
[![@MarinaPasternak](https://avatars3.githubusercontent.com/u/31963187?s=200&v=4)](https://github.com/MarinaPasternak)
[![@PavelKundenko](https://avatars1.githubusercontent.com/u/47292994?s=200&v=4)](https://github.com/PavelKundenko)
[![@iklopov](https://avatars3.githubusercontent.com/u/22566554?s=200&v=4)](https://github.com/iklopov)
[![@MozdolevskyiMaksym](https://avatars1.githubusercontent.com/u/72501713?s=200&v=4)](https://github.com/MozdolevskyiMaksym)

---

## FAQ

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.
