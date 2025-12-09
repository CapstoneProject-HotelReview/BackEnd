import db from "#db/client";
import { createHotel } from "#db/queries/hotels";
import { createAdminUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createAdminUser("Admin", "Admin", "admin", "admin123", "Admin");
  const hotels = [
    {
      name: "Sunset Resort",
      description:
        "A peaceful beachside resort with ocean views and relaxing amenities.",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
    },
    {
      name: "Mountain Lodge",
      description:
        "Cozy lodge nestled in the mountains, perfect for hikers and skiers.",
      price: 149.5,
    },
    {
      name: "Cityscape Hotel",
      description:
        "Modern downtown hotel close to shopping, nightlife, and museums.",
      price: 179.0,
    },
    {
      name: "Royal Grand Inn",
      description:
        "Luxury hotel offering premium suites, fine dining, and a rooftop pool.",
      price: 299.95,
    },
    {
      name: "Forest Retreat",
      description:
        "Quiet cabins surrounded by dense forest and wildlife trails.",
      price: 129.99,
    },
    {
      name: "Desert Oasis Hotel",
      description:
        "A cool and vibrant stay in the heart of the desert with spa access.",
      price: 159.75,
    },
    {
      name: "Lakeside Haven",
      description:
        "Beautiful water views, boat rentals, and relaxing nature activities.",
      price: 189.49,
    },
    {
      name: "Harbor View Suites",
      description:
        "Suites overlooking the marina with waterfront dining and tours.",
      price: 220.0,
    },
    {
      name: "Gardenia Hotel",
      description:
        "Elegant boutique hotel surrounded by flower gardens and walking paths.",
      price: 170.25,
    },
    {
      name: "Skyline Towers",
      description:
        "Tall luxury building with city panoramas and high-end amenities.",
      price: 255.8,
    },
  ];

  for (const h of hotels) {
    await createHotel(h.name, h.description, h.price);
  }
}
