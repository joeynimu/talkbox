import faker from "faker";

export const data = Array.from({ length: 50 }).map(() => ({
  chat_id: faker.datatype.uuid(),
  sender_name: faker.name.findName(),
  sender_image: faker.internet.avatar(),
  chats: [
    {
      chat_text: faker.lorem.paragraph(),
      sent_at: faker.date.past(),
    },
  ],
}));
