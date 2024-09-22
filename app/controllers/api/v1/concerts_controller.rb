module Api
  module V1
    class ConcertsController < ApplicationController
      before_action :set_concert, only: %i[show destroy]

      def index
        concerts = Concert.all.includes(:artists)

        concerts_with_artists = concerts.map do |concert|
          c = concert.as_json
          c['artists'] = concert.artists.as_json
          c
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

      private

      def set_concert
        @concert = concert.find_by(params[:id])
      end

      def concert_params
        params.permit(:date, :location, :city, :name)
      end

      def get_concerts_artists; end
    end
  end
end
