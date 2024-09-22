module Api
  module V1
    class ConcertsController < ApplicationController
      before_action :set_concert, only: %i[show destroy]

      def index
        concerts = Concert.all.includes(:artists)

        concerts_with_artists = concerts.map do |concert|
          render_json(concert:)
        end

        render json: concerts_with_artists
      end

      def create
        concert = Concert.create!(concert_params)
        if concert
          render json: concert
        else
          render json: concert.errors
        end
      end

      def show
        render json: @concert
      end

      def destroy
        @concert&.destroy
        render json: { message: 'Concert deleted' }
      end

      def concerts_for_artist
        artist = Artist.find_by(id: params[:artistId])

        concerts = artist.concerts.map{|concert| render_json(concert:)}

        render json: concerts
      end

      private

      def set_concert
        @concert = render_json(concert: Concert.find_by(id: params[:id]))
      end

      def concert_params
        params.permit(:date, :location, :city, :name)
      end

      def render_json(concert:)
        {
          id: concert.id,
          classification: concert.classification,
          date: concert.date,
          name: concert.name,
          city: concert.city,
          venue: concert.venue,
          artists: concert.artists
        }
      end
    end
  end
end
