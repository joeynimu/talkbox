import faker from "faker";

export const data = Array.from({ length: 50 }).map(() => ({
  chat_id: faker.datatype.uuid(),
  sender_name: faker.name.findName(),
  sender_image: faker.internet.avatar(),
  chats: [
    {
      chat_text: faker.lorem,
      sent_at: faker.date,
    },
  ],
}));

export const sampleData = [
  {
    chat_id: 1,
    sender_name: "Joe Ng'ethe",
    chats: [
      {
        chat_text:
          "Hi mate, how is it going? Would you have time for a quick chat?",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },

  {
    chat_id: 2,
    sender_name: "Jason Bourne",
    chats: [
      {
        chat_text:
          "I found some intriguing discoveries pertaining project Treadstone. Meet me at the Cathedral and 16:00hrs, be sure to come alone.",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 3,
    sender_name: "Luke Skywalker",
    chats: [
      {
        chat_text:
          "You Failed, Your Highness. I Am A Jedi, Like My Father Before Me.",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 4,
    sender_name: "Master Yoda",
    chats: [
      {
        chat_text: "May the force be with you my friend",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 5,
    sender_name: "Indiana Jones",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 6,
    sender_name: "Luke Cage",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 7,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 8,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 9,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 10,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 11,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 12,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
  {
    chat_id: 13,
    sender_name: "Clerk Kent",
    chats: [
      {
        chat_text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque deserunt",
        sent_at: "2021-08-07T14:02:30.093Z",
      },
    ],
  },
];
