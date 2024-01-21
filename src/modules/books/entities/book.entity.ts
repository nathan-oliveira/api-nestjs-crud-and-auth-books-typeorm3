import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { AppEntity } from 'src/common/base/entities/app.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('books')
export class BookEntity extends AppEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  fileUrl: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
