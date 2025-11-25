import { Controller, Get } from '@nestjs/common';

/**
 * Health Check Controller
 * Endpoint cho Docker health check và load balancer
 */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'api-gateway',
    };
  }
}
