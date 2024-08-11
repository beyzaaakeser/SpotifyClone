import { renderSongs, renderSearchSongs } from './ui.js';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '93abac49f1mshf96bc7f455d8f52p1bfff8jsn714e0a7240e5',
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
  },
};

const optionsTop = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '93abac49f1mshf96bc7f455d8f52p1bfff8jsn714e0a7240e5',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};
//* API isteklerini yönettiğimiz class yapısı
export class API {
  constructor() {
    this.songs = [];
  }

  //* Popüler müzikleri getirir
  async getPopular() {
    const urlTop =
      'https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry';

    try {
      const res = await fetch(urlTop, optionsTop);
      const data = await res.json();
      console.log(data);
      //* API'den aldığımız şarkıları song dizisine aktardık
      this.songs = data.tracks;
      //* Ekrana popüler müzikleri aktaracak fonksiyona songs dizisini parametre olarak gönderdik
      renderSongs(this.songs);
    } catch (error) {
      console.log(error);
    }
  }

  //* Arama methodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR`,
      options
    );
    const data = await res.json();
    console.log(data);
    // Veriyi istediğimiz hale çevirme
    // song.track yerine song'a erişme
    let newData = data.tracks.hits;

    newData = newData.map((song) => ({ ...song.track }));
    this.songs = newData;
    console.log(this.songs);
    // aratılan şarkıları ekrana basma
    renderSearchSongs(this.songs);
  }
}
