const { gql } = require('apollo-server-express');

// Definición del esquema
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    done: Boolean!
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, done: Boolean!): Task
    updateTask(id: ID!, title: String, description: String, done: Boolean): Task
    deleteTask(id: ID!): Task
  }
`;

let tasks = [
  { id: '1', title: 'Tarea 1', description: 'Realizar api graphql inten1', done: false },
  { id: '2', title: 'Tarea 2', description: 'Realizar api graphql inten15', done: false }
];

// Definición de los resolvers
const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (parent, args) => tasks.find(task => task.id === args.id),
  },
  Mutation: {
    createTask: (parent, args) => {
      const newTask = { id: `${tasks.length + 1}`, ...args };
      tasks.push(newTask);
      return newTask;
    },
    updateTask: (parent, args) => {
      const task = tasks.find(task => task.id === args.id);
      if (!task) throw new Error('Task not found');
      Object.assign(task, args);
      return task;
    },
    deleteTask: (parent, args) => {
      const taskIndex = tasks.findIndex(task => task.id === args.id);
      if (taskIndex === -1) throw new Error('Task not found');
      const deletedTask = tasks.splice(taskIndex, 1);
      return deletedTask[0];
    },
  },
};

module.exports = { typeDefs, resolvers };
