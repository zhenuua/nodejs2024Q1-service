import { Injectable } from '@nestjs/common';
import { getUsersMethods } from './entities/users';

@Injectable()
export class DB {
  get user() {
    return getUsersMethods();
  }
}
