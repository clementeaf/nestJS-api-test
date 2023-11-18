import { NotFoundException } from '@nestjs/common';

export class RepositoryNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super('Repository not found' + (message ? `: ${message}` : ''));
  }
}
