/**
 * @jest-environment jsdom
 */

import 'regenerator-runtime/runtime'; // Needed for async/await in Jest
import { loadDestinations } from '../destinationsApp'; // Assuming your function is exported


describe("loadDestinations", () => {
    beforeEach(() => {
        // Clear DOM
        document.body.innerHTML = `<div id="destinations"></div>`;
        fetch.mockClear();
    });

    test("fetches correct URL and displays data", async () => {
       const mockDestinations = [
    {
        "_id": "69380728f4f7c0b83cacbf94",
        "picture": "https://i.pinimg.com/originals/99/5b/29/995b2937b723696d3a577b7ddc029568.gif",
        "name": "Tokyo",
        "description": "A vibrant city filled with neon lights, advanced technology, rich culture, and incredible food.",
        "rating": 4.96,
        "category": "cities",
        "__v": 0
    },
    {
        "_id": "693807d3f4f7c0b83cacbf9f",
        "picture": "https://www.dreamingofmaldives.com/wp-content/uploads/Maldives.gif",
        "name": "Maldives",
        "description": "Crystal–clear turquoise waters, white sandy beaches, and peaceful tropical scenery perfect for relaxation.",
        "rating": 4.8,
        "category": "beaches",
        "__v": 0
    },
    {
        "_id": "6938085df4f7c0b83cacbfa8",
        "picture": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXE5NzJxbzBidnlyeDcxeTZjOXl6bWpneWIxYnZmampzcmVjNjdqNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RoFXqXWN639Qs/giphy.gif",
        "name": "Amazon Rainforest",
        "description": "A vast rainforest filled with wildlife, dense greenery, rivers, and the sounds of untouched nature.",
        "rating": 4.7,
        "category": "forests",
        "__v": 0
    }
];

// Mock fetch in Jest
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockDestinations)
    })
);

        await loadDestinations("beach");

        // Check that fetch was called with correct URL
        expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/destinations?category=beach");

        const container = expect(container.innerHTML).toContain("Tokyo");
                          expect(container.innerHTML).toContain("Maldives");
                          expect(container.innerHTML).toContain("Amazon Rainforest");
    });

    test("handles empty destination list without errors", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => []
        });

        await expect(loadDestinations("river")).resolves.not.toThrow();

        const container = document.getElementById("destinations");
        expect(container.innerHTML).toBe(""); // No cards added
    });

    test("handles fetch error gracefully", async () => {
        fetch.mockRejectedValueOnce(new Error("Network Error"));

        console.error = jest.fn(); // Mock console.error

        await loadDestinations("forest");

        expect(console.error).toHaveBeenCalledWith(
            "Failed to load destinations:",
            expect.any(Error)
        );
    });
});
