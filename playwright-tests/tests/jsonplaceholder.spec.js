const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const TODO_ENDPOINT = '/todos';

test.describe('JSONPlaceholder Todos API Tests', () => {

  test('GET /todos - should return list of todos', async ({ request }) => {
    const response = await request.get(`${BASE_URL}${TODO_ENDPOINT}`);
    expect(response.ok()).toBeTruthy();
    
    const todos = await response.json();
    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThan(0);
    
    // Validate structure of first todo
    const firstTodo = todos[0];
    expect(firstTodo).toHaveProperty('userId');
    expect(firstTodo).toHaveProperty('id');
    expect(firstTodo).toHaveProperty('title');
    expect(firstTodo).toHaveProperty('completed');
  });

  test('GET /todos/:id - should return specific todo', async ({ request }) => {
    const todoId = 1;
    const response = await request.get(`${BASE_URL}${TODO_ENDPOINT}/${todoId}`);
    expect(response.ok()).toBeTruthy();
    
    const todo = await response.json();
    expect(todo.id).toBe(todoId);
    expect(typeof todo.title).toBe('string');
    expect(typeof todo.completed).toBe('boolean');
  });

  test('GET /todos/:id - should return 404 for non-existent todo', async ({ request }) => {
    const nonExistentId = 9999;
    const response = await request.get(`${BASE_URL}${TODO_ENDPOINT}/${nonExistentId}`);
    expect(response.status()).toBe(404);
  });

  test('POST /todos - should create new todo', async ({ request }) => {
    const newTodo = {
      userId: 1,
      title: 'Test Playwright API automation',
      completed: false
    };
    
    const response = await request.post(`${BASE_URL}${TODO_ENDPOINT}`, {
      data: newTodo
    });
    
    expect(response.ok()).toBeTruthy();
    
    const createdTodo = await response.json();
    expect(createdTodo.id).toBeDefined();
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.completed).toBe(newTodo.completed);
    expect(createdTodo.userId).toBe(newTodo.userId);
  });

  test('PUT /todos/:id - should update existing todo', async ({ request }) => {
    const todoId = 1;
    const updatedTodo = {
      id: todoId,
      userId: 1,
      title: 'Updated todo via Playwright',
      completed: true
    };
    
    const response = await request.put(`${BASE_URL}${TODO_ENDPOINT}/${todoId}`, {
      data: updatedTodo
    });
    
    expect(response.ok()).toBeTruthy();
    
    const result = await response.json();
    expect(result).toEqual(updatedTodo);
  });

  test('PATCH /todos/:id - should partially update todo', async ({ request }) => {
    const todoId = 1;
    const partialUpdate = {
      completed: true
    };
    
    const response = await request.patch(`${BASE_URL}${TODO_ENDPOINT}/${todoId}`, {
      data: partialUpdate
    });
    
    expect(response.ok()).toBeTruthy();
    
    const result = await response.json();
    expect(result.completed).toBe(true);
  });

  test('DELETE /todos/:id - should delete todo', async ({ request }) => {
    const todoId = 1;
    const response = await request.delete(`${BASE_URL}${TODO_ENDPOINT}/${todoId}`);
    expect(response.ok()).toBeTruthy();
    
    // Verify deletion by trying to fetch the deleted todo
    const getResponse = await request.get(`${BASE_URL}${TODO_ENDPOINT}/${todoId}`);
    expect(getResponse.ok()).toBeTruthy(); // Note: This API doesn't actually delete resources
  });

  test('GET /todos?userId=1 - should filter todos by user', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}${TODO_ENDPOINT}?userId=${userId}`);
    expect(response.ok()).toBeTruthy();
    
    const todos = await response.json();
    expect(todos.length).toBeGreaterThan(0);
    
    // Verify all returned todos belong to the specified user
    todos.forEach(todo => {
      expect(todo.userId).toBe(userId);
    });
  });

  test('POST /todos - should validate request payload', async ({ request }) => {
    const invalidTodo = {
      // Missing required fields
    };
    
    const response = await request.post(`${BASE_URL}${TODO_ENDPOINT}`, {
      data: invalidTodo
    });
    
    // Note: This API doesn't actually validate payloads, so this test documents that behavior
    expect(response.ok()).toBeTruthy();
  });
});
