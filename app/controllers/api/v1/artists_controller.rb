module Api
  module V1
    class ArtistsController < ApplicationController
      before_action :artist, only: %i[show]

      def index
        artists = Artist.all.map { |a| render_json(artist: a) }

        render json: artists
      end

      def show
        render json: @artist
      end

      private

      def artist
        @artist ||= Artist.find_by(id: params[:id])
      end

      def render_json(artist:)
        {
          id: artist.id,
          name: artist.name,
          genres: artist.genres,
          concert_count: artist.times_seen
        }
      end
    end
  end
end
