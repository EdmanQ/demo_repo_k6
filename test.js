import http from 'k6/http';
import { check, sleep } from 'k6';


//Load model
export const options = {
  vus: 1,
  duration: '1s',

//This fail the load test if success rate is not 99% or
//95% of the request have avg.duration less than 2500ms

  thresholds: {
    http_req_failed: ['rate<0.99'],
    http_req_duration: ['p(95)<2500']
  },
};



//Test
export default function () {

  /*//Http Request Params
  let params = {
     headers: {
        "user-agent":"k6",
         "accept-content":"application/json"
    }};
    */

  const res = http.get('https://swapi.dev/api/people/2');
  check(res, 
    { 
      
      'status was 200': (r) => r.status == 200,
      'Check name is what we looking for': (r) => r.json().name == 'C-3PO', 
      'check height for specific person': (r) => r.json().height == '167',
      
    });
  
  sleep(1);

}