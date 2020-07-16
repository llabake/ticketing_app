class Event < ApplicationRecord
  belongs_to :user

  validates :title, :ends_at, :starts_at, presence: true
end
