export const mockGet = jest.fn();
export const mockPost = jest.fn();
export const mockDelete = jest.fn();
export const mockPut = jest.fn();

const axios = {
  create: jest.fn(() => ({
    get: mockGet,
    post: mockPost,
    put: mockPut,
    delete: mockDelete,
  })),
  get: mockGet,
  post: mockPost,
  put: mockPut,
  delete: mockDelete,
};

export default axios;
