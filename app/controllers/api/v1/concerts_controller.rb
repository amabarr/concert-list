module Api
  module V1
    class ConcertsController < ApplicationController
      before_action :set_concert, only: %i[show destroy]

      def index # rubocop:disable Metrics/AbcSize
        @params = params.permit(:classification, :limit, :page).to_h
        @concerts = Concert.all
        @concerts = Concert.by_classification(@filters[:classification]) if @params[:classification].present?

        # paginate
        page = @params[:page].to_i || 1
        per_page = @params[:limit].to_i || 25
        offset = (page - 1) * per_page

        total_pages = @concerts.count.fdiv(per_page).ceil
        @concerts = @concerts.limit(per_page).offset(offset)

        render json: { body: { concerts: @concerts.map do |concert|
          render_json(concert:)
        end, pagination_metadata: { page:, per_page:, page_total: total_pages } } }
      end

      def count
        @filters = params.permit(:classification).to_h
        concerts = Concert.all

        concerts = Concert.by_classification(@filters[:classification]) if @filters[:classification].present?

        count = concerts.count

        render json: count
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

        concerts = artist.concerts.map { |concert| render_json(concert:) }

        render json: concerts
      end

      private

      def concerts
        @concerts ||= Concerts.all
      end

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
