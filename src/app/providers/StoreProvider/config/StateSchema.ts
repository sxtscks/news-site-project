import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  auth: AuthSchema
}
