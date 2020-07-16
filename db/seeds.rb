# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(
  email: 'admin@example.com',
  password: 'example',
  password_confirmation: 'example',
  name: 'Admin User',
  admin: true
)

puts "#{User.where(admin: true).count} Admin user created"

3.times do |user|
  User.create!(
    email: "user-#{user}@example.com",
    password: 'example',
    password_confirmation: 'example',
    name: "User-#{user}"
  )
end
puts "#{User.where(admin: false).count} Regular user created"

User.all.each do |user|
  5.times do |event|
    user.events.create(
      title: "Event-#{event}",
      active: (event % 3).zero?,
      free: (event % 3).zero?,
      starts_at: DateTime.now + ("#{event}".to_i + 1).days,
      ends_at: DateTime.now + ("#{event}".to_i + 5).days
    )
  end
end

puts "#{Event.count} Events created"
