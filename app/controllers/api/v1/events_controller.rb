# frozen_string_literal: true

class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: %i[show destroy update]
  def index
    events = current_user.events.all
    render json: events
  end

  def create
    event = current_user.events.build(event_params)
    if event.save
      render json: event
    else
      render json: event.errors
    end
  end

  def show
    # if authorized?
    #   respond_to do |format|
    #     format.json { render :show }
    #   end
    # else
    #   handle_unauthorized
    # end

    render json: @event
  end

  def update
    if authorized?
      render json: @event if @event.update(event_params)
    end
  end

  def destroy
    if authorized?
      @event&.destroy
      render json: { message: 'Event Deleted successfully' }
    end
  end

  private

  def event_params
    params.permit(:title, :starts_at, :ends_at, :active, :free)
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def authorized?
    @event.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to do |format|
        format.json { render :unauthorized, status: 401 }
      end
    end
  end
end
