import http from 'k6/http';
import {check} from 'k6';

export const options = {
  // Key configurations for spike in this section
  stages: [
    { duration: '2m', target: 2000 }, // fast ramp-up to a high point
    // No plateau
    { duration: '1m', target: 0 }, // quick ramp-down to 0 users
  ],
  thresholds: {
    
    // http errors should be less than 1%
    http_req_failed: ['rate<0.01'],

    // 95% of requests should be below 2500ms
    http_req_duration: ['p(95)<2500']  // 95% of requests should be below 2500ms
  },
};

export default () => {
    const res = http.get('https://swapi.dev/api/people/2');
    check(res, 
      { 
        'status was 200': (r) => r.status == 200,
        'Check name for specific person': (r) => r.json().name == 'C-3PO', 
        'check height for specific person': (r) => r.json().height == '167',
      });
};
