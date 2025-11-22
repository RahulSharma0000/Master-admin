// Dummy axios wrapper for future Django backend integration
// For now, no API calls will be made.

export const api = {
  get: () => Promise.resolve({ data: [] }),
  post: () => Promise.resolve({ data: [] }),
  put: () => Promise.resolve({ data: [] }),
  delete: () => Promise.resolve({ data: [] }),
};
