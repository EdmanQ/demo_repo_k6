import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export const options = {
  thresholds: {
    checks: ['rate == 1.00'],
  },
};

export default function () {
  describe('Get specific person from the star wars movies', () => {
    const response = http.get('https://swapi.dev/api/people/2');

    expect(response.status, 'response status').to.equal(200);
    expect(response).to.have.validJsonBody();

  });

  describe('Get specific planet from the star wars movies', () => {
    const response = http.get('https://swapi.dev/api/planets/1/');

    expect(response.status, 'response status').to.equal(200);
    expect(response).to.have.validJsonBody();

  });

}

