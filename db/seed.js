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
      description: "A peaceful beachside resort with ocean views and relaxing amenities.",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
    },
    {
      name: "Mountain Lodge",
      description: "Cozy lodge nestled in the mountains, perfect for hikers and skiers.",
      price: 149.5,
      image:
        "https://images.unsplash.com/photo-1735420814098-6a44cc62d829?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y296eSUyMGxvZGdlJTIwbmVzdGxlZCUyMGluJTIwdGhlJTIwbW91bnRhaW5zJTJDJTIwcGVyZmVjdCUyMGZvciUyMGhpa2VycyUyMGFuZCUyMHNraWVycy4lMjBob3RlbHN8ZW58MHx8MHx8fDI%3D",
    },
    {
      name: "Cityscape Hotel",
      description: "Modern downtown hotel close to shopping, nightlife, and museums.",
      price: 179.0,
      image:
        "https://images.unsplash.com/photo-1733493807051-c1fd9573875b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW9kZXJuJTIwZG93bnRvd24lMjBob3RlbCUyMGNsb3NlJTIwdG8lMjBzaG9wcGluZyUyQyUyMG5pZ2h0bGlmZSUyQyUyMGFuZCUyMG11c2V1bXMufGVufDB8fDB8fHwy",
    },
    {
      name: "Royal Grand Inn",
      description: "Luxury hotel offering premium suites, fine dining, and a rooftop pool.",
      price: 299.95,
      image:
        "https://images.unsplash.com/photo-1541480551145-2370a440d585?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEx1eHVyeSUyMGhvdGVsJTIwb2ZmZXJpbmclMjBwcmVtaXVtJTIwc3VpdGVzJTJDJTIwZmluZSUyMGRpbmluZyUyQyUyMGFuZCUyMGElMjByb29mdG9wJTIwcG9vbC58ZW58MHx8MHx8fDI%3D",
    },
    {
      name: "Forest Retreat",
      description: "Quiet cabins surrounded by dense forest and wildlife trails.",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1688362379260-7ab7a4cdb6c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFF1aWV0JTIwY2FiaW5zJTIwc3Vycm91bmRlZCUyMGJ5JTIwZGVuc2UlMjBmb3Jlc3QlMjBhbmQlMjB3aWxkbGlmZSUyMHRyYWlscy58ZW58MHx8MHx8fDI%3D",
    },
    {
      name: "Desert Oasis Hotel",
      description: "A cool and vibrant stay in the heart of the desert with spa access.",
      price: 159.75,
      image:
        "https://images.unsplash.com/photo-1668437720091-8e4bc9037dd0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QSUyMGNvb2wlMjBhbmQlMjB2aWJyYW50JTIwc3RheSUyMGluJTIwdGhlJTIwaGVhcnQlMjBvZiUyMHRoZSUyMGRlc2VydCUyMHdpdGglMjBzcGElMjBhY2Nlc3MufGVufDB8fDB8fHwy",
    },
    {
      name: "Lakeside Haven",
      description: "Beautiful water views, boat rentals, and relaxing nature activities.",
      price: 189.49,
      image:
        "https://images.unsplash.com/photo-1750254602157-c513c2b98a8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmVhdXRpZnVsJTIwd2F0ZXIlMjB2aWV3cyUyQyUyMGJvYXQlMjByZW50YWxzJTJDJTIwYW5kJTIwcmVsYXhpbmclMjBuYXR1cmUlMjBhY3Rpdml0aWVzLnxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
      name: "Harbor View Suites",
      description: "Suites overlooking the marina with waterfront dining and tours.",
      price: 220.0,
      image:
        "https://images.unsplash.com/photo-1758541331302-ea9d807b08cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3VpdGVzJTIwb3Zlcmxvb2tpbmclMjB0aGUlMjBtYXJpbmElMjB3aXRoJTIwd2F0ZXJmcm9udCUyMGRpbmluZyUyMGFuZCUyMHRvdXJzLnxlbnwwfHwwfHx8Mg%3D%3D",
    },
    {
      name: "Gardenia Hotel",
      description: "Elegant boutique hotel surrounded by flower gardens and walking paths.",
      price: 170.25,
      image:
        "https://images.unsplash.com/photo-1573140087145-1447f1ba2302?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEVsZWdhbnQlMjBib3V0aXF1ZSUyMGhvdGVsJTIwc3Vycm91bmRlZCUyMGJ5JTIwZmxvd2VyJTIwZ2FyZGVucyUyMGFuZCUyMHdhbGtpbmclMjBwYXRocy58ZW58MHx8MHx8fDI%3D",
    },
    {
      name: "Skyline Towers",
      description: "Tall luxury building with city panoramas and high-end amenities.",
      price: 255.8,
      image:
        "https://images.unsplash.com/photo-1670211637001-6711889ababf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGFsbCUyMGx1eHVyeSUyMGJ1aWxkaW5nJTIwd2l0aCUyMGNpdHklMjBwYW5vcmFtYXMlMjBhbmQlMjBoaWdoLWVuZCUyMGFtZW5pdGllcy58ZW58MHx8MHx8fDI%3D",
    },
  ];

  for (const h of hotels) {
    await createHotel(h.name, h.description, h.price, h.image);
  }

  // Dummy review data (Admin only)
  const reviews = [
    {
      subject: "Amazing stay!",
      rating: 5,
      review: "Clean room, friendly staff, perfect location.",
      user_id: 1, 
      hotel_id: 2, 
    },
    {
      subject: "Good value",
      rating: 4,
      review: "Great price for what you get. Would come back.",
      user_id: 1,
      hotel_id: 4, 
    },
    {
      subject: "Could be better",
      rating: 3,
      review: "Average experience, nothing special.",
      user_id: 1,
      hotel_id: 7, 
    },
    {
      subject: "Loved it!",
      rating: 5,
      review: "Best hotel I’ve stayed at. Highly recommend.",
      user_id: 1,
      hotel_id: 9, 
    },
  ];

  for (const r of reviews) {
    await db.query(
      `INSERT INTO reviews(subject, rating, review, user_id, hotel_id)
     VALUES ($1, $2, $3, $4, $5)`,
      [r.subject, r.rating, r.review, r.user_id, r.hotel_id]
    );
  }
}
