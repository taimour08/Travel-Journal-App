/**
 * @jest-environment jsdom
 */

const { loadAllImages } = require('/urlApp'); // make sure path is correct

global.fetch = jest.fn();

describe('loadAllImages', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <img id="beach-pic" />
      <img id="forest-pic" />
      <img id="river-pic" />
    `;
    fetch.mockClear();
  });

  test('calls the correct API URL and sets image sources', async () => {
    const mockData = {
      logoUrl: "https://img.freepik.com/logo.png",
      beach: "https://images.unsplash.com/beach.jpg",
      forest: "https://images.unsplash.com/forest.jpg",
      river: "https://images.unsplash.com/river.jpg"
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockData
    });

    await loadAllImages();

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/settings');
    expect(document.getElementById('beach-pic').src).toBe(mockData.beach);
    expect(document.getElementById('forest-pic').src).toBe(mockData.forest);
    expect(document.getElementById('river-pic').src).toBe(mockData.river);
  });

  test('does not fail if some image elements are missing', async () => {
    document.body.innerHTML = `<img id="beach-pic" />`;

    const mockData = {
      beach: "https://images.unsplash.com/beach.jpg",
      forest: "https://images.unsplash.com/forest.jpg",
      river: "https://images.unsplash.com/river.jpg"
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockData
    });

    await expect(loadAllImages()).resolves.not.toThrow();
    expect(document.getElementById('beach-pic').src).toBe(mockData.beach);
  });
});
