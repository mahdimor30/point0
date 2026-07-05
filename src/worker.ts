import { Container, getContainer } from "@cloudflare/containers";

export class Point0Container extends Container {
  defaultPort = 3000; // پورت پیش‌فرض سرور Point0
  sleepAfter = "10m"; // اگه ۱۰ دقیقه ریکوئست نیاد، اینستنس خاموش میشه
}

export default {
  async fetch(request: Request, env: any) {
    // یه اینستنس ثابت (singleton) — برای اپ‌های ساده کافیه
    const containerInstance = getContainer(env.POINT0_CONTAINER);
    return containerInstance.fetch(request);
  },
};