import { Entity, Column } from 'typeorm';

import { AppEntity } from 'src/common/base/entities/app.entity';

@Entity('users')
export class UserEntity extends AppEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  rule: number;

  @Column({ nullable: true })
  photo: string;
}
