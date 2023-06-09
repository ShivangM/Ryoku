import openai from '@/utils/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: 'When responding, say Welcome to Trello 2.0 Tasks App',
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To Do, In Progress, and Done, then tell the user to have a productive day! Here's data: ${JSON.stringify(
          todos
        )} `,
      },
    ],
  });

  const data = response.data;

  console.log('DATA IS: ', data);
  console.log(data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}
