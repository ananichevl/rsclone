import { BoardModel } from '../pages/board/Board';
import { UserModel } from '../pages/login/Login';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts) {
    return parts.pop()?.split(';').shift();
  }
  return '';
};

const headers = { 'Content-Type': 'application/json' };
const addAuthorizationHeader = () => ({ ...headers, Authorization: `Bearer ${getCookie('Bearer')}` });
const server = 'https://trello-clone-bh.herokuapp.com';

export async function createBoard(title: string): Promise<BoardModel | any> {
  const body = {
    title,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boardsv2`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function addColumn(id: string, title: string, order: number): Promise<any> {
  const body = {
    title,
    order,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${id}/columns`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function createTask(
  boardId: string,
  columnId: string,
  order: number,
  title: string,
): Promise<any> {
  const body = {
    title,
    order,
    columnId,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/columns/${columnId}/tasks`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function getBoards(): Promise<any> {
  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'GET',
  };

  try {
    const response = await fetch(`${server}/boardsv2`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function getBoard(id: string): Promise<any> {
  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'GET',
  };

  try {
    const response = await fetch(`${server}/boardsv2/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function updateBoard(id: string, title: string): Promise<any> {
  const body = {
    title,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'PUT',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boardsv2/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function getColumn(boardId: string, columnId: string): Promise<any> {
  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'GET',
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/columns/${columnId}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function updateTask(
  boardId: string,
  columnId: string,
  taskId: string,
  order?: number,
  newColumnId?: string,
  title?: string,
  description?: string,
): Promise<any> {
  const body = {
    title,
    order,
    description,
    newColumnId,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'PUT',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function updateColumn(
  boardId: string,
  columnId: string,
  order?: number,
  title?: string,
): Promise<any> {
  const body = {
    title,
    order,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'PUT',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/columns/${columnId}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function deleteTask(
  boardId: string, columnId: string, taskId: string,
): Promise<any> {
  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'DELETE',
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function deleteColumn(
  boardId: string, id: string | undefined, title: string | undefined,
): Promise<any> {
  const body = {
    id,
    title,
  };

  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'DELETE',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/boards/${boardId}/columns/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function deleteBoard(id: string): Promise<BoardModel | any> {
  const requestOptions = {
    headers: addAuthorizationHeader(),
    method: 'DELETE',
  };

  try {
    const response = await fetch(`${server}/boardsv2/${id}`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function loginUser(login: string, password: string): Promise<UserModel | any> {
  const body = {
    login,
    password,
  };

  const requestOptions = {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/users/login`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}

export async function createUser(login: string, password: string): Promise<UserModel | any> {
  const body = {
    login,
    password,
  };

  const requestOptions = {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(`${server}/users`, requestOptions);
    if (response.ok) {
      return await response.json();
    }
    return response;
  } catch (e) {
    return e;
  }
}
