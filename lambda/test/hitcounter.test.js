/**
 * Test execution:
 * 1) cd lambda
 * 2) npm install
 * 3) npm test
 */

const updateItemMock = jest.fn();
const invokeMock = jest.fn();

jest.mock('aws-sdk', () => ({
  DynamoDB: jest.fn(() => ({
    updateItem: updateItemMock,
  })),
  Lambda: jest.fn(() => ({
    invoke: invokeMock,
  })),
}));

describe('hitcounter handler', () => {
  beforeEach(() => {
    updateItemMock.mockReset();
    invokeMock.mockReset();
  });

  it('updates the hit counter and invokes downstream Lambda', async () => {
    process.env.DDB_TABLE_NAME = 'hits-table';
    process.env.DOWNSTREAM_FUNCTION_NAME = 'downstream-handler';

    const event = { path: '/test' };

    updateItemMock.mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });

    invokeMock.mockReturnValue({
      promise: jest
        .fn()
        .mockResolvedValue({ Payload: JSON.stringify({ ok: true }) }),
    });

    const { handler } = require('../hitcounter');

    const response = await handler(event);

    expect(updateItemMock).toHaveBeenCalledWith({
      TableName: 'hits-table',
      Key: { path: { S: '/test' } },
      UpdateExpression: 'ADD hits :incr',
      ExpressionAttributeValues: { ':incr': { N: '1' } },
    });

    expect(invokeMock).toHaveBeenCalledWith({
      FunctionName: 'downstream-handler',
      Payload: JSON.stringify(event),
    });

    expect(response).toEqual({ ok: true });
  });
});
