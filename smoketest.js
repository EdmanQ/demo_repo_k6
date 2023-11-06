import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '5m', // This can be shorter or just a few iterations
  thresholds: {
    
    // http errors should be less than 1%
    http_req_failed: ['rate<0.01'],

    // 95% of requests should be below 2500ms
    http_req_duration: ['p(95)<2500']  // 95% of requests should be below 2500ms
  },
};

export default function () {

  const res = http.get('https://swapi.dev/api/people/2');
  check(res, 
    { 
      'status was 200': (r) => r.status == 200,
      'Check name for specific person': (r) => r.json().name == 'C-3PO', 
      'check height for specific person': (r) => r.json().height == '167',
    });

};