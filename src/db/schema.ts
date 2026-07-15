import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const mechanics = pgTable("mechanics", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  specialty: varchar("specialty", { length: 160 }).notNull(),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url").notNull(),
  yearsExperience: integer("years_experience").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  description: text("description").notNull(),
  priceFrom: integer("price_from").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  icon: varchar("icon", { length: 40 }).notNull().default("wrench"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  serviceId: integer("service_id").references(() => services.id, {
    onDelete: "set null",
  }),
  mechanicId: integer("mechanic_id").references(() => mechanics.id, {
    onDelete: "set null",
  }),
  vehicleInfo: varchar("vehicle_info", { length: 200 }).notNull(),
  preferredDate: varchar("preferred_date", { length: 20 }).notNull(),
  preferredTime: varchar("preferred_time", { length: 20 }).notNull(),
  notes: text("notes").notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  department: varchar("department", { length: 80 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
