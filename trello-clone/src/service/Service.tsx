const headers = { 'Content-Type': 'application/json' };
const server = 'http://localhost:4000';

export async function createBoard(title: string): Promise<any> {
  const body = {
    title,
  };

  const requestOptions = {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    return e;
  }

  return Promise.resolve('error');
}

export async function addColumn(id: string, columnTitle: string): Promise<any> {
  const body = {
    columnTitle,
  };

  const requestOptions = {
    headers,
    method: 'PUT',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${id}/column`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    return e;
  }

  return Promise.resolve('error');
}

export async function createTask(boardId: string, columnId: string, title: string): Promise<any> {
  const body = {
    title,
    order: 0,
    boardId,
    columnId,
  };

  const requestOptions = {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/tasks`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    return e;
  }

  return Promise.resolve('error');
}

export async function getBoards(): Promise<any> {
  const requestOptions = {
    headers,
    method: 'GET',
  };

  try {
    const response = await fetch(`${server}/boards`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    return e;
  }

  return Promise.resolve('error');
}

export async function getBoard(id: string): Promise<any> {
  const requestOptions = {
    headers,
    method: 'GET',
  };

  try {
    const response = await fetch(`${server}/boards/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    return e;
  }

  return Promise.resolve('error');
}
