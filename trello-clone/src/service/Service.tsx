const headers = { 'Content-Type': 'application/json' };

export default async function createBoard(title: string): Promise<any> {
  const body = {
    title,
    columns: [
      {
        title: 'test',
        order: 0,
      },
    ],
  };

  const requestOptions = {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch('https://trello-clone-bh.herokuapp.com/boards', requestOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    return e;
  }

  return Promise.resolve('error');
}
