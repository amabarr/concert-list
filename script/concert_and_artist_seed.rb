# To run this script bundle exec rails r script/concert_and_artist_seed.rb
class ConcertsAndArtistSeed
  CONCERTS_JSON = File.expand_path('concerts.json', __dir__)
  WORKPLACE = 'Celebrate Brooklyn'.freeze

  def initialize
    file = File.read(CONCERTS_JSON)
    @concerts = JSON.parse(file, symbolize_names: true)
    @concerts_created = 0
    @artists_created = 0
    run
  end

  def run
    ActiveRecord::Base.transaction do
      @concerts.each do |concert|
        create_records(concert:)
      end
      puts "Created #{@concerts_created} concerts and #{@artists_created} artists"
    end
  end

  def create_records(concert:) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    band = concert[:band]
    artist = Artist.find_or_initialize_by(name: band)
    c = Concert.find_or_initialize_by(date: concert[:date])
    ac = ArtistConcert.find_by(artist_id: artist&.id, concert_id: c&.id)

    return unless c.new_record? || artist.new_record? || ac.blank?

    add_concert_attributes(record: c, concert:)

    begin
      if artist.new_record?
        artist.save!
        @artists_created += 1
      end
      c.save!
      @concerts_created += 1
      ac = ArtistConcert.new(artist:, concert: c)
      ac.save!
    rescue ActiveRecord::RecordInvalid => e
      raise StandardError, "concert #{band} at #{concert[:location]} has an error: #{e}"
    end
  end

  def add_concert_attributes(record:, concert:)
    record.venue = concert[:location]
    record.name = concert[:"festival-name"]

    record.classification = 'work' if record.name == WORKPLACE
  end
end

ConcertsAndArtistSeed.new
