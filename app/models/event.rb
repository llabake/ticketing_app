# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :user

  validates :title, :ends_at, :starts_at, presence: true
  validate :starts_at_past, :ends_at_older

  def starts_at_past
    errors.add(:starts_at, 'is in the past') if starts_at < DateTime.now
  end

  def ends_at_older
    errors.add(:ends_at, 'is older than the start time') if ends_at < starts_at
  end
end
