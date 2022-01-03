import { environment } from "./environments/environment";

export function loadEnvironment(): Promise<any> {
  return new Promise<void>((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    const method = 'GET';
    const url = './assets/environment.json';
    xmlhttp.open(method, url, true);
    xmlhttp.onload = () => {
      if (xmlhttp.status === 200) {
        const overrides = JSON.parse(xmlhttp.responseText);
        Object.assign(environment, overrides);
      }
      resolve();
    };
    xmlhttp.send();
  });
}
