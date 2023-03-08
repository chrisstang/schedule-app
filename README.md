# Schedule App

This is a MERN application that allows users to create, edit, and delete schedules, with the post data stored in a MongoDB collection.

## Table of contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Getting started](#getting-started)
- [Questionnaire](#questionnaire)

## Installation

We use NPM for package management in this project.

```bash
$ npm install
```

## Quick start

---

The following script starts the project in the development environment.

```bash
$ npm run dev
```

The following script starts the server environment.

```bash
$ npm run server
```

The following script starts the project in both development and server environment.

```bash
$ npm run dev-all
```

## Getting started

Set up the MongoDB database:

1. Create a MongoDB Atlas account.
2. Create a new database (travel) and collection (schedules).
3. Generate a connection string.
4. Create .env file
5. Insert connection string in .env file

```env
ATLAS_URI={Your_MongoDB_connection_string}
```

## Questionnaire

All questionnaire questions and answer can be found inside `questionnaire` folder, with respective filename as section.
